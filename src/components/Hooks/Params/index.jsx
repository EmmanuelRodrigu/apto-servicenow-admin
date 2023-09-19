import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
export default function ParamsState() {
    const navigate = useNavigate();
    const location = useLocation();

    const [paginate, setPaginate] = useState({
        total: 0,
        limit: 10,
        currentPage: 1,
        lastPage: 1, //total pages
        prev: null,
        next: null,
    });

    const useCustomParams = (basic = true) => {
        const { pathname, search } = location;
        const params = queryString.parse(search);
        if (basic) {
            if (!params.limit) {
                params.limit = paginate.limit;
            }
        }
        const path = pathname;
        const updateParams = (updatedParams) => {
            Object.assign(params, updatedParams);
            const queryParamsRedirect = queryString.stringify(params);
            navigate(`${path}?${queryParamsRedirect}`);
        };
        return [params, updateParams];
    };

    return {
        useCustomParams,
        location,
        paginate,
        setPaginate,
    };
}
