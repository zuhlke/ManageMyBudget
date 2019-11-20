module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "${var.project-number}-${var.vpc-name}"
  cidr = "10.0.0.0/16"

  azs             = ["${var.region}a", "${var.region}b", "${var.region}c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  enable_dns_hostnames = true
  enable_dns_support   = true
  enable_nat_gateway   = true
  enable_vpn_gateway   = true
  single_nat_gateway   = false

  tags = {
    ProjectName   = var.project-name
    ProjectNumber = var.project-number
    Owner         = var.project-owner
  }
}

resource "aws_security_group" "sg" {
  name   = "${var.project-number}-${var.sg-name}"
  vpc_id = module.vpc.vpc_id

  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    ProjectName   = var.project-name
    ProjectNumber = var.project-number
    Owner         = var.project-owner
  }
}