import { getInput } from "@actions/core"
import { getLambdaTestConfig } from "./utils"

/**
 * Finds the lambdatest-config.json file and updates the credentials
 * based on the GitHub action secrets
 */
export const updateCredentials = async () => {
  const { config, updateConfig } = await getLambdaTestConfig()

  const username = getInput("USERNAME")
  const accessKey = getInput("ACCESS_KEY")

  const lambdatest_auth: LambdaTestAuth = {
    username,
    access_key: accessKey,
  }

  config.lambdatest_auth = lambdatest_auth

  await updateConfig(config)

  return config
}
