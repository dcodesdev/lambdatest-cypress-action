import { promises as fs } from "fs"
import { FullVersion } from "package-json"

export const getPackageJson = async () => {
  const packageJson = await fs.readFile("package.json", "utf-8")

  return JSON.parse(packageJson) as FullVersion
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
