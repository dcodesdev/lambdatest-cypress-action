import { promises as fs } from "fs"
import { ActionInputs, LambdaTestConfig, PackageJson } from "./types"
import { getBooleanInput, getInput } from "@actions/core"

export const getPackageJson = async () => {
  const packageJson = await fs.readFile("package.json", "utf-8")

  return JSON.parse(packageJson) as PackageJson
}

export const getLambdaTestConfig = async (path = "lambdatest-config.json") => {
  const config = await fs.readFile(path, "utf-8")

  const updateConfig = async (config: LambdaTestConfig) => {
    await fs.writeFile(path, JSON.stringify(config, null, 2))
  }

  return {
    config: JSON.parse(config) as LambdaTestConfig,
    updateConfig,
  }
}

/**
 * Moves dependencies from package.json to lambdatest-config.json
 */
export const moveDeps = async () => {
  const { config, updateConfig } = await getLambdaTestConfig()
  const { dependencies, devDependencies } = await getPackageJson()

  config.run_settings.npm_dependencies = {
    ...config.run_settings.npm_dependencies,
    ...dependencies,
    ...devDependencies,
  }

  await updateConfig(config)
}

export const getActionInputs = (): ActionInputs => {
  const include_deps = getBooleanInput("include_deps")
  const LT_USERNAME = getInput("LT_USERNAME")
  const LT_ACCESS_KEY = getInput("LT_ACCESS_KEY")
  const base_path = getInput("base_path")
  const lambdatest_config_file = getInput("lambdatest_config_file")

  return {
    LT_USERNAME,
    LT_ACCESS_KEY,
    include_deps,
    base_path,
    lambdatest_config_file,
  }
}

export const getCommandOptions = () => {}
