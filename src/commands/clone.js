const app = require('commander')

const { cloneRepo } = require('../services/shell')
const { inquireRepositoryData } = require('../services/inquirer')

const clone = () =>
  app
    .command('clone')
    .arguments('<category>', 'Category from NUWE')
    .description('Clone one of the bootstraped templates from nuwe to get your challenge ready')
    .action(async () => {
      const { url, repoName } = await inquireRepositoryData()
      cloneRepo(url, repoName)
    })

module.exports = { clone }
