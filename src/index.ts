import path from "path"
import { setFailed } from "@actions/core"
import { exec } from "@actions/exec"

import { runLambdaTestCli } from "./command"

const main = async () => {
  try {
    await exec("git clone https://github.com/dcodesdev/lambdatest-cypress-cli")

    // Install deps
    await exec("npm install", [], {
      cwd: path.join(process.cwd(), "lambdatest-cypress-cli"),
    })

    // Link the package
    await exec("npm link", [], {
      cwd: path.join(process.cwd(), "lambdatest-cypress-cli"),
    })

    await runLambdaTestCli()
  } catch (error) {
    if (error instanceof Error) {
      return setFailed(error.message)
    }

    setFailed(`Error: ${error}`)
  }
}

main()
