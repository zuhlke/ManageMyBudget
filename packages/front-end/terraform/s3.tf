resource "aws_s3_bucket" "manage-my-budget-logs" {
  bucket = "${var.project-number}-${var.logging-bucket-name}"
  acl = "log-delivery-write"

  tags = {
    ProjectName = "${var.project-name}"
    ProjectNumber = "${var.project-number}"
    Owner = "${var.project-owner}"
  }
}

resource "aws_s3_bucket" "manage-my-budget" {
  bucket = "${var.project-number}-${var.hosting-bucket-name}"
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
      "Resource":["arn:aws:s3:::${var.project-number}-${var.hosting-bucket-name}/*"]
    }
  ]
}
EOF

  website {
    index_document = "index.html"
  }

  tags = {
    ProjectName = "${var.project-name}"
    ProjectNumber = "${var.project-number}"
    Owner = "${var.project-owner}"
  }

  versioning {
    enabled = true
  }

  logging {
    target_bucket = "${aws_s3_bucket.manage-my-budget-logs.id}"
    target_prefix = "log/"
  }
}

resource "aws_s3_bucket" "deployment-bucket" {
  bucket = "${var.project-number}-${var.deployment-bucket-name}"
  acl = "private"
  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

  tags = {
    ProjectName = "${var.project-name}"
    ProjectNumber = "${var.project-number}"
    Owner = "${var.project-owner}"
  }
}