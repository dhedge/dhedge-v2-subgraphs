# dHEDGE V2 Optimism

## Prerequisites

- [Node.js LTS](https://nodejs.org/en/download/)
- [Yarn 1](https://classic.yarnpkg.com/en/docs/getting-started)

## Setup

### Install Dependencies

`yarn`

## Deployment

1. Sign in to https://thegraph.com/hosted-service with your GitHub account
2. Go to My Dashboard, select DHEDGE V2 OPTIMISM subgraph
3. In the top right corner, copy your `ACCESS TOKEN`
4. Run `yarn graph auth --product hosted-service https://api.thegraph.com/deploy/ <your_access_token>`
5. After making necessary code changes, run `yarn codegen`
6. Run `yarn build` to check there are no compilation errors
7. Finally, run `yarn deploy` to start deploying latest changes
8. If #7 throws error `auth failure::Invalid account name or access token`, try passing deploy token explicitly `yarn graph deploy --product hosted-service --deploy-key <your_access_token> dhedge/dhedge-v2-optimism`
