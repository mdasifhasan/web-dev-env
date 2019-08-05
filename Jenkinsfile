def frontend = 'frontend'
def backend = 'backend'
def frontend_coverage = 'frontend/coverage'
def jenkins = 'jenkins/merge-cobertura'

pipeline {
    agent none
    stages {
        stage ('TEST'){
            parallel {            
                stage ('Frontend') {
                    environment {
                        CI = 'true'
                    }
                    agent {
                        docker {
                            image 'node:12-alpine'
                        }
                    }                
                    stages {
                        stage('Frontend-Install') {
                            steps {
                                dir(frontend){
                                    sh 'mkdir bk'
                                    sh 'cp package.json ./bk/package.json'
                                    sh 'cd bk && npm install'
                                    sh 'mv bk/node_modules node_modules'
                                    sh 'rm -rf bk'
                                    // echo 'h'
                                }
                            }
                        }
                        stage('Frontend-Test') {
                            steps {
                                dir(frontend){
                                    sh 'npm run test:ci'
                                    // echo 'hello'
                                }
                            }
                            post {
                                always {
                                    dir(frontend_coverage){
                                        sh 'mv cobertura-coverage.xml cobertura-coverage-front.xml'
                                        stash name: "coverage-frontend", includes: "cobertura-coverage-front.xml"
                                        junit "junit.xml"
                                    }
                                }
                            }
                        }                
                    }
                }
                stage ('Backend') {
                    agent {
                        docker {
                            image 'golang:1.12-alpine3.10'
                        }
                    }                
                    stages {
                        stage('Backend-Test') {
                            steps {
                                dir(backend){
                                    sh 'apk add git'

                                    // go2xunit
                                    sh 'CGO_ENABLED=0 GOOS=linux go get github.com/tebeka/go2xunit'
                                    sh 'CGO_ENABLED=0 GOOS=linux go test -v ./... | go2xunit -output report.xml'

                                    //junit-report
                                    // sh 'CGO_ENABLED=0 GOOS=linux go get -u github.com/jstemmer/go-junit-report'
                                    // sh 'CGO_ENABLED=0 GOOS=linux go test -v 2>&1 | go-junit-report > report.xml'
                                }
                            }
                            post {
                                always {
                                    dir(backend){
                                        junit "report.xml"
                                    }
                                }
                            }
                        }
                        stage('Backend-Coverage') {
                            steps {
                                dir(backend){
                                    sh 'CGO_ENABLED=0 GOOS=linux go get github.com/t-yuki/gocover-cobertura'
                                    sh 'CGO_ENABLED=0 GOOS=linux go test -coverprofile=coverage.txt -covermode count'
                                }
                            }
                            post {
                                always {
                                    dir(backend){
                                        sh 'CGO_ENABLED=0 GOOS=linux gocover-cobertura < coverage.txt > cobertura-coverage-back.xml'
                                        stash name: "coverage-backend", includes: "cobertura-coverage-back.xml"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        stage ('Publish Results') {
            agent {
                docker {
                    image 'node:12-alpine'
                }
            }                
            stages {
                stage('Generate Coverage Report') {
                    steps {
                        dir(jenkins){
                            unstash 'coverage-frontend';
                            unstash 'coverage-backend';
                            cobertura coberturaReportFile: '*.xml'                            
                            sh 'npm install'
                            sh 'node merge-cobertura.js cobertura-coverage-back.xml cobertura-coverage-front.xml to=cobertura-coverage.xml'
                            // sh 'ls'
                        }
                    }
                }
                stage('Publish Coverage Master Branch') {
                    when { branch 'master' }
                    steps {
                        script {
                            currentBuild.result = 'SUCCESS'
                        }
                        dir(jenkins){
                            step([$class: 'MasterCoverageAction', publishResultAs: 'statusCheck', scmVars: [GIT_URL: env.GIT_URL]])
                        }
                    }
                }
                stage('PR Coverage to Github') {
                    when { allOf {not { branch 'master' }; expression { return env.CHANGE_ID != null }} }
                    steps {
                        script {
                            currentBuild.result = 'SUCCESS'
                        }
                        dir(jenkins){
                            step([$class: 'CompareCoverageAction', publishResultAs: 'statusCheck', scmVars: [GIT_URL: env.GIT_URL]])
                        }
                    }
                }
            }
        }
    }
}