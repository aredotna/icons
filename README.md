# @aredotna/icons

[@aredotna/icons](https://github.com/aredotna/icons) is the canonical source for icons used at Are.na, and serves as an automatic build pipeline for generating JSX representations of `.svg` sources that can easily be imported into React apps.

You can view available icons [here](https://icons.are.na) and click to copy the import path of the desired icon.

## Meta

- **State:** production
- **GitHub:** [https://github.com/aredotna/icons](https://github.com/aredotna/icons)
- **CI/Deploys:** [CircleCi](https://circleci.com/gh/aredotna/icons); merged PRs to `aredotna/icons#main` are automatically deployed to NPM
- **Point People:** [@dzucconi](https://github.com/dzucconi)

## Installation and Usage

```bash
yarn add @aredotna/icons
```

And then later, import icons like so:

```tsx
import ArenaLogo from "@aredotna/icons/ArenaLogo"

const MyApp = () => {
  return <ArenaLogo />
}
```

## Adding New Icons

We've setup the repo so that adding new icons and publishing to NPM is as automated as can be:

1. Clone the repo: `git clone https://github.com/aredotna/icons.git`
1. Create a new branch: `git checkout -b add-new-icon`
1. Copy your new icon `.svg` file into the `src` folder (and follow pre-existing naming conventions! :pray:)
1. Push your branch up to GitHub and open a PR. This should automatically be tagged with a `minor` label indicating a new feature addition
1. Merge PR. This will automatically generate JSX components and publish to NPM, and additionally update the docs
1. Once published, a new comment will be added to the PR announcing the new version.

## Development

```bash
yarn install
yarn build
yarn docs
```
