node {
  try {
    stage('Checkout') {
      checkout scm
    }
    stage('Environment') {
      sh 'git --version'
      echo "Branch: ${env.BRANCH_NAME}"
      sh 'docker -v'
      sh 'export NODE_ENV=production'
      sh 'printenv'
    }
    stage('Install dependencies'){
      sh 'sudo npm install'
    }
    stage('Build') {
      if (env.BRANCH_NAME == 'master') {
        sh 'docker-compose build'
      }
      if (env.BRANCH_NAME == 'dev') {
        sh 'sudo npm run build'
      }
    }
    stage('Deploy'){
      if (env.BRANCH_NAME == 'master'){
        sh 'docker-compose up -d'
      }
      else if (env.BRANCH_NAME == 'dev') {
        sh ''
      }
    }
  }
  catch (err) {
    throw err
  }
}