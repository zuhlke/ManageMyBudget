import { UserOverview, getOverviewDifferences, getBalanceStatusMessageByBalance, UserStatement } from 'src/datatypes/userInfo';
import { getOverviewsById } from "src/db/mongoConnection";
import * as http from 'http'
import { LambdaResponse } from 'src/datatypes/responses';

export const handler = async (event: any = {}, context: any): Promise<LambdaResponse> => {
    let userId: number = 0;
    let data: UserOverview;
    // Lambda proxy integration
    if (event) {
        if (event.queryStringParameters && event.queryStringParameters.userId) {
            userId = event!.queryStringParameters!.userId!;
        } else {
            try {
                if (event.body) {
                    data = JSON.parse(event.body!);

                    if (data.userId) {
                        userId = data.userId!;
                    }
                }

            } catch (e) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({
                        userId: userId,
                        message: 'There was an error parsing the JSON data posted to this endpoint',
                        error: e.message
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                }
            }
        }
    }

    console.log('UserId: ' + userId);

    http.ServerResponse

    const userOverviews: UserOverview[] = await getOverviewsById(userId);
    let currentBalance: number = getOverviewDifferences(userOverviews);
    let message: string = getBalanceStatusMessageByBalance(currentBalance);

    const responseBody: UserStatement = {
        userId: userId,
        currentBalance: currentBalance,
        message: message
    };

    const response: LambdaResponse = {
        statusCode: 200,
        body: JSON.stringify(responseBody),
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
    };

    console.log(response);
    return response;
};
