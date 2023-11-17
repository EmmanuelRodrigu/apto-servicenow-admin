import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { http } from '@providers/http';
import UpdateUser from './Form/update';

export default function UserDetails() {
    const { id } = useParams();
    const navigate = useNavigate()
    const [data, setData] = useState(null);

    const getData = async () => {
        await http.get(`api/users/${id}`)
            .then((response) => {
                setData(response);
            })
            .catch((error) => {
                notify(error, 'error');
            });
    };

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            {
                data ? (
                    <UpdateUser 
                        data={data}
                        id={id}
                        navigate={navigate}
                    />
                ) : (
                    ''
                )
            }
        </div>
    )
}