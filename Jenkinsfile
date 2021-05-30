pipeline {
    agent any

    environment {
        //imageName = "hello-2-k8s"
        registry = "localhost:32000"
        dockerImage = ''
    }

    stages {
        stage('Info'){
            steps {
                script {
                    def _branch = "${env.BRANCH_NAME}".split("/")
                    def imageTag = "${env.BUILD_NUMBER}"
                    def branchType = ''
                    def branchName = ''

                    if ( _branch.size() != 1 ) {
                            branchType = "${_branch[0]}"
                            branchName = "${_branch[1]}"
                            imageTag = "${imageTag}"
                    } else {
                            branchType = "${_branch}"
                            branchName = "${_branch}"
                        if ( branchType == "master" ) {
                            imageTag = "latest"
                        } else {
                            imageTag = "${imageTag}"
                        }
                    }
                    
                    echo "Project Name: " + "${env.JOB_NAME}"
                    echo "Branch type: " + "${branchType}"
                    echo "Branch name: " + "${env.BRANCH_NAME}"

                    }
                }
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
                script { 
                    def imageName = "${registry}/${branchName}"
            
                    echo "Image Name: ${imageName}"
                    oldImageID = sh(script: "docker images -qf reference=${imgName}:${imageTag}")

                    if ( !$foundOldImage.isEmpty() ) {
                        sh 'docker rmi ${oldImageID}'
                        } 
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
