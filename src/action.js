const core = require('@actions/core')
const github = require('@actions/github')

async await

async function run(){
  const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN')
  
  const octokit = github.getOctokit(GITHUB_TOKEN)

  const { context = {} } = github
  const { pull_request } = context.payload 
  
  await octokit.rest.issues.createComment({
    ...context.repo,
    issue_number: pull_request.number,
    body: 'Thank you for submitting a pull request! we will try to review it in the upcoming 24 hours',
  });
}

run()