import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import type { WeightEntry } from './types';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand, PutCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";

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

const ddbClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(ddbClient);
const tableName = process.env.WEIGHT_TABLE_NAME!;

const headers = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Headers': 'Content-Type,Authorization',
	'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
	'Access-Control-Allow-Credentials': 'true'
};

const extractUserEmail = (event: APIGatewayProxyEvent): string | null => {
	// For local testing, extract from Authorization header
	if (process.env.AWS_SAM_LOCAL === 'true' || !event.requestContext.authorizer) {
		try {
			const authHeader = event.headers.Authorization || event.headers.authorization;
			if (authHeader) {
				const token = authHeader.replace('Bearer ', '');
				const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
				return payload.email;
			}
		} catch (err) {
			console.log('Error extracting email from token:', err);
		}
	}

	// For production, get from Cognito authorizer claims
	return event.requestContext.authorizer?.claims['email'] || null;
}

const getWeights = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	const userEmail = extractUserEmail(event);
	if (!userEmail) {
		return {
			statusCode: 401,
			headers,
			body: JSON.stringify({ message: 'User email not found' }),
		};
	}

	try {
		const command = new QueryCommand({
			TableName: tableName,
			KeyConditionExpression: 'userEmail = :email',
			ExpressionAttributeValues: {
				':email': userEmail
			}
		});

		const response = await docClient.send(command);
		return {
			statusCode: 200,
			headers,
			body: JSON.stringify({ weightData: response.Items }),
		};
	} catch (error) {
		console.error('Error fetching weights:', error);
		return {
			statusCode: 500,
			headers,
			body: JSON.stringify({ message: 'Error fetching weight data' }),
		};
	}
};

const addWeights = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
	const userEmail = extractUserEmail(event);
	if (!userEmail) {
		return {
			statusCode: 401,
			headers,
			body: JSON.stringify({ message: 'User email not found' }),
		};
	}

	if (!event.body) {
		return {
			statusCode: 400,
			headers,
			body: JSON.stringify({ message: 'Missing request body' }),
		};
	}


    const newEntries: WeightEntry[] = JSON.parse(event.body);
    
	try {
		// Save each entry to DynamoDB
		const savePromises = newEntries.map(entry => {
			const command = new PutCommand({
				TableName: tableName,
				Item: {
					userEmail,
					date: entry.date,
					weight: entry.weight
				}
			});
			return docClient.send(command);
		});

		await Promise.all(savePromises);

		return {
			statusCode: 201,
			headers,
			body: JSON.stringify({
				message: 'Weight entries added successfully',
				entries: newEntries,
			}),
		};
	} catch (error) {
		console.error('Error saving weights:', error);
		return {
			statusCode: 500,
			headers,
			body: JSON.stringify({ message: 'Error saving weight data' }),
		};
	}
};


const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        switch (event.httpMethod) {
            case 'GET':
                return await getWeights(event);
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

export { handler }