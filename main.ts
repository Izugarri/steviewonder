import { serveDir } from "jsr:@std/http/file-server";

Deno.serve((req) => {
  return serveDir(req, {
    fsRoot: "./", // Carpeta que contiene los archivos
    showDirListing: true,
    cleanUrls: true,    
  });
});
