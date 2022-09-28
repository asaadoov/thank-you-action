const core = require('@actions/core')
const github = require('@actions/github')
import fetch from 'node-fetch'

async function run(){
  const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN')
  const TENOR_TOKEN = core.getInput('TENOR_TOKEN')
  
  const random_pos = Math.round(Math.random() * 1000)
  const url = `https://api.tenor.com/v1/search?q=thank%20you&pos=${random_pos}&limit=1&media_filter=minimal&contentfilter=high&key=${TENOR_TOKEN}`

  const response = await fetch(url)
  const { results } = await response.json()
  const gifurl = results[0].media[0].tinygif.url
  

  const octokit = github.getOctokit(GITHUB_TOKEN)

  const { context = {} } = github
  const { pull_request } = context.payload 
  
  await octokit.rest.issues.createComment({
    ...context.repo,
    issue_number: pull_request.number,
    body: `Thank you for submitting a pull request! we will try to review it in the upcoming 24 hours. \n\n<img src="${gifurl}" alt="Thank you" />`
  });
}

run()