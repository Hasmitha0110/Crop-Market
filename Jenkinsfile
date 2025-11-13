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

    stage('push images to the Docker Hub') {
      steps {
        sh 'docker build -t gunarathnegdh/cropmarket-frontend:latest https://github.com/Hasmitha0110/Crop-Market.git#main:cropmarketfrontend'
        sh 'docker build -t gunarathnegdh/cropmarket-backend:latest https://github.com/Hasmitha0110/Crop-Market.git#main:cropmarketbackend'
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
