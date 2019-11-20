variable "accountId" {
  description = "The ID of the AWS Account"
  type        = string
}

variable "region" {
  description = "The region to deploy DocumentDB"
  type        = string
}

variable "project-number" {
  description = "Zuhlke project number"
  type        = string
}

variable "project-name" {
  description = "The project name"
  type        = string
}

variable "project-owner" {
  description = "The owner of the project"
  type        = string
}

variable "hosting-bucket-name" {
  description = "The bucket name for hosting the static website"
  type        = string
}

variable "logging-bucket-name" {
  description = "The bucket name for storing logs"
  type        = string
}

variable "deployment-bucket-name" {
  description = "The bucket name for storing Lambda zip"
  type        = string
}

variable "terraform-state-bucket" {
  description = "The bucket name for storing Terraform state"
  type        = string
}

variable "terraform-lock-dynamodb" {
  description = "The table name for locking Terraform state in DynamoDB"
  type        = string
}

variable "docdb-cluster-name" {
  description = "The name of a cluster for DocumentDB"
  type        = string
}

variable "docdb-cluster-instance-name" {
  description = "The name of a cluster instance for DocumentDB"
  type        = string
}

variable "docdb-username" {
  description = "Master username"
  type        = string
}

variable "docdb-password" {
  description = "Master password"
  type        = string
}

variable "docdb-db-name" {
  description = "The database name"
  type        = string
}

variable "docdb-collection-name" {
  description = "The database collection name"
  type        = string
}

variable "docdb-pg-name" {
  description = "The name of a parameter group for DocumentDB"
  type        = string
}

variable "vpc-name" {
  description = "The name of a VPC for DocumentDB"
  type        = string
}

variable "sg-name" {
  description = "The name of a security group for VPC"
  type        = string
}

variable "subnet-name" {
  description = "The name of a subnet for DocumentDB"
  type        = string
}

variable "lambda-function-name" {
  description = "The name of a Lambda function"
  type        = string
}

variable "lambda-role-name" {
  description = "The name of a role for Lambda function"
  type        = string
}