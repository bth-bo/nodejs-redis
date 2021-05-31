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
                    def imageTag = ''
                    def branchType = ''
                    def branchName = ''

                    if ( _branch.size() != 1 ) {
                            env.branchType = "${_branch[0]}"
                            env.branchName = "${_branch[1]}"
                            env.imageTag = env.branchType
                    } else {
                            env.branchType = "${_branch}"
                            env.branchName = "${_branch}"
                        if ( branchType == "master" ) {
                            env.imageTag = "latest"
                        } else {
                            env.imageTag = env.branchType
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

        stage('Test'){
            steps {
                script {
                    sh 'npm test'
                }
            }
        }

        stage('Clean old Image') {
            steps {
                script { 
                    def imageName = "${registry}" + "/" + "${branchName}"
                    env.imageName = "${imageName}"
                    def oldImageID = sh( 
                                            script: 'docker images -qf reference=\${imageName}:\${imageTag}',
                                            returnStdout: true
                                        )

                    echo "Image Name: " + "${imageName}"
                    echo "Old Image: ${oldImageID}"

                    if ( "${oldImageID}" != '' ) {
                        echo "Deleting image id: ${oldImageID}..."
                        sh "docker rmi -f ${oldImageID}"
                    } else {
                        echo "No image to delete..."
                        } 
                    }  
                }
            }

        stage('Build Image') {
            steps {
                script {
                    def dockerfile = "Dockerfile.${env.branchName}"
                    dockerImage = docker.build("${imageName}" + ":" + "${imageTag}", "-f ${dockerfile} ./docker")
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
                sh 'kubectl apply -f ./yaml/\${branchName}/\${branchName}-deployment.yaml'
                sh 'kubectl apply -f ./yaml/\${branchName}/\${branchName}-service.yaml'
            }
        }
    }
}
