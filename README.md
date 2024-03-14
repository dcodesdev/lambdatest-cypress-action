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
    uses: dawsoncodes/lambdatest-cypress-action@v0.1.0
    with:
      LT_USERNAME: ${{ secrets.LT_USERNAME }}
      LT_ACCESS_KEY: ${{ secrets.LT_ACCESS_KEY }}
      include_deps: true # Optional: Automatically installs package.json dependencies
```

- Add your LambdaTest credentials to your repository secrets github.com/{username}/{repo}/settings/secrets

```bash
LT_USERNAME: your-lambdatest-username
LT_ACCESS_KEY: your-lambdatest-access-key
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

| Input           | Description                                                                                             | Required | Default |
| --------------- | ------------------------------------------------------------------------------------------------------- | -------- | ------- |
| `LT_USERNAME`   | LambdaTest username.                                                                                    | Yes      |         |
| `LT_ACCESS_KEY` | LambdaTest access key.                                                                                  | Yes      |         |
| `include_deps`  | Moves dependencies and dev dependencies from your package.json file to the lambdatest-config.json file. | No       | `false` |
| `base_path`     | The directory where the lambdatest-config.json file is located.                                         | No       |         |
| `args`          | Manually pass in the CLI options                                                                        | No       |         |

### CLI options

| Input                    | Description                                                                                                      | Required | Default |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| `cypress_config_file`    | Path to the cypress config file.                                                                                 | No       |         |
| `lambdatest_config_file` | Path to the lambdatest-config.json file.                                                                         | No       |         |
| `specs`                  | Path of a spec file, directory or a pattern to run.                                                              | No       |         |
| `environment`            | The environment to run the tests in.                                                                             | No       |         |
| `build_name`             | The name of the LambdaTest build.                                                                                | No       |         |
| `tags`                   | The tags to be associated with the LambdaTest build.                                                             | No       |         |
| `parallels`              | The number of parallels to run the tests in.                                                                     | No       |         |
| `env_variables`          | The environment variables to be set.                                                                             | No       |         |
| `tunnel`                 | The tunnel to be used.                                                                                           | No       |         |
| `tunnel_name`            | The name of the tunnel.                                                                                          | No       |         |
| `browsers`               | The browsers to run the tests in the format platform:browser:version.                                            | No       |         |
| `build_identifier`       | The identifier of the build.                                                                                     | No       |         |
| `ignore_files`           | The files to be ignored.                                                                                         | No       |         |
| `sync_mode`              | The sync mode to be used.                                                                                        | No       |         |
| `autostart`              | Tunnel autostart.                                                                                                | No       | `false` |
| `headless`               | Run the tests in headless mode.                                                                                  | No       | `false` |
| `network`                | Capture network logs.                                                                                            | No       | `false` |
| `exit_on_failure`        | Exit with code 1 on failure.                                                                                     | No       | `false` |
| `cypress_settings`       | Pass in Cypress settings.                                                                                        | No       |         |
| `geo_location`           | The geo location to run the tests in.                                                                            | No       |         |
| `stop_on_failure`        | Stop other tests if any test in session gets errored out.                                                        | No       | `false` |
| `reject_unauthorized`    | Default rejects self-signed SSL certificates in external requests.                                               | No       | `false` |
| `build_tags`             | The tags to be associated with the LambdaTest build.                                                             | No       |         |
| `sys_env_variables`      | System environment variables.                                                                                    | No       |         |
| `env_file`               | Path to a .env file.                                                                                             | No       |         |
| `npm_force`              | Force npm install.                                                                                               | No       | `false` |
| `legacy_peer_deps`       | Force npm install.                                                                                               | No       | `false` |
| `vi_project`             | Visual ui project name                                                                                           | No       |         |
| `vi_build`               | Visual ui build name                                                                                             | No       |         |
| `vi_base`                | Visual ui baseline                                                                                               | No       |         |
| `resolution`             | Machine resolution                                                                                               | No       |         |
| `dedicated_proxy`        | Dedicated proxy                                                                                                  | No       |         |
| `npm_via_tunnel`         | Install npm packages which are behind private VPN. Warning: This will increase the build duration of your tests. | No       | `false` |
| `max_duration`           | Maximum duration of the build.                                                                                   | No       |         |
| `command_log`            | Show command logs in the dashboard.                                                                              | No       | `false` |
| `retry_failed`           | Retry failed tests in a new build.                                                                               | No       | `false` |
| `network_http2`          | Capture HTTP2 network logs.                                                                                      | No       | `false` |
| `network_ws`             | Bypass web socket calls for network logs.                                                                        | No       | `false` |
| `network_sse`            | Bypass SSE event calls for network logs.                                                                         | No       | `false` |
