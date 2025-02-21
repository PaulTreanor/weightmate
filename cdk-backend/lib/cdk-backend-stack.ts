import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as cognito from 'aws-cdk-lib/aws-cognito';


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
			description: 'For reading and updating user weight data',
			defaultCorsPreflightOptions: {
				allowOrigins: ['*'],
				allowMethods: ['GET', 'POST', 'OPTIONS'],
				allowHeaders: ['Content-Type', 'Authorization'],
				allowCredentials: true
			}
		});

		// Create API Gateway resource and method
		const weightApiIntegration = new apigateway.LambdaIntegration(weightApiLambda);
		// This makes the API route /weight
		const weightEndpoint = api.root.addResource('weight');
		weightEndpoint.addMethod('GET', weightApiIntegration);
		weightEndpoint.addMethod('POST', weightApiIntegration); 

		// **** COGNITO ****
		// Create Cognito User Pool
		const userPool = new cognito.UserPool(this, 'WeightmateUserPool', {
			userPoolName: 'WeightmateUserPool',
			selfSignUpEnabled: true,
			autoVerify: { email: false },  // No email verification
			signInAliases: {
				email: true  // Use email as the username
			},
			passwordPolicy: {
				minLength: 8,
				requireLowercase: true,
				requireDigits: true,
				requireSymbols: true,
				requireUppercase: true,
			},
			
		});

		const userPoolClient = new cognito.UserPoolClient(this, 'WeightmateWebClient', {
			userPool,
			userPoolClientName: 'WeightmateWeb',
			authFlows: {
				userSrp: true,
				userPassword: true,  // Enable simple email/password auth
			},
			preventUserExistenceErrors: true,
		});


		// **** Outputs ****
		new cdk.CfnOutput(this, 'ApiEndpoint', {
			description: 'API Gateway endpoint URL',
			value: api.url
		});

		new cdk.CfnOutput(this, 'WeightApiLambdaArn', {
			description: 'Weight API Lambda Function ARN',
			value: weightApiLambda.functionArn
		});

		new cdk.CfnOutput(this, 'UserPoolId', {
			description: 'User Pool ID',
			value: userPool.userPoolId
		});

		new cdk.CfnOutput(this, 'UserPoolClientId', {
			description: 'User Pool Client ID',
			value: userPoolClient.userPoolClientId
		});

	}
}