# dHEDGE V2 Subgraphs

## Prerequisites

- [Node.js LTS](https://nodejs.org/en/download/)
- [Yarn 1](https://classic.yarnpkg.com/en/docs/getting-started)

## Setup

### Install Dependencies

`yarn`

### Development

`cp .env.example .env`

`yarn prepare:<network>` to check no errors present after making code changes

## Deployment

1. Sign in to https://thegraph.com/hosted-service with your GitHub account
2. Go to My Dashboard, select `dHEDGE DAO` account
3. Copy your `ACCESS TOKEN` and paste it into `.env`
4. `yarn deploy:<network>` to deploy updated subgraph
