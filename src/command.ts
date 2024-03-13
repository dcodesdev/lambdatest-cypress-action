import { exec } from "@actions/exec"
import { getActionInputs } from "./utils"

/**
 * The function that runs the lambdatest-cypress cli
 */
export const runLambdaTestCli = async () => {
  const {} = getActionInputs()

  const command = ["lambdatest-cypress", "run"]

  await exec(command.join(" "))
}
