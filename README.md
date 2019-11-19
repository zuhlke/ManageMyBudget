
## Manage My Budget

Managing budget for vulnerable people.

## Infrastructure deployment

Before running `terraform apply` please create tfstate bucket using the AWS CLI:

```
aws s3api create-bucket --bucket <tfstate bucket Name> --region eu-west-2
```

It'll create the required S3 bucket with versioining enabled.

In future this will be automated as part of CI/CD pipeline.

### Installation
To install, run:
```
lerna bootstrap
```

### Contributing

### License
[MIT](https://choosealicense.com/licenses/mit/)
