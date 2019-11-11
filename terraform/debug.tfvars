# AWS region to provision resources
region = "eu-west-2"

# Project related info
project-name = "Manage My Budget"
project-number = "z10016"
project-owner = "Asyl Jumagaliyev"

# S3 bucket for hosting static website
hosting-bucket-name = "manage-my-budget"
logging-bucket-name = "manage-my-budget-logs"
deployment-bucket-name = "manage-my-budget-deploy"

# DocumentDB cluster and instances
docdb-cluster-name = "manage-my-budget-docdb-cluster"
docdb-cluster-instance-name = "manage-my-budget-docdb"
docdb-pg-name = "manage-my-budget-docdb-cluster-pg"

# VPC and security group for DocumentDB and Lambda
vpc-name = "manage-my-budget-vpc"
sg-name = "manage-my-budget-sg"
subnet-name = "manage-my-budget-subnet"

# Lambda
lambda-function-name = "getBalance"
lambda-role-name = "manage-my-budget-docdb"
