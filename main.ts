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