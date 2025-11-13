pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        checkout scm
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
      echo '✅ CropMarket build and deploy succeeded!'
    }
  }
}
