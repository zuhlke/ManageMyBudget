export interface UserOverview {
    readonly userId: number;
    income?: number;
    outgoing?: number;
}

export interface UserStatement {
    readonly userId: number;
    readonly currentBalance: number;
    readonly message: string;
}

export const sampleDocuments: UserOverview[] = [
    { "userId": 1, "income": 750, "outgoing": 679.87 },
    { "userId": 2, "income": 750, "outgoing": 890.23 },
    { "userId": 3, "income": 750, "outgoing": 566.45 },
    { "userId": 4, "income": 750, "outgoing": 1023.02 },
    { "userId": 5, "income": 750, "outgoing": 456.78 },
    { "userId": 6, "income": 750, "outgoing": 745.78 },
    { "userId": 7, "income": 750, "outgoing": 723.47 },
];

export const formatUserOverview = (overview: UserOverview): string => {
    let result: string = 'User ID: ' + overview.userId.toString();

    if (overview.income) {
        result += '; Incoming: ' + overview.income;
    }

    if (overview.outgoing) {
        result += '; Outgoing: ' + overview.outgoing;
    }

    return result;
}

export const getOverviewDifferences = (overviews: UserOverview[]): number => {
    let result: number = 0;

    for (const overview of overviews) {
        result += getOverviewDifference(overview);
    }

    return parseFloat(result.toFixed(2));
}

const getOverviewDifference = (overview: UserOverview): number => {
    let result: number = 0;
    
    if (overview.income) {
        result += overview.income;
    }

    if (overview.outgoing) {
        result -= overview.outgoing;
    }

    return result;
}

export const logUserOverviews = (dbRead: UserOverview[]): void => {
    console.debug('Outputting User Overviews');

    for (let i of dbRead) {
        console.log(formatUserOverview(i));
    }
    console.debug('Outputted UserOverviews');
}

export const getBalanceStatusMessageByOverviews = (userOverviews: UserOverview[]): string => {
    const currentBalance: number = getOverviewDifferences(userOverviews);

    return getBalanceStatusMessageByBalance(currentBalance);    
}

export const getBalanceStatusMessageByBalance = (currentBalance: number): string => {
    return (currentBalance >= 0) ? 'You have enough money in your account' : 'You do not have enough money in your account';
}