import React, { useEffect, useState } from "react";
import { http } from "@providers/http";
import { Link, useNavigate, useParams } from "react-router-dom";
import notify from "@utils/notify";
import Form from './Form/update';

export default function DetailRequest() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    const getData = async () => {
        http.get(`api/requests/${id}/details`)
            .then((response) => {
                setData(response);
            })
            .catch((error) => {
                notify(error, 'error');
            });
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            {
                data ? (
                    <Form 
                        data={data}
                        id={id}
                        navigate={navigate}
                        getData={getData}
                    />
                ) : ''
            }
        </div>
    )
}