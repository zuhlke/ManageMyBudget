import React from 'react'
import { AccountInfo } from '../datatypes/userInformation';
import useGetBalanceService from '../services/useGetBalanceService';
import { EndpointStatus } from '../datatypes/endpointStatus';

const BudgetFunctionalComponent: React.FC<{}> = () => {
    const getBalanceService: EndpointStatus<AccountInfo> = useGetBalanceService();

    return (
        <div className="govuk-panel govuk-panel--confirmation">
            {getBalanceService.status === 'initialising' && <div>Loading...</div>}

            {getBalanceService.status === 'errored' && (
                <div>Error: Endpoint failed for the following reason: {getBalanceService.error.message}</div>
            )
            }

            {getBalanceService.status === 'completed'
                && getBalanceService.response !== undefined
                && (
                    <div>
                        <h2 className="govuk-panel__title">{getBalanceService.response.message}</h2>
                        <div className="govuk-panel__body">
                            Your current balance <br />
                            <strong>{getBalanceService.response.currentBalance}</strong>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default BudgetFunctionalComponent;