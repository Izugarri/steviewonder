import { serveDir } from "jsr:@std/http/file-server";

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const pathname = url.pathname;

  // 2. Regla: CSS/JS (Caché media: 1 hora)
  if (pathname.endsWith("Control.html") || pathname.endsWith(".js")) {
    const res = await serveDir(req, {
      fsRoot: "./",
    });
    res.headers.set("Cache-Control", "public, max-age=5", "Deno-CDN-Cache-Control", "public, s-maxage=6");
    return res;
  }

  // 3. Regla por defecto: HTML (No caché, verificar siempre)
  const res = await serveDir(req, {
    fsRoot: "public",
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