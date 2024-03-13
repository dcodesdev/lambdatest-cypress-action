import { exec } from "@actions/exec"
import { getActionInputs } from "./utils"

/**
 * The function that runs the lambdatest-cypress cli
 */
export const runLambdaTestCli = async () => {
  const { base_path, lambdatest_config_file, build_name } = getActionInputs()

  if (base_path) {
    process.chdir(base_path)
    console.log(`Changed directory to ${process.cwd()}`)
  }

  const command = "lambdatest-cypress run"

  const args: string[] = []

  if (lambdatest_config_file) {
    args.push("--lambdatest-config-file", lambdatest_config_file)
  }

  if (build_name) {
    args.push("--build-name", build_name)
  }

  await exec(command, args)
}
