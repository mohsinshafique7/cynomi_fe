declare global {
  namespace NodeJS {
    interface ProcessEnv {
      URL: string
      NODE_ENV: "development" | "production"
    }
  }
}
export {}
