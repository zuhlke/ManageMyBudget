provider "aws" {
  region = "eu-west-2"
}

resource "aws_s3_bucket" "manage-my-budget-logs" {
  bucket = "${var.logging-bucket-name}"
  acl = "log-delivery-write"
}

resource "aws_s3_bucket" "manage-my-budget" {
  bucket = "${var.hosting-bucket-name}"
  acl = "public-read"
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement":[
    {
      "Sid":"AddReadPermission",
      "Effect":"Allow",
      "Principal": "*",
      "Action":["s3:GetObject"],
      "Resource":["arn:aws:s3:::${var.hosting-bucket-name}/*"]
    }
  ]
}
EOF

  website {
    index_document = "index.html"
  }

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