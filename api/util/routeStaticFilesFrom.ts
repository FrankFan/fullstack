import { Next } from "jsr:@oak/oak/middleware";
import { Context } from "jsr:@oak/oak/context";

// Configure static site routes so that we can serve
// the Vite build output and the public folder
export default function routeStaticFilesFrom(staticPaths: string[]) {
  return async (context: Context<Record<string, object>>, next: Next) => {
    for (const path of staticPaths) {
      try {
        await context.send({
          root: path,
          index: "index.html",
        });
        return;
      } catch {
        continue;
      }
    }

    // 解决 SPA refresh 404 的问题
    // 如果静态文件未找到，且请求路径不是 API 路径，返回 index.html
    if (!context.request.url.pathname.startsWith("/api")) {
      try {
        await context.send({
          root: staticPaths[0],
          path: "index.html",
        });
        return;
      } catch {
        // 如果 index.html 也不存在，继续执行下一个中间件
      }
    }

    await next();
  };
}
