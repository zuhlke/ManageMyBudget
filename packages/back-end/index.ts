var MongoClient = require('mongodb').MongoClient,
    fs = require('fs');

var caBundle = [fs.readFileSync("certs/rds-combined-ca-bundle.pem")];
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;
const DB_COLLECTION = process.env.DB_COLLECTION;
let dbClient: any = null;

let sampleDocuments: { userId: number, income: number, outgoing: number } [] = [
    {"userId": 1, "income": 750, "outgoing": 679.87},
    {"userId": 2, "income": 750, "outgoing": 890.23},
    {"userId": 3, "income": 750, "outgoing": 566.45},
    {"userId": 4, "income": 750, "outgoing": 1023.02},
    {"userId": 5, "income": 750, "outgoing": 456.78},
    {"userId": 6, "income": 750, "outgoing": 745.78},
    {"userId": 7, "income": 750, "outgoing": 723.47},
];

interface UserInfo {
    userId: number
}

export const handler = async (event: any = {}, context: any): Promise<any> => {
    let userId: number = 0;
    let data: UserInfo;
    // Lambda proxy integration
    if (event) {
        try {
            if (event.queryStringParameters && event.queryStringParameters.userId) {
                userId = +event.queryStringParameters.userId;
            } else if (event.body.userId) {
                userId = +event.body.userId;
            }

            if (event.body) {
                data = JSON.parse(event.body);

                if (data.userId) {
                    userId = data.userId
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

    console.log('UserId: ' + userId);
    await connectToDatabase();

    let currentBalance: number = await getBalance(userId);
    let message: string = await getBalanceStatusMessage(currentBalance);

    const responseBody = {
        userId: userId,
        currentBalance: currentBalance,
        message: message
    };

    const response = {
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

async function connectToDatabase() {
    try {
        if ((dbClient && dbClient.isConnected()) || (dbClient == null)) {
            dbClient = await MongoClient.connect(
                MONGODB_URI,
                {
                    ssl: true,
                    sslCA: caBundle,
                    useUnifiedTopology: true
                }
            );
        }
        console.log("Database connection established")
    } catch (e) {
        console.log(e.message);
    }
}

async function getBalance(userId: number): Promise<number> {
    console.log("Retrieve the balance for UserId '" + userId + "'");
    let currentBalance: number = 0.0;
    try {
        const db = dbClient.db(DB_NAME);
        const collection = db.collection(DB_COLLECTION);
        const query = {userId: userId};
        const dbRead = await collection.find(query).toArray();

        for (let i in dbRead) {
            currentBalance += dbRead[i].income - dbRead[i].outgoing;
        }


    } catch (e) {
        console.log(e.message)
    }

    return parseFloat(currentBalance.toFixed(2));
}

async function getBalanceStatusMessage(currentBalance: number): Promise<string> {
    return (currentBalance >= 0) ? 'You have enough money in your account' : 'You do not have enough money in your account';
}

async function populateDatabase(): Promise<void> {
    try {
        const db = dbClient.db(DB_NAME);
        const collection = db.collection(DB_COLLECTION);
        await collection.insertMany(sampleDocuments);
        console.log('Write successful');
        console.log("Multiple document inserted to collection")
    } catch (e) {
        console.log(e.message)
    }
}

async function showAllDocuments(): Promise<void> {
    try {
        const db = dbClient.db(DB_NAME);
        const collection = db.collection(DB_COLLECTION);
        const dbRead = await collection.find({}).toArray();

        for (let i in dbRead) {
            console.log(dbRead[i].userId + ' ' + dbRead[i].income + ' ' + dbRead[i].outgoing);
        }
    } catch (e) {
        console.log(e.message);
    }
}