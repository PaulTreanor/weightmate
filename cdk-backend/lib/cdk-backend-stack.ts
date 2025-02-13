import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class CdkBackendStack extends cdk.Stack {
	constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		// Create Lambda function
		const weightApiLambda = new lambda.Function(this, 'WeightAPIHandler', {
			runtime: lambda.Runtime.NODEJS_18_X,
			code: lambda.Code.fromAsset('lambda'),
			handler: 'weightApi.handler',
		});

		// Create API Gateway
		const api = new apigateway.RestApi(this, 'WeightApi', {
			restApiName: 'Weight API',
			description: 'For reading and updating user weight data'
		});

		// Create API Gateway resource and method
		const weightApiIntegration = new apigateway.LambdaIntegration(weightApiLambda);
		// This makes the API route /weight
		const weightEndpoint = api.root.addResource('weight');
		weightEndpoint.addMethod('GET', weightApiIntegration);
		weightEndpoint.addMethod('POST', weightApiIntegration); 

	}
}