resource "aws_docdb_subnet_group" "subnet-group" {
  name = "${var.subnet-name}"
  subnet_ids = flatten([module.vpc.public_subnets])
}

resource "aws_docdb_cluster" "documentdb-cluster" {
  skip_final_snapshot = true
  db_subnet_group_name = "${aws_docdb_subnet_group.subnet-group.name}"
  cluster_identifier = "${var.docdb-cluster-name}"
  engine = "docdb"
  master_username = "${var.db-username}"
  master_password = "${var.db-password}"
  db_cluster_parameter_group_name = "${aws_docdb_cluster_parameter_group.docdb-pg.name}"
  vpc_security_group_ids = ["${aws_security_group.sg.id}"]
}

resource "aws_docdb_cluster_instance" "cluster-instances" {
  count = 2
  identifier = "${var.docdb-cluster-instance-name}-${count.index}"
  cluster_identifier = "${aws_docdb_cluster.documentdb-cluster.id}"
  instance_class = "db.r5.large"
}

resource "aws_docdb_cluster_parameter_group" "docdb-pg" {
  family = "docdb3.6"
  name = "${var.docdb-pg-name}"

  parameter {
    name = "tls"
    value = "enabled"
  }
}