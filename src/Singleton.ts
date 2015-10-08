export function Singleton() {
    return (target) => {
        target.__singleton = true
        return target
    }
}
