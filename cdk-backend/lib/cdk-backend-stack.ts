import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class CdkBackendStack extends cdk.Stack {
	constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		// Create Lambda function
		const helloLambda = new lambda.Function(this, 'HelloHandler', {
			runtime: lambda.Runtime.NODEJS_18_X,
			code: lambda.Code.fromAsset('lambda'),
			handler: 'hello.handler',
		});

		// Create API Gateway
		const api = new apigateway.RestApi(this, 'HelloApi', {
			restApiName: 'Hello API',
			description: 'Simple hello world API'
		});

		// Create API Gateway resource and method
		const helloIntegration = new apigateway.LambdaIntegration(helloLambda);
		// This makes the API route /hello
		const hello = api.root.addResource('hello');
		hello.addMethod('GET', helloIntegration);
	}
}