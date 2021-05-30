pipeline {
    agent any

    environment {
        registry = "localhost:32000/hello-2"
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
                sh 'kubectl apply -f ./yaml/hello-2/hello-2-deployment.yml'
                sh 'kubectl apply -f ./yaml/hello-2/hello-2-service.yml'
            }
        }
    }
}