import queryString from 'query-string';
import { VITE_API_URL } from '@utils/constants';
import { getDriverStorage } from '@utils'

export const getToken = {
    get (key) {
      return getDriverStorage().getItem(key)
    },
    set (key, value) {
      getDriverStorage().setItem(key, value)
    }
  }

export const http = (() => {
    const apiUrl = VITE_API_URL;
    function withDefaultHeaders(config, token) {

        let headers = {
            ...(config.headers || {}),
            'Content-Type': 'application/json',
        }
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
        return {
            ...config,
            headers: headers,
        };
    }
    function withMultiPartHeaders(config, token) {
        return {
            ...config,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    }
    function evaluateResponse(response) {

        if (response.status >= 200 && response.status < 300) {
            return response.json();
        }
        return Promise.reject(response);
    }

    return {
        request (config = {}) {
            const token = getToken.get('tokenApto')
      
            return fetch(
                      `${apiUrl}/${config.url}`,
                      withDefaultHeaders(config, token)
            ).then(evaluateResponse)
          },
        get(url, params = {}, config = {}, tokenParam = null) {
            try {
                const token = tokenParam == null ? getToken.get('tokenApto') : tokenParam;
                config.url = url;
                return fetch(
                    `${apiUrl}/${url}?${queryString.stringify(params)}`,
                    withDefaultHeaders(config, token)
                ).then(evaluateResponse);
            } catch(error) {
                console.log(error);
            }
        },
        post(url, data, config = {}, tokenParam = null) {
            const token = tokenParam == null ? getToken.get('tokenApto') : tokenParam;
            config.url = url;
            config.method = 'POST';
            config.body = JSON.stringify(data);
            return fetch(`${apiUrl}/${url}`, withDefaultHeaders(config, token)).then(
                evaluateResponse
            );
        },
        delete(url, data, config = {}) {
            config.url = url;
            config.method = 'DELETE';
            config.body = JSON.stringify(data);
            return fetch(`${apiUrl}/${url}`, withDefaultHeaders(config)).then(
                evaluateResponse
            );
        },
        patch(url, data, config = {}) {
            config.url = url;
            config.method = 'PATCH';
            config.body = JSON.stringify(data);
            return fetch(`${apiUrl}/${url}`, withDefaultHeaders(config)).then(
                evaluateResponse
            );
        },
        put(url, data, config = {}) {
            config.url = url;
            config.method = 'PUT';
            config.body = JSON.stringify(data);
            return fetch(`${apiUrl}/${url}`, withDefaultHeaders(config)).then(
                evaluateResponse
            );
        },
        putWithParamToken(url, data, config = {}) {
            config.url = url;
            config.method = 'PUT';
            config.body = JSON.stringify(data);
            return fetch(`${apiUrl}/${url}`, withDefaultHeaders(config)).then(
                evaluateResponse
            );
        },
        putFile(url, data, config = {}) {
            config.url = url;
            config.method = 'PUT';
            config.body = data;
            return fetch(
                `${apiUrl}/${url}`,
                withMultiPartHeaders(config)
            ).then(evaluateResponse);
        },
        postFile(url, data, config = {}) {
            config.url = url;
            config.method = 'POST';
            config.body = data;
            return fetch(
                `${apiUrl}/${url}`,
                withMultiPartHeaders(config)
            ).then(evaluateResponse);
        },

    };
})();
