import { APIGatewayProxyEvent } from 'aws-lambda';

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

const headers = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Headers': 'Content-Type,Authorization',
	'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
	'Access-Control-Allow-Credentials': 'true'
};

export { extractUserEmail, headers };