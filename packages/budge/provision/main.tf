provider "aws" {
  region = "eu-west-2"
}

resource "aws_s3_bucket" "manage-my-budget-logs" {
  bucket = "manage-my-budget-logs"
  acl = "log-delivery-write"
}

resource "aws_s3_bucket" "manage-my-budget" {
  bucket = "manage-my-budget"

  tags = {
    Name = " ManageMyBudget"
    Environment = "Dev"
    Description = "A bench project in Manchester"
  }

  versioning {
    enabled = true
  }

  logging {
    target_bucket = "${aws_s3_bucket.manage-my-budget-logs.id}"
    target_prefix = "log/"
  }
}