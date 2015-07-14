export function Inject(...deps) {
    return (target) => {
        target.__dependencies = deps
        return target
    }
}
