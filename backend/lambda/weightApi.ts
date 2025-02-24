import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import type { WeightEntry } from './types';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { extractUserEmail, headers } from './utils';

const ddbClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(ddbClient);
const tableName = process.env.WEIGHT_TABLE_NAME!;

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