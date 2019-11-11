"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var MongoClient = require('mongodb').MongoClient, fs = require('fs');
var caBundle = [fs.readFileSync("certs/rds-combined-ca-bundle.pem")];
var MONGODB_URI = process.env.MONGODB_URI;
var DB_NAME = process.env.DB_NAME;
var DB_COLLECTION = process.env.DB_COLLECTION;
var dbClient = null;
var sampleDocuments = [
    { "userId": 1, "income": 750, "outgoing": 679.87 },
    { "userId": 2, "income": 750, "outgoing": 890.23 },
    { "userId": 3, "income": 750, "outgoing": 566.45 },
    { "userId": 4, "income": 750, "outgoing": 1023.02 },
    { "userId": 5, "income": 750, "outgoing": 456.78 },
    { "userId": 6, "income": 750, "outgoing": 745.78 },
    { "userId": 7, "income": 750, "outgoing": 723.47 },
];
exports.handler = function (event, context) {
    if (event === void 0) { event = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var userId, data, currentBalance, message, responseBody, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = 0;
                    // Lambda proxy integration
                    if (event) {
                        try {
                            if (event.queryStringParameters && event.queryStringParameters.userId) {
                                userId = +event.queryStringParameters.userId;
                            }
                            else if (event.body.userId) {
                                userId = +event.body.userId;
                            }
                            if (event.body) {
                                data = JSON.parse(event.body);
                                if (data.userId) {
                                    userId = data.userId;
                                }
                            }
                        }
                        catch (e) {
                            return [2 /*return*/, {
                                    statusCode: 400,
                                    body: JSON.stringify({
                                        userId: userId,
                                        message: 'There was an error parsing the JSON data posted to this endpoint',
                                        error: e.message
                                    }),
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Access-Control-Allow-Origin': '*'
                                    }
                                }];
                        }
                    }
                    console.log('UserId: ' + userId);
                    return [4 /*yield*/, connectToDatabase()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, getBalance(userId)];
                case 2:
                    currentBalance = _a.sent();
                    return [4 /*yield*/, getBalanceStatusMessage(currentBalance)];
                case 3:
                    message = _a.sent();
                    responseBody = {
                        userId: userId,
                        currentBalance: currentBalance,
                        message: message
                    };
                    response = {
                        statusCode: 200,
                        body: JSON.stringify(responseBody),
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        }
                    };
                    console.log(response);
                    return [2 /*return*/, response];
            }
        });
    });
};
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    if (!((dbClient && dbClient.isConnected()) || (dbClient == null))) return [3 /*break*/, 2];
                    return [4 /*yield*/, MongoClient.connect(MONGODB_URI, {
                            ssl: true,
                            sslCA: caBundle,
                            useUnifiedTopology: true
                        })];
                case 1:
                    dbClient = _a.sent();
                    _a.label = 2;
                case 2:
                    console.log("Database connection established");
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.log(e_1.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getBalance(userId) {
    return __awaiter(this, void 0, void 0, function () {
        var currentBalance, db, collection, query, dbRead, i, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Retrieve the balance for UserId '" + userId + "'");
                    currentBalance = 0.0;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    db = dbClient.db(DB_NAME);
                    collection = db.collection(DB_COLLECTION);
                    query = { userId: userId };
                    return [4 /*yield*/, collection.find(query).toArray()];
                case 2:
                    dbRead = _a.sent();
                    for (i in dbRead) {
                        currentBalance += dbRead[i].income - dbRead[i].outgoing;
                    }
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    console.log(e_2.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, parseFloat(currentBalance.toFixed(2))];
            }
        });
    });
}
function getBalanceStatusMessage(currentBalance) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, (currentBalance >= 0) ? 'You have enough money in your account' : 'You do not have enough money in your account'];
        });
    });
}
function populateDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var db, collection, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    db = dbClient.db(DB_NAME);
                    collection = db.collection(DB_COLLECTION);
                    return [4 /*yield*/, collection.insertMany(sampleDocuments)];
                case 1:
                    _a.sent();
                    console.log('Write successful');
                    console.log("Multiple document inserted to collection");
                    return [3 /*break*/, 3];
                case 2:
                    e_3 = _a.sent();
                    console.log(e_3.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function showAllDocuments() {
    return __awaiter(this, void 0, void 0, function () {
        var db, collection, dbRead, i, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    db = dbClient.db(DB_NAME);
                    collection = db.collection(DB_COLLECTION);
                    return [4 /*yield*/, collection.find({}).toArray()];
                case 1:
                    dbRead = _a.sent();
                    for (i in dbRead) {
                        console.log(dbRead[i].userId + ' ' + dbRead[i].income + ' ' + dbRead[i].outgoing);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    e_4 = _a.sent();
                    console.log(e_4.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
