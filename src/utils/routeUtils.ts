export class RouteUtils {
  static buildRoute = (...parts: string[]): string =>
    "/" + parts.map((p: string) => p.replace(/^\/+|\/+$/g, "")).join("/");
}
