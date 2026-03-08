import { serveDir } from "jsr:@std/http/file-server";

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const pathname = url.pathname;

  // 1. Regla: Imágenes/Activos inmutables (Caché larga: 1 año)
  if (pathname.startsWith("/Control/")) {
    const res = await serveDir(req, {
      fsRoot: "Control",
      urlRoot: "Control",
    });
    res.headers.set("Deno-CDN-Cache-Control", "public, no-cache");
    return res;
  }

  // 2. Regla: CSS/JS (Caché media: día)
  if (pathname.endsWith(".css") || pathname.endsWith(".js") || pathname.endsWith(".jpg") || pathname.endsWith(".gif")) {
    const res = await serveDir(req, {
      fsRoot: "./",
    });
    res.headers.set("Cache-Control", "public, max-age=84600");
    return res;
  }

  // 3. Regla por defecto: HTML (No caché, verificar siempre)
  const res = await serveDir(req, {
    fsRoot: "./",
    showIndex: true, // Sirve index.html automáticamente
  });
  res.headers.set("Cache-Control", "public, max-age=3600");
  return res;
});