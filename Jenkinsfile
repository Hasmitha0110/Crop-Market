pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Terraform Init & Apply') {
      steps {
        dir('terraform') {
          // Bind AWS Credentials to Environment Variables
          withCredentials([usernamePassword(credentialsId: 'aws-creds', usernameVariable: 'AWS_ACCESS_KEY_ID', passwordVariable: 'AWS_SECRET_ACCESS_KEY')]) {
             sh 'terraform init'
             sh 'terraform validate'
             sh 'terraform plan -out=tfplan'
             // Using -auto-approve for automation.
             sh 'terraform apply -auto-approve tfplan'
          }
        }
      }
    }

    stage('Build Docker Images') {
      steps {
        sh 'docker compose build'
      }
    }

    stage('Run Containers') {
      steps {
        sh 'docker compose up -d'
      }
    }

    stage('Push images to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-cred', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh '''
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
            
            docker build -t $DOCKER_USER/cropmarket-frontend:latest ./cropmarketfrontend
            docker push $DOCKER_USER/cropmarket-frontend:latest

            docker build -t $DOCKER_USER/cropmarket-backend:latest ./cropmarketbackend
            docker push $DOCKER_USER/cropmarket-backend:latest
          '''
        }
      }
    }

    stage('Deploy to EC2') {
      steps {
        dir('terraform') {
          script {
             // 1. Get Public IP from Terraform Output
             def serverIp = sh(script: 'terraform output -raw instance_public_ip', returnStdout: true).trim()
             echo "Deploying to server: ${serverIp}"
             
             // 2. SSH and Deploy using 'ec2-key' credential
             sshagent(['ec2-key']) {
                // Copy the production docker-compose file to the server
                sh "scp -o StrictHostKeyChecking=no ../docker-compose.ec2.yml ec2-user@${serverIp}:/home/ec2-user/docker-compose.yml"
                
                // Remote execute commands: pull new images and restart
                sh """
                    ssh -o StrictHostKeyChecking=no ec2-user@${serverIp} '
                        docker-compose pull
                        docker-compose up -d
                        docker system prune -f
                    '
                """
             }
          }
        }
      }
    }

    stage('Test') {
      steps {
        sh 'docker ps'
      }
    }

    stage('Cleanup') {
      steps {
        sh 'docker compose down'
      }
    }
  }

  post {
    failure {
      echo '❌ Build or test failed!'
    }
    success {
      echo '✅ CropMarket build, infra provision, and deploy succeeded!'
    }
  }
}
