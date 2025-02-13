# CDK-Backend

Just learning about CDK

- v2 is latest

## CDK setup steps 

- Install CDK
```bash
npm install -g aws-cdk
```

- Initialise app
```bash
cdk init app --language typescript
```

This will get you a decent app starting point

Install some more dependencies
```bash
npm install @aws-cdk/aws-lambda @aws-cdk/aws-apigateway
```


## Deploying 
```bash
# check changes
cdk diff

## bootstrap cdk (for first time using cdk in AWS account)
cdk bootstrap

## deploying
cdk deploy
```