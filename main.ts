import { serveDir } from "jsr:@std/http/file-server";

Deno.serve((req) => {
  return serveDir(req, {
    fsRoot: "./", // Carpeta que contiene los archivos
    showDirListing: true,
  });
;

  // 1. Regla: Imágenes/Activos inmutables (Caché larga: 1 año)
  if (pathname.startsWith("/Control/")) {
    const res = await serveDir(req, {
      fsRoot: "Control",
      urlRoot: "Control",
    });
    res.headers.set("Cache-Control", "public, max-age=3");
    return res;
  }

  // 2. Regla: CSS/JS (Caché media: 1 hora)
  if (pathname.endsWith(".css") || pathname.endsWith(".js")) {
    const res = await serveDir(req, {
      fsRoot: "./",
    });
    res.headers.set("Cache-Control", "public, max-age=60");
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
  return serveDir(req, {
    fsRoot: "./", // Carpeta que contiene los archivos
    showDirListing: true,
  });
}
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
}
);