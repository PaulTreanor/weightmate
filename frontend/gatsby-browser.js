import "./src/styles/global.css"
import { Amplify } from 'aws-amplify';

Amplify.configure({
	Auth: {
		Cognito: {
			userPoolId: process.env.GATSBY_COGNITO_USER_POOL_ID,
			userPoolClientId: process.env.GATSBY_COGNITO_CLIENT_ID,
			region: process.env.AWS_REGION,
			loginWith: {
				username: false,
				email: true,
			}
		}
	}
});
