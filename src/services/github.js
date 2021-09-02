const inquirer = require('inquirer')
const { Octokit } = require('@octokit/rest')
const Configstore = require('configstore')
const packageJson = require('../../package.json')
const { questions } = require('../models/questions')

// Create a Configstore instance
const config = new Configstore(packageJson.name)

const authenticate = async () => {
  const token = config.get('github_token')

  if (token) {
    try {
      return new Octokit({ auth: token })
    } catch (error) {
      console.error('Something is wrong at authenticate', error)
    }
  } else {
    const answer = await inquirer.prompt(questions.githubToken)

    try {
      config.set('github_token', answer.token)
      return new Octokit({ auth: answer.token })
    } catch (error) {
      console.log('Something is wrong at authenticate', error)
    }
  }
}

module.exports = { authenticate, config }
