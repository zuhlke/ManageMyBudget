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