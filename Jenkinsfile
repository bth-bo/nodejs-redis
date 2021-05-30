pipeline {
    agent any

    environment {
        imageName = "hello-1-k8s"
        registry = "localhost:32000/" + ${imageName}
        dockerImage = ''
    }

    stages {
        stage('Checkout SCM'){
            echo env.BRANCH_NAME
        }
        stage('Build') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }

        stage('Clean old Image') {
            steps {
                    //foundOldImage = sh(script: "docker images | grep localhost:32000/hello-2 | grep latest | awk '{print $3}')
                script {
                    sh 'docker rmi localhost:32000/hello-1-k8s'
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
