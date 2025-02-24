import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, BatchWriteCommand } from "@aws-sdk/lib-dynamodb";
import * as fs from 'fs';

const ddbClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(ddbClient);

interface WeightEntry {
	userEmail: string;
	date: string;
	weight: number;
}

async function bulkUpdateWeights(inputFile: string) {
	const tableName = process.env.WEIGHT_TABLE_NAME;
	
	if (!tableName) {
		console.error("Please set WEIGHT_TABLE_NAME environment variable");
		process.exit(1);
	}

	try {
		// Read the JSON file
		const data = fs.readFileSync(inputFile, 'utf8');
		const entries: WeightEntry[] = JSON.parse(data);

		// DynamoDB BatchWrite can only handle 25 items at a time
		for (let i = 0; i < entries.length; i += 25) {
			const batch = entries.slice(i, i + 25);
			
			const command = new BatchWriteCommand({
				RequestItems: {
					[tableName]: batch.map(item => ({
						PutRequest: {
							Item: item
						}
					}))
				}
			});

			await docClient.send(command);
			console.log(`Processed batch ${i/25 + 1}`);
		}

		console.log("Bulk update completed successfully");
	} catch (error) {
		console.error("Error updating table:", error);
	}
}

// Check if file name is provided
const inputFile = process.argv[2];
if (!inputFile) {
	console.error("Please provide an input JSON file path");
	console.error("Usage: ts-node bulkUpdate.ts <input-file.json>");
	process.exit(1);
}

bulkUpdateWeights(inputFile);