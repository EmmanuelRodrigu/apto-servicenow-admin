import React, { useEffect, useState } from 'react';
import { http } from '@providers/http';
import notify from "@utils/notify";
import { useNavigate, useParams } from 'react-router-dom';
import Form from './Form/update';

export default function NewClient() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState(null);
    const [defaultOption, setDefaultOption] = useState('');
    const [options, setOptions] = useState(null);

    const getData = () => {
        http.get(`api/clients/${id}`)
            .then((response) => {
                setData(response);
                console.log(response)
            })
            .catch((error) => {
                notify(error, 'error');
            });
    }

    const getDataClient = async () => {
        await http.get(`api/clients/taxdata/${id}`)
            .then((response) => {
                setDefaultOption(response.taxDataClient.label)
            })
            .catch((error) => {
                notify(error, 'error');
            })
    }

    const getTaxData = async () => {
        await http.get(`api/clients/taxdata/${id}`)
            .then((response) => {
                setOptions(response)
            })
            .catch((error) => {
                notify(error, 'error');
            })
    }

    useEffect(() => {
        getData();
        getDataClient();
        getTaxData();
    }, [])

    return (
        <div className="">
            {
                data && defaultOption.length > 0 ? (
                    <Form
                        data={data}
                        id={id}
                        navigate={navigate}
                        optionsTaxData={options}
                        defaultOption={defaultOption}
                    />
                ) : ''
            }
        </div>
        
    )
}