export function buildRoutePath(path) {
    const routeParamsRegexp = /:([a-zA-Z]+)/g
    const routePath = path.replaceAll(routeParamsRegexp, '(?<$1>[a-z0-9\-_]+)')
    const routeRegexp = new RegExp(`^${routePath}(?<query>\\?(.*))?$`)

    return routeRegexp
}