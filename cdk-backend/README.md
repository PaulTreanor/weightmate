# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npm run dev`     build, 
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template

## Endpoints
- Root 
    - Local - http://localhost:3000/
    - Prod - https://42aeyqb3ci.execute-api.eu-west-1.amazonaws.com/prod/weight
- /weight
    - GET - Returns mock json data for weights
    - POST - Adds weight data for user

## Testing API 
```bash
# Add new weight entry
curl -X POST \
  http://localhost:3000/weight \
  -H 'Content-Type: application/json' \
  -d '[{"weight": 75.5, "date": "2024-03-19"}]'
```