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

resource "aws_docdb_cluster" "documentdb-cluster" {
  cluster_identifier = "manage-my-budget-db-cluster"
  availability_zones = ["eu-west-2a", "eu-west-2b", "eu-west-2c"]
  master_username = ""
  master_password = ""
}

resource "aws_docdb_cluster_instance" "cluster-instances" {
  cluster_identifier = "${aws_docdb_cluster.documentdb-cluster.id}"
  instance_class = "db.r5.large"
  count = 2
  identifier = "manage-my-budget-db-${count.index}"
}