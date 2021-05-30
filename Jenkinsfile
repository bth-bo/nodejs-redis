pipeline {
    agent any

    environment {
        registry = "localhost:32000/hello-1-k8s"
        dockerImage = ''
    }

    stages {
        stage('Build') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }

        stage('Build Image') {
            steps {
                script {
                    dockerImage = docker.build registry + ":latest"
                }
            }
        }

        stage('Push Image') {
            steps {
                script {
                    dockerImage.push()
                }
            }
        }

        stage('Deploying to k8s') {
            steps {
                sh 'kubectl apply -f ./yaml/hello-1/hello-1-deployment.yaml'
                sh 'kubectl apply -f ./yaml/hello-1/hello-1-service.yaml'
            }
        }
    }
}
