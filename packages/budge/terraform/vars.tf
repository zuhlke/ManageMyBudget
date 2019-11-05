variable "region" {
  description = "The region to deploy DocumentDB"
  type = "string"
}

variable "hosting-bucket-name" {
  description = "A bucket name for hosting the static website"
  type = "string"
}

variable "logging-bucket-name" {
  description = "A bucket name for storing logs"
  type = "string"
}

variable "docdb-cluster-name" {
  description = "The name of a cluster for DocumentDB"
  type = "string"
}

variable "docdb-cluster-instance-name" {
  description = "The name of a cluster instance for DocumentDB"
  type = "string"
}

variable "db-username" {
  description = "Master username"
  type = "string"
}

variable "db-password" {
  description = "Master password"
  type = "string"
}

variable "docdb-pg-name" {
  description = "The name of a parameter group for DocumentDB"
  type = "string"
}

variable "vpc-name" {
  description = "The name of a VPC for DocumentDB"
  type = "string"
}

variable "sg-name" {
  description = "The name of a security group for VPC"
  type = "string"
}

variable "subnet-name" {
  description = "The name of a subnet for DocumentDB"
  type = "string"
}