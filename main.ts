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
    res.headers.set("Cache-Control", "public, max-age=5");
    return res;
  }

  // 2. Regla: CSS/JS (Caché media: 1 hora)
  if (pathname.endsWith("Control*.*") || pathname.endsWith("Control.html")) {
    const res = await serveDir(req, {
      fsRoot: "./",
    });
    res.headers.set("Cache-Control", "public, max-age=4");
    return res;
  }

  // 3. Regla por defecto: HTML (No caché, verificar siempre)
  const res = await serveDir(req, {
    fsRoot: "./",
    showIndex: true, // Sirve index.html automáticamente
  });
  res.headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
  return res;
});












import { serveDir } from "jsr:@std/http/file-server";

Deno.serve((req) => {
  const pathname = new URL(req.url).pathname;

  // Servir archivos estáticos desde una carpeta llamada "x"
  if (pathname.startsWith("/")) {
    return serveDir(req, {
      fsRoot: "./", // Directorio donde están tus archivos .html y .css
    });
  }

  return new Response("404: Not Found", { status: 404 });
});