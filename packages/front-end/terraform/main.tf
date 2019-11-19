provider "aws" {
  region = "${var.region}"

  backend "s3" {
    bucket = "${var.terraform-state-bucket}"
    key ="global/s3/terraform.tfstate"
    region = "${var.region}"

    dynamodb_table = "z10016-manage-my-budget-tf-lock"
    encrypt = true
  }
}
