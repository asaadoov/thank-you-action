# Thank You GIF - Github Action

> This repository for the Thank you note Action
[![Build Status](https://github.com/probot/example-github-action/workflows/Test/badge.svg)](https://github.com/asaadoov/thank-you-action/actions)

A Github action to comment on a created pull request, with a thanking note and a GIF.

## Usage

You can use the action from this example repository:

```yml
name: Thank you action

on:
  pull_request:
    types: [opened]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: https://github.com/asaadoov/thank-you-action@master
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          TENOR_TOKEN: ${{ secrets.TENOR_TOKEN }}
```

## Scerets
- `GITHUB_TOKEN` - _Required_ Allows the Action to authenticte with the GitHub API to create the release.
- `TENOR_TOKEN` - _Required_ Allows the Action to authenticte with the [`Tenor API`](https://developers.google.com/tenor/guides/quickstart) to get the GIF.

## How it works

The action function is defined in [`action.js`](src/action.js).

The Action will run the [`index.js`](dist/index.js) file which verifies the required secrets are set, get the GIF URL and then comment the thanks note on the PR.

## License

[MIT](LICENSE)
