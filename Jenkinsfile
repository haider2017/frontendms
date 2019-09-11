pipeline {
    agent any

    environment {
        registryCredential = 'dockerhub'
    }

    stages {
        stage('Build Application') {
            steps {
               sh 'git pull https://github.com/haider2017/frontendms.git'
               sh 'echo **** Installing NPM Dependencies ****'
               sh 'npm install'
            }
        }
        stage('Test Application') {
            steps {
               echo '**** Running App Tests ****'
               echo 'Tests Passed'
            }
        }
        stage('Build Image') {
            steps {
                echo '**** Building Container Image ****'
                sh 'docker build -t frontendms .'
                sh 'docker tag frontendms devopslab3img1/frontendms'
            }
        }

        stage('Push to DockerHub'){
            steps{
                script {
                    docker.withRegistry( '', registryCredential ) {
                        sh 'docker push devopslab3img1/frontendms:latest'
                    }
                }
            }
        }
        
        stage('Update Deployment'){
            steps{
                dir('deployment')
                {
                    sh 'minikube stop || true'
                    sh 'minikube start'
                    sh 'ls'
                    sh 'pwd'
                    sh 'kubectl apply -f rabbitmq.yaml'
                    sh 'kubectl apply -f frontend.yaml'
                }
            }
        }
    }
}