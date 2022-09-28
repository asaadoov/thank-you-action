const core = require('@actions/core')
const github = require('@actions/github')
const fetch = require('node-fetch')

async function run(){
  const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN')
  const TENOR_TOKEN = core.getInput('TENOR_TOKEN')
  
  const random_pos = Math.round(Math.random() * 1000)
  const url = `https://tenor.googleapis.com/v2/search?q=thanks&key=AIzaSyDP6EsRZ2eN-tTm1ra7SE0bcrqxbCwH7BA&&limit=8&random=true&pos=${random_pos}`

  const response = await fetch(url)
  const { results } = await response.json()
  const gifurl = results[0].media_formats.tinygif.url

  const octokit = github.getOctokit(GITHUB_TOKEN)

  const { context = {} } = github
  const { pull_request } = context.payload 
  
  await octokit.rest.issues.createComment({
    ...context.repo,
    issue_number: pull_request.number,
    body: `Thank you for submitting a pull request! we will try to review it in the upcoming 24 hours. \n\n<img src="${gifurl}" alt="Thank you" />`
  });
}

try {
  run()
} catch(error) {
  throw new Error(error);
}