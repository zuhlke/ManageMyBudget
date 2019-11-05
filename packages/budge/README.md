
## Manage My Budget

Managing budget for vulnerable people.

### Installation
To install using node package manager, run:
```
npm install
```

### Provision resources on AWS
Terrform scripts require `secrets.tfvars` where sensitive data are stored. For this project, this file must contain `db-username` and `db-password`. To deploy the resources, run:
```$xslt
terraform init
terraform apply -var-file="debug.tfvars" -var-file="secrets.tfvars"
```
### Contributing

### License
[MIT](https://choosealicense.com/licenses/mit/)
