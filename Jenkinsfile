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
        sh 'sudo docker compose build'
      }
    }

    stage('Run Containers') {
      steps {
        sh 'sudo docker compose up -d'
      }
    }

    stage('Test') {
      steps {
        sh 'sudo docker ps' // optional: you can add API test scripts here
      }
    }

    stage('Cleanup') {
      steps {
        sh 'sudo docker compose down'
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
