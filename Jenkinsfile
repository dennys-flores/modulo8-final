pipeline {
    agent { label "Nodo1" }
    environment{
        SERVICE_FRONT="frontend"
        SERVICE_BACK="backend"
    }
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
                sh "echo 'Docker Build'"
                dir('/home/dennys/Documentos/mod8-final/frontend') {
                    sh "docker build -t frontend:1.0 ."
                }
                dir('/home/dennys/Documentos/mod8-final/backend') {
                    sh "docker build -t backend:1.0 ."
                }
            }
        }
        stage('Deploy') {
            steps {
                sh "echo 'Deploy'"
                dir('/home/dennys/Documentos/mod8-final') {
                    sh "docker-compose up -d "
                }
                dir('/home/dennys/Documentos/mod8-final/backend') {
                    sh "docker build -t 192.168.76.132:8082/${env.SERVICE_BACK}:${BUILD_NUMBER} ."
                    sh "docker push 192.168.76.132:8082/${env.SERVICE_BACK}:${BUILD_NUMBER}"
                }
                dir('/home/dennys/Documentos/mod8-final/frontend') {
                    sh "docker build -t 192.168.76.132:8082/${env.SERVICE_FRONT}:${BUILD_NUMBER} ."
                    sh "docker push 192.168.76.132:8082/${env.SERVICE_FRONT}:${BUILD_NUMBER}"
                }
            }
        }
        stage('Test-Dev') {
            steps {
                sh "echo 'Test Dev'"
                sh "curl 192.168.76.132:5000"
                sh "curl 192.168.76.132" 
            }
        }
        stage('Deploy-QA') {
            steps {
                sh "echo 'Deploy QA'"
                sh "docker pull 192.168.76.132:8082/${env.SERVICE_BACK}:${BUILD_NUMBER}"
                sh "docker pull 192.168.76.132:8082/${env.SERVICE_FRONT}:${BUILD_NUMBER}"
                sh "docker run -d -p 81:80 --name qa-fronted 192.168.76.132:8082/${env.SERVICE_FRONT}:${BUILD_NUMBER}"
                sh "docker run -d -p 5001:5000 --name qa-backend 192.168.76.132:8082/${env.SERVICE_FRONT}:${BUILD_NUMBER}"
            }
        }
        stage('QA-Test') {
                steps {
                sh "echo 'Test QA'"
                sh "curl 192.168.76.132:5000"
                sh "curl 192.168.76.132" 
            }
        }
        stage('Deploy-Prod') {
            steps {
                sh "echo 'Deploy Produccion'"
                sh "docker pull 192.168.76.132:8082/${env.SERVICE_BACK}:${BUILD_NUMBER}"
                sh "docker pull 192.168.76.132:8082/${env.SERVICE_FRONT}:${BUILD_NUMBER}"
                sh "docker run -d -p 82:80 --name prod-fronted 192.168.76.132:8082/${env.SERVICE_FRONT}:${BUILD_NUMBER}"
                sh "docker run -d -p 5002:5000 --name prod-backend 192.168.76.132:8082/${env.SERVICE_FRONT}:${BUILD_NUMBER}"
                
            }
        }
        
    }
}
