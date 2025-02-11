import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import type { WeightEntry } from './types';

const weightData: WeightEntry[] = [
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

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*',
};

const getWeights = async (): Promise<APIGatewayProxyResult> => {
    return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ weightData }),
    };
};

const addWeights = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (!event.body) {
        return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
                message: 'Missing request body',
            }),
        };
    }

    const newEntries: WeightEntry[] = JSON.parse(event.body);

    // Validate the input
    if (!Array.isArray(newEntries)) {
        return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
                message: 'Invalid input: Expected an array of weight entries',
            }),
        };
    }

    // Validate each entry
    for (const entry of newEntries) {
        if (!entry.date || !entry.weight || typeof entry.weight !== 'number') {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    message: 'Invalid entry: Each entry must have a date and weight',
                }),
            };
        }
    }

    // In a real application, you would save these to a database
    weightData.push(...newEntries);

    return {
        statusCode: 201,
        headers,
        body: JSON.stringify({
            message: 'Weight entries added successfully',
            entries: newEntries,
        }),
    };
};

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        switch (event.httpMethod) {
            case 'GET':
                return await getWeights();
            case 'POST':
                return await addWeights(event);
            case 'OPTIONS':
                return {
                    statusCode: 200,
                    headers,
                    body: '',
                };
            default:
                return {
                    statusCode: 405,
                    headers,
                    body: JSON.stringify({
                        message: 'Method not allowed',
                    }),
                };
        }
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                message: 'Some error happened',
            }),
        };
    }
};
