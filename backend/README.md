# weightmate
The backend is deployed to AWS with AWS SAM. 

You will need [the SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html), [Node.js 22](https://nodejs.org/en/), and [Docker](https://hub.docker.com/search/?type=edition&offering=community) to run and depoy the backend. 

## Running the backend locally
```bash
sam build

# Invoke single function locally
# You can also pass it an event with `--event yourEvent.json` flag
sam local invoke WeightsLambdaFunction

# Run API locally 
# Will output localhost port address
sam local start-api

# Rebuild then run API locally
sh start-local

```


## Deploying the backend to AWS 
```bash
# Set your AWS credentials
export AWS_PROFILE ${your-profile-name}`)

# Build application
sam build

# Deploy application
sam deploy --guided # if deploying for first time
# ..deploy options
# 1. Stack Name - CloudFormation stack name - must be unique to account + region
# 2. AWS Region
# 3. Confirm changes before deploy - generally a good idea
# 4. Allow SAM CLI IAM role creation - so SAM can infer required permissions from template + code  
# 5. Save args to samconfig.toml
```


You can find your API Gateway Endpoint URL in the output values displayed after deployment.

## Unit tests
```bash
cd weight-lambda
npm run test
```

## Cleanup
To delete the CloudFormation stack and all its resources:

```bash
sam delete --stack-name weightmate
```

