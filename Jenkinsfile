pipeline {
    agent { label "Nodo1" }

    stages {
        stage('Clone') {
            steps {
                script {
                    sh "echo 'git clone'"
                    dir('/home/dennys/Documentos/mod8-final') {
                        git branch: 'main', url: 'git@github.com:dennys-flores/modulo8-final.git'
                    }
                }
            }
        }
        stage('Build') {
            steps {
                sh "echo 'Build'"
                dir('/home/dennys/Documentos/mod8-final/frontend') {
                    sh "npm install"
                }
            }
        }
        stage('SonarQube') {
            steps {
                 sh "echo 'SonarQube Test'"
                sh "docker run --rm -e SONAR_HOST_URL='http://192.168.76.132:9000' -e SONAR_SCANNER_OPTS='-Dsonar.projectKey=proyectofinal' -e SONAR_TOKEN='sqa_dd9f179b2d1083c319c9ff30edf2f7bf17994642' -v '/home/dennys/Documentos/mod8-final:/usr/src' sonarsource/sonar-scanner-cli "
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
