resource "null_resource" "local-shell-command" {
  provisioner "local-exec" {
    command = <<EOT
        npm install --only=prod ${path.module}/../../back-end
        ditto -c -k --sequesterRsrc --keepParent ../../back-end lambda.zip
EOT
  }
}

resource "aws_s3_bucket_object" "lambda-zip" {
  bucket = aws_s3_bucket.deployment-bucket.bucket
  key    = "lambda.zip"
  source = "lambda.zip"
}

resource "aws_lambda_function" "lambda" {
  function_name = "${var.project-number}-${var.lambda-function-name}"

  s3_bucket = aws_s3_bucket.deployment-bucket.bucket
  s3_key    = aws_s3_bucket_object.lambda-zip.key

  handler = "index.handler"
  role    = aws_iam_role.lambda-iam-role.arn
  runtime = "nodejs8.10"

  vpc_config {
    subnet_ids         = flatten([module.vpc.private_subnets])
    security_group_ids = [aws_security_group.sg.id]
  }

  tags = {
    ProjectName   = var.project-name
    ProjectNumber = var.project-number
    Owner         = var.project-owner
  }

  environment {
    variables = {
      MONGODB_URI   = "mongodb://${var.docdb-username}:${var.docdb-password}@${aws_docdb_cluster.documentdb-cluster.endpoint}:${aws_docdb_cluster.documentdb-cluster.port}/?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred"
      DB_NAME       = var.docdb-db-name
      DB_COLLECTION = var.docdb-collection-name
    }
  }
}

resource "aws_iam_role" "lambda-iam-role" {
  name = "${var.project-number}-${var.lambda-role-name}"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF


  tags = {
    ProjectName = var.project-name
    ProjectNumber = var.project-number
    Owner = var.project-owner
  }
}

data "aws_iam_policy" "AWSLambdaVPCAccessExecutionRole" {
  arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"
}

data "aws_iam_policy" "AmazonDocDBFullAccess" {
  arn = "arn:aws:iam::aws:policy/AmazonDocDBFullAccess"
}

data "aws_iam_policy" "AWSLambdaExecute" {
  arn = "arn:aws:iam::aws:policy/AWSLambdaExecute"
}

resource "aws_iam_role_policy_attachment" "lambda-vpc-policy" {
  role = aws_iam_role.lambda-iam-role.name
  policy_arn = data.aws_iam_policy.AWSLambdaVPCAccessExecutionRole.arn
}

resource "aws_iam_role_policy_attachment" "lambda-docdb-policy" {
  role = aws_iam_role.lambda-iam-role.name
  policy_arn = data.aws_iam_policy.AmazonDocDBFullAccess.arn
}

resource "aws_iam_role_policy_attachment" "lambda-execute-policy" {
  role = aws_iam_role.lambda-iam-role.name
  policy_arn = data.aws_iam_policy.AWSLambdaExecute.arn
}