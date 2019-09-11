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
        
        stage('Update Deployment'){
            steps{
                dir('deployment')
                {
                    // sh 'minikube stop|| true'
                    // sh 'minikube start'
                    sh 'cd deployment'
                    sh 'kubectl apply -f rabbitmq.yaml'
                    sh 'kubectl apply -f frontend.yaml'
                }
            }
        }
    }
}