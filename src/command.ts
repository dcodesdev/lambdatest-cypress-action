import { exec } from "@actions/exec"
import { getActionInputs } from "./utils"

/**
 * The function that runs the lambdatest-cypress cli
 */
export const runLambdaTestCli = async () => {
  const { base_path } = getActionInputs()

  if (base_path) {
    process.chdir(base_path)

    console.log(
      // console current working directory
      process.cwd()
    )
  }

  const command = ["lambdatest-cypress", "run"]

  await exec(command.join(" "))
}
