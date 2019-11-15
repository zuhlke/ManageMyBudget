import { MongoClient } from "mongodb";
import * as fs from 'fs';
import { sampleDocuments, logUserOverviews, UserOverview } from '../datatypes/userInfo';

const caBundle: Buffer[] = [fs.readFileSync("certs/rds-combined-ca-bundle.pem")];
const MONGODB_URI: string = process.env.MONGODB_URI!;
const DB_NAME: string = process.env.DB_NAME!;
const DB_COLLECTION: string = process.env.DB_COLLECTION!

let dbClient: MongoClient | undefined = undefined;
let dbError: Error | undefined = undefined;

export async function getConnection(): Promise<MongoClient> {
    // clear the errors just in case
    dbError = undefined;

    if (dbClient === undefined || !dbClient.isConnected()) {
        await prepareConnection();
    }

    return new Promise<MongoClient>((resolution, rejection) => {
        if (dbError === undefined && dbClient !== undefined) {
            resolution(dbClient!);
        } else {
            rejection(dbError!);
        }
    });
}

getConnection;

/**
 * set up the dbClient variable within the file
 */
async function prepareConnection(): Promise<MongoClient> {
    return await new MongoClient(
        MONGODB_URI,
        {
            ssl: true,
            sslCA: caBundle,
            useUnifiedTopology: true
        }
    ).connect();
}

export async function populateDatabase(): Promise<void> {
    console.debug('Preparing to populate database');
    let mongoInstance: MongoClient | undefined = undefined;

    getConnection()
        .then(mongoClient => {
            // obtain an instance of the MongoClient so that the connection can be closed.
            mongoInstance = mongoClient;
            return mongoClient.db(DB_NAME);
        })
        .then(mongoDb => mongoDb.collection(DB_COLLECTION))
        .then(dbCollection => dbCollection.insertMany(sampleDocuments))
        .then(_unused => console.log('Write successful'))
        .then(_unused => console.log('Multiple documents inserted into the Collection'))
        .catch(error => console.log(error.message));

    if (mongoInstance !== undefined) {
        mongoInstance!.close();
    }

    console.debug('Population function complete');
}

export async function showAllDocuments(): Promise<void> {
    console.debug('Preparing to show all documents');

    let mongoInstance: MongoClient | undefined = undefined;

    getConnection()
        .then(mongoClient => {
            // obtain an instance of the MongoClient so that the connection can be closed.
            mongoInstance = mongoClient;
            return mongoClient.db(DB_NAME);
        })
        .then(mongoDb => mongoDb.collection(DB_COLLECTION))
        .then(async dbCollection => await dbCollection.find().toArray())
        .then(userOverviews => logUserOverviews(userOverviews))
        .catch(error => console.log(error));

    if (mongoInstance !== undefined) {
        mongoInstance!.close();
    }

    console.debug('Shown all documents');
}

export async function getOverviewsById(userId: number): Promise<UserOverview[]> {
    console.log("Retrieve the balance for UserId '" + userId + "'");

    const queryParameters: UserOverview = { userId: userId };
    let mongoInstance: MongoClient | undefined = undefined;
    let result: UserOverview[] | undefined = undefined;
    let errorOutput: any = undefined;

    getConnection()
        .then(mongoClient => {
            // obtain an instance of the MongoClient so that the connection can be closed.
            mongoInstance = mongoClient;
            return mongoClient.db(DB_NAME);
        })
        .then(mongoDb => mongoDb.collection(DB_COLLECTION))
        .then(async dbCollection => await dbCollection.find(queryParameters).toArray())
        .then(userOverviews => result = userOverviews)
        .catch(error => errorOutput = error);

    if (mongoInstance !== undefined) {
        mongoInstance!.close();
    }

    return new Promise<UserOverview[]>((resolution, rejection) => {
        if (errorOutput === undefined) {
            resolution(result!);
        } else {
            rejection(errorOutput!);
        }
    });
}