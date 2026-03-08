import { serveDir } from "jsr:@std/http/file-server";

Deno.serve((req) => {
  return serveDir(req, {
    fsRoot: "./", // Carpeta que contiene los archivos
    showDirListing: true,
  });
// 1. Regla: Imágenes/Activos inmutables (Caché larga: 1 año)
  if (pathname.startsWith("/Control/")) {
    const res = await serveDir(req, {
      fsRoot: "Control",
      urlRoot: "Control",
    });
    res.headers.set("Cache-Control", "public, max-age=7");
    return res;
  }
});