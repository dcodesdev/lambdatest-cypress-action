# GitHub action for LambdaTest Cypress integration

This action integrates LambdaTest with Cypress to automatically upload your tests on GitHub events.

## How to use

To use the action, you need to initialize your LambdaTest configuration in your project by using the [LambdaTest CLI](https://github.com/LambdaTest/lambdatest-cypress-cli/).

- Install the cli

```bash
npm install -g lambdatest-cypress-cli
```

- Initialize the configuration

```bash
lambdatest-cypress init
```

- Add the action to your workflow

```yaml
steps:
  - name: Checkout
    uses: actions/checkout@v2

  - name: Run test on LambdaTest
    uses: dawsoncodes/lambdatest-cypress-action@v0.0.1
    with:
      USERNAME: ${{ secrets.LT_USERNAME }}
      ACCESS_KEY: ${{ secrets.LT_ACCESS_KEY }}
      include_deps: true # Optional: Automatically installs package.json dependencies
```

- Add your LambdaTest credentials to your repository secrets github.com/{username}/{repo}/settings/secrets

```bash
USERNAME: your-lambdatest-username
ACCESS_KEY: your-lambdatest-access-key
```

- Push the changes to your repository

```bash
git add .
git commit -m "Add LambdaTest Cypress action"
git push
```

Your tests should now be running on LambdaTest 🥳🚀

## Input variables

See [action.yml](./action.yml) for more detailed information.

| Input Parameter | Description                                                   | Default Value |
| --------------- | ------------------------------------------------------------- | ------------- |
| USERNAME        | LambdaTest username                                           |               |
| ACCESS_KEY      | LambdaTest access key                                         |               |
| include_deps    | Copy dependencies from package.json to lambdatest-config.json | false         |
