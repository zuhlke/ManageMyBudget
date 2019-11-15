export interface LambdaResponse {
    statusCode: number;
    body?: any;
    headers?: {
        'Content-Type'?: string;
        'Access-Control-Allow-Origin'?: string;
    }
}