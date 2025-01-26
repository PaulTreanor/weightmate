import "./src/styles/global.css"
import { Amplify } from 'aws-amplify';

Amplify.configure({
	Auth: {
		Cognito: {
			userPoolId: 'eu-west-1_JpqZxFDhE',
			userPoolClientId: '3a5k2g7dvvu59l85ds52ed524j',
			region: 'eu-west-1',
			loginWith: {
				username: false,
				email: true,
			}
		}
	}
});

