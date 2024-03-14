import { exec } from "@actions/exec"
import { getActionInputs, moveDeps, updateCredentials } from "./utils"

/**
 * The function that runs the lambdatest-cypress cli
 */
export const runLambdaTestCli = async () => {
  const {
    base_path,
    LT_ACCESS_KEY,
    LT_USERNAME,
    include_deps,
    args: additionalArgs,
    ...cmdArgs
  } = getActionInputs()

  if (base_path) {
    process.chdir(base_path)
    console.log(`Changed directory to ${process.cwd()}`)
  }

  await updateCredentials()

  if (include_deps) {
    await moveDeps()
  }

  const command = "lambdatest-cypress run"

  const args: string[] = []

  for (let [key, value] of Object.entries(cmdArgs)) {
    if (!value) continue

    // key is something like this `cypress_config_file`
    // But the CMD usually accepts `--cypress-config-file`
    // So we need to replace the `_` with `-`
    key = key.replace(/_/g, "-")

    if (argMaps[key]) {
      key = argMaps[key]
    }

    if (typeof value === "boolean") {
      args.push(`--${key}`)
    }

    if (typeof value === "string") {
      args.push(`--${key}`, value)
    }
  }

  if (additionalArgs) {
    args.push(additionalArgs)
  }

  await exec(command, args)
}

/**
 * Includes command args that are different from the
 * GitHub action input names
 *
 * Key: GitHub action input name (but with `-` instead of `_`)
 * Value: LambdaTest cypress CLI arg name
 */
const argMaps = {
  "env-vars": "env-variables",
  "system-env-variables": "sys-env-variables",
}
