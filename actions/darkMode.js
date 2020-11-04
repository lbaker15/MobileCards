export const DARK_MODE = "DARK_MODE"

export function darkMode (status) {
    return {
    type: DARK_MODE,
    status
    }
}