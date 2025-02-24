import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const ddbClient = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(ddbClient);

async function viewAllWeights() {
	const tableName = process.env.WEIGHT_TABLE_NAME;
	
	if (!tableName) {
		console.error("Please set WEIGHT_TABLE_NAME environment variable");
		process.exit(1);
	}

	try {
		const command = new ScanCommand({
			TableName: tableName
		});

		const response = await docClient.send(command);
		console.log("All weights in database:");
		console.log(JSON.stringify(response.Items, null, 2));
	} catch (error) {
		console.error("Error scanning table:", error);
	}
}

viewAllWeights();