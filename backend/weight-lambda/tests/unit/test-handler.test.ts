import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { lambdaHandler } from '../../app';
import { expect, describe, it } from '@jest/globals';

const weightData = [
    { date: '2023-01-15', weight: 90.2 },
    { date: '2023-02-01', weight: 90.5 },
    { date: '2023-03-15', weight: 91.0 },
    { date: '2023-04-01', weight: 91.4 },
    { date: '2023-05-15', weight: 91.8 },
    { date: '2023-06-01', weight: 92.3 },
    { date: '2023-07-15', weight: 92.8 },
    { date: '2023-08-01', weight: 93.2 },
    { date: '2023-09-15', weight: 93.7 },
    { date: '2023-10-01', weight: 94.1 },
    { date: '2023-11-15', weight: 94.5 },
    { date: '2023-12-01', weight: 94.9 },
    { date: '2024-02-15', weight: 95.3 },
    { date: '2024-03-01', weight: 95.8 },
    { date: '2024-03-15', weight: 96.2 },
    { date: '2024-04-02', weight: 96.5 },
    { date: '2024-04-20', weight: 96.9 },
    { date: '2024-05-05', weight: 97.3 },
    { date: '2024-06-10', weight: 97.8 },
    { date: '2024-07-15', weight: 98.2 },
    { date: '2024-08-22', weight: 98.5 },
    { date: '2024-09-30', weight: 98.8 },
    { date: '2024-11-15', weight: 99.0 },
    { date: '2024-12-25', weight: 99.3 },
    { date: '2025-01-01', weight: 99.2 },
    { date: '2025-01-03', weight: 99.1 },
    { date: '2025-01-04', weight: 99.4 },
    { date: '2025-01-08', weight: 99.0 },
    { date: '2025-01-11', weight: 98.7 },
    { date: '2025-01-12', weight: 98.3 },
    { date: '2025-01-19', weight: 98.2 },
    { date: '2025-01-20', weight: 98.1 },
    { date: '2025-01-21', weight: 97.5 },
    { date: '2025-01-22', weight: 97.4 },
];

describe('Unit test for app handler', function () {
    it('verifies successful response', async () => {
        const event: APIGatewayProxyEvent = {
            httpMethod: 'get',
            body: '',
            headers: {},
            isBase64Encoded: false,
            multiValueHeaders: {},
            multiValueQueryStringParameters: {},
            path: '/weight',
            pathParameters: {},
            queryStringParameters: {},
            requestContext: {
                accountId: '123456789012',
                apiId: '1234',
                authorizer: {},
                httpMethod: 'get',
                identity: {
                    accessKey: '',
                    accountId: '',
                    apiKey: '',
                    apiKeyId: '',
                    caller: '',
                    clientCert: {
                        clientCertPem: '',
                        issuerDN: '',
                        serialNumber: '',
                        subjectDN: '',
                        validity: { notAfter: '', notBefore: '' },
                    },
                    cognitoAuthenticationProvider: '',
                    cognitoAuthenticationType: '',
                    cognitoIdentityId: '',
                    cognitoIdentityPoolId: '',
                    principalOrgId: '',
                    sourceIp: '',
                    user: '',
                    userAgent: '',
                    userArn: '',
                },
                path: '/weight',
                protocol: 'HTTP/1.1',
                requestId: 'c6af9ac6-7b61-11e6-9a41-93e8deadbeef',
                requestTimeEpoch: 1428582896000,
                resourceId: '123456',
                resourcePath: '/weight',
                stage: 'dev',
            },
            resource: '',
            stageVariables: {},
        };
        const result: APIGatewayProxyResult = await lambdaHandler(event);

        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(JSON.stringify({ weightData }));
    });
});
