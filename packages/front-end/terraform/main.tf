provider "aws" {
  region = var.region
}

resource "aws_s3_bucket" "terraform_state" {
  bucket = "${var.project-number}-${var.terraform-state-bucket}"

  # Enable versioning so we can see the full revision history of our
  # state files
  versioning {
    enabled = true
  }

  # Enable server-side encryption by default
  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

  tags = {
    ProjectName = var.project-name
    ProjectNumber = var.project-number
    Owner = var.project-owner
  }
}

resource "aws_dynamodb_table" "terraform_locks" {
  name         = "${var.project-number}-${var.terraform-lock-dynamodb}"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"
  attribute {
    name = "LockID"
    type = "S"
  }
  tags = {
    ProjectName = var.project-name
    ProjectNumber = var.project-number
    Owner = var.project-owner
  }
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

