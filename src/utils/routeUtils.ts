export class RouteUtils {
  static buildRoute = (...parts: string[]): string =>
    "/" + parts.map((p) => p.replace(/^\/+|\/+$/g, "")).join("/");
}
