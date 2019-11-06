resource "aws_docdb_subnet_group" "subnet-group" {
  name = "${var.project-number}-${var.subnet-name}"
  subnet_ids = flatten([module.vpc.public_subnets])

  tags = {
    ProjectName = "${var.project-name}"
    ProjectNumber = "${var.project-number}"
    Owner = "${var.project-owner}"
  }
}

resource "aws_docdb_cluster" "documentdb-cluster" {
  skip_final_snapshot = true
  db_subnet_group_name = "${aws_docdb_subnet_group.subnet-group.name}"
  cluster_identifier = "${var.project-number}-${var.docdb-cluster-name}"
  engine = "docdb"
  master_username = "${var.db-username}"
  master_password = "${var.db-password}"
  db_cluster_parameter_group_name = "${aws_docdb_cluster_parameter_group.docdb-pg.name}"
  vpc_security_group_ids = ["${aws_security_group.sg.id}"]

  tags = {
    ProjectName = "${var.project-name}"
    ProjectNumber = "${var.project-number}"
    Owner = "${var.project-owner}"
  }
}

resource "aws_docdb_cluster_instance" "cluster-instances" {
  count = 2
  identifier = "${var.project-number}-${var.docdb-cluster-instance-name}-${count.index}"
  cluster_identifier = "${aws_docdb_cluster.documentdb-cluster.id}"
  instance_class = "db.r5.large"

  tags = {
    ProjectName = "${var.project-name}"
    ProjectNumber = "${var.project-number}"
    Owner = "${var.project-owner}"
  }
}

resource "aws_docdb_cluster_parameter_group" "docdb-pg" {
  family = "docdb3.6"
  name = "${var.project-number}-${var.docdb-pg-name}"

  parameter {
    name = "tls"
    value = "enabled"
  }

  tags = {
    ProjectName = "${var.project-name}"
    ProjectNumber = "${var.project-number}"
    Owner = "${var.project-owner}"
  }
}