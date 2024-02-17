interface LambdaTestAuth {
  username: string
  access_key: string
}

interface Browser {
  browser: string
  platform: string
  versions: string[]
}

interface RunSettings {
  reporter_config_file: string
  build_name: string
  parallels: number
  specs: string
  ignore_files: string
  network: boolean
  headless: boolean
  npm_dependencies: {
    [key: string]: string
  }
}

interface TunnelSettings {
  tunnel: boolean
  tunnel_name: string | null
}

interface LambdaTestConfig {
  lambdatest_auth: LambdaTestAuth
  browsers: Browser[]
  run_settings: RunSettings
  tunnel_settings: TunnelSettings
}
