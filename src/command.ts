import { exec } from "@actions/exec"

/**
 * The function that runs the lambdatest-cypress cli
 */
export const runLambdaTestCli = async () => {
  await exec("lambdatest-cypress run")
}
