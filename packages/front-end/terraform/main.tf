provider "aws" {
  region = var.region
}

terraform {
  backend "s3" {
    bucket = "z10016-manage-my-budget-tf-state"
    key    = "global/s3/terraform.tfstate"
    region = "eu-west-2"

    dynamodb_table = "z10016-manage-my-budget-tf-lock"
    encrypt        = true
  }
}