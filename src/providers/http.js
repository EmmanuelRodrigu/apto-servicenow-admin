import queryString from 'query-string';
import { VITE_API_URL } from '@utils/constants';

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
        get(url, params = {}, config = {}, tokenParam = null) {
            config.url = url;
            return fetch(
                `${apiUrl}/${url}?${queryString.stringify(params)}`,
                withDefaultHeaders(config)
            ).then(evaluateResponse);
        },
        post(url, data, config = {}) {
            config.url = url;
            config.method = 'POST';
            config.body = JSON.stringify(data);
            return fetch(`${apiUrl}/${url}`, withDefaultHeaders(config)).then(
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
