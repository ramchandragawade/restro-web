import { useCallback, useEffect, useState } from "react";

const SOMETHING_WRONG = 'Something went wrong, failed to send request.';
const sendHttpReq = async (url, config) => {
    const response = await fetch(url, config);
    const resData = await response.json();
    if (!response.ok) {
        throw new Error(resData.message || SOMETHING_WRONG);
    }
    return resData;
}

export default function useHttp(url, config, initData) {
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(initData);

    const clearData = () => { 
        setData(initData) 
    }

    const sendRequest = useCallback(async (data) => {
        setIsLoading(true);
        try {
            const resData = await sendHttpReq(url, {...config, body:data});
            setData(resData);
        } catch (e) {
            setError(e.message || SOMETHING_WRONG);
        }
        setIsLoading(false);
    }, [url,config]);
    useEffect(() => {
        if(config && (!config || !config.method || config.method === 'GET')) {
            sendRequest();
        }
    }, [sendRequest, config]);
    return {
        data,
        isLoading,
        error,
        sendRequest,
        clearData
    }
}