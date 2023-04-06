pipeline {
    agent { label "Nodo1" }

    stages {
        stage('Clone') {
            steps {
                script {
                    dir('/home/dennys/Documentos/mod8-final') {
                        git branch: 'final', url: 'git@github.com:dennys-flores/modulo8-final.git'
                    }
                    // Get some code from a GitHub repository
                    sh "echo 'git clone'"
                }
            }
        }
        stage('Build') {
            steps {
                // Get some code from a GitHub repository
                sh "echo 'steep'"
            }
        }
        stage('SonarQube') {
            steps {
                // Get some code from a GitHub repository
                sh "echo 'sonar'"
            }
        }
        stage('Docker-Build') {
            steps {
                // Get some code from a GitHub repository
                sh "echo 'sonar'"
            }
        }
        stage('Deploy') {
            steps {
                // Get some code from a GitHub repository
                sh "echo 'sonar'"
            }
        }
        stage('Test-Dev') {
            steps {
                // Get some code from a GitHub repository
                sh "echo 'sonar'"
            }
        }
        stage('Deploy-QA') {
            steps {
                // Get some code from a GitHub repository
                sh "echo 'sonar'"
            }
        }
        stage('QA-Test') {
            steps {
                // Get some code from a GitHub repository
                sh "echo 'sonar'"
            }
        }
        stage('Deploy-Prod') {
            steps {
                // Get some code from a GitHub repository
                sh "echo 'sonar'"
            }
        }
        
    }
}
