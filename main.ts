import { serveDir } from "jsr:@std/http/file-server";

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const pathname = url.pathname;

  // 1. Regla: Imágenes/Activos inmutables (Caché larga: 1 año)
  if (pathname.startsWith("/Control/")) {
    const res = await serveDir(req, {
      fsRoot: "./",
      urlRoot: "./",
    });
    res.headers.set("Deno-CDN-Cache-Control", "public, max-age=2");
    return res;
  }

  // 2. Regla: CSS/JS (Caché media: 1 hora)
  if (pathname.endsWith(".css") || pathname.endsWith(".js")) {
    const res = await serveDir(req, {
      fsRoot: "./",
    });
    res.headers.set("Cache-Control", "public, max-age=300");
    return res;
  }

  // 3. Regla por defecto: HTML (No caché, verificar siempre)
  const res = await serveDir(req, {
    fsRoot: "./",
    showIndex: true, // Sirve index.html automáticamente
  });
  res.headers.set("Cache-Control", "public, max-age=60");
  return res;
});
