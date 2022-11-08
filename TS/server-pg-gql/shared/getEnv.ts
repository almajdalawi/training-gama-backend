
export function getEnv(envName: string | undefined, fallback: number): number {
    if (envName) {
        return parseInt(envName)
    } else {
        return fallback
    }
}
