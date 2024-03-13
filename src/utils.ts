import { promises as fs } from "fs"
import { LambdaTestConfig, PackageJson } from "./types"
import { getBooleanInput, getInput } from "@actions/core"
import { env } from "process"

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

export const getActionInputs = () => {
  const LT_USERNAME = getInput("LT_USERNAME")
  const LT_ACCESS_KEY = getInput("LT_ACCESS_KEY")
  const include_deps = getBooleanInput("include_deps")
  const base_path = getInput("base_path")
  const cypress_config_file = getInput("cypress_config_file")
  const lambdatest_config_file = getInput("lambdatest_config_file")
  const specs = getInput("specs")
  const environment = getInput("environment")
  const build_name = getInput("build_name")
  const tags = getInput("tags")
  const parallels = getInput("parallels")
  const env_vars = getInput("env_vars")
  const tunnel = getInput("tunnel")
  const tunnel_name = getInput("tunnel_name")
  const browsers = getInput("browsers")
  const build_identifier = getInput("build_identifier")
  const ignore_files = getInput("ignore_files")
  const sync_mode = getInput("sync_mode")
  const autostart = getBooleanInput("autostart")
  const headless = getBooleanInput("headless")
  const network = getBooleanInput("network")
  const exit_on_failure = getBooleanInput("exit_on_failure")
  const cypress_settings = getInput("cypress_settings")
  const geo_location = getInput("geo_location")
  const stop_on_failure = getBooleanInput("stop_on_failure")
  const reject_unauthorized = getBooleanInput("reject_unauthorized")
  const build_tags = getInput("build_tags")
  const system_env_variables = getInput("system_env_variables")
  const env_file = getInput("env_file")
  const npm_force = getBooleanInput("npm_force")
  const legacy_peer_deps = getBooleanInput("legacy_peer_deps")
  const vi_project = getInput("vi_project")
  const vi_build = getInput("vi_build")
  const vi_base = getInput("vi_base")
  const resolution = getInput("resolution")
  const dedicated_proxy = getInput("dedicated_proxy")
  const npm_via_tunnel = getBooleanInput("npm_via_tunnel")
  const max_duration = getInput("max_duration")
  const command_log = getBooleanInput("command_log")
  const retry_failed = getBooleanInput("retry_failed")
  const network_http2 = getBooleanInput("network_http2")
  const network_ws = getBooleanInput("network_ws")
  const network_sse = getBooleanInput("network_sse")

  return {
    LT_USERNAME,
    LT_ACCESS_KEY,
    include_deps,
    base_path,
    cypress_config_file,
    lambdatest_config_file,
    specs,
    environment,
    build_name,
    tags,
    parallels,
    env_vars,
    tunnel,
    tunnel_name,
    browsers,
    build_identifier,
    ignore_files,
    sync_mode,
    autostart,
    headless,
    network,
    exit_on_failure,
    cypress_settings,
    geo_location,
    stop_on_failure,
    reject_unauthorized,
    build_tags,
    system_env_variables,
    env_file,
    npm_force,
    legacy_peer_deps,
    vi_project,
    vi_build,
    vi_base,
    resolution,
    dedicated_proxy,
    npm_via_tunnel,
    max_duration,
    command_log,
    retry_failed,
    network_http2,
    network_ws,
    network_sse,
  }
}

export const getCommandOptions = () => {}
