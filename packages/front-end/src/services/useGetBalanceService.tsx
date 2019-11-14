import { useState, useEffect } from "react"
import { EndpointStatus } from "../datatypes/endpointStatus";
import { AccountInfo } from "../datatypes/userInformation";

const useGetBalanceService = (): EndpointStatus<AccountInfo> => {
    const [serviceResult, setResult] = useState<EndpointStatus<AccountInfo>>({
        status: 'initialising'
    });

    useEffect(() => {
        fetch('https://nf9d2chiak.execute-api.eu-west-2.amazonaws.com/dev/balance',
            {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                    "Accept": "application/json",
                    "Accept-Charset": "utf-8"
                },
                body: JSON.stringify({
                    userId: Math.floor(Math.random() * 6) + 1
                })
            }
        )
            .then(response => response.json())
            .then(response => setResult({ status: 'completed', response: response }))
            .catch(error => setResult({ status: 'errored', error: error }));
    }, []);

    return serviceResult;
}

export default useGetBalanceService;