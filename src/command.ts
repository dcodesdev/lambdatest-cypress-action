import { exec } from "@actions/exec"
import { getActionInputs } from "./utils"

/**
 * The function that runs the lambdatest-cypress cli
 */
export const runLambdaTestCli = async () => {
  const { base_path } = getActionInputs()

  if (base_path) {
    process.chdir(base_path)
    console.log(`Changed directory to ${process.cwd()}`)
  }

  const command = "lambdatest-cypress run"

  const args: string[] = []

  await exec(command, args)
}
