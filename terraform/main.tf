provider "aws" {
  region = var.aws_region
}

# Security Group
resource "aws_security_group" "cropmarket_sg" {
  name        = "cropmarket-sg"
  description = "Allow inbound traffic for SSH, HTTP, React and Spring Boot"

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "React App"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Spring Boot App"
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Key Pair (Change public_key to your own if needed, or rely on existing)
# Ideally, we inject this or create one. For simplicity in this lab,
# we will assume a key pair exists or create a new one if user provides a public key.
# For now, let's just use a variable for the key name.
# resource "aws_key_pair" "deployer" {
#   key_name   = "deployer-key"
#   public_key = var.public_key
# }

# EC2 Instance
resource "aws_instance" "cropmarket_server" {
  ami           = var.ami_id
  instance_type = var.instance_type
  key_name      = var.key_name

  vpc_security_group_ids = [aws_security_group.cropmarket_sg.id]

  user_data = <<-EOF
              #!/bin/bash
              # Update and install Docker
              dnf update -y
              dnf install -y docker
              systemctl enable docker
              systemctl start docker
              usermod -a -G docker ec2-user

              # Install Docker Compose (Stand-alone binary)
              curl -SL https://github.com/docker/compose/releases/download/v2.24.5/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose
              chmod +x /usr/local/bin/docker-compose
              ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
              EOF

  tags = {
    Name = "CropMarket-Server"
  }
}
