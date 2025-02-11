export const handler = async (event: any) => {
	console.log('Event received:', JSON.stringify(event, null, 2));
	
	return {
		statusCode: 200,
		body: JSON.stringify({
			message: 'Hello from Lambda!',
			event: event
		}),
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*' // For local testing
		},
	};
};