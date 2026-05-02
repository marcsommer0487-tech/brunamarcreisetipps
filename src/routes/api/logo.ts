import { createFileRoute } from "@tanstack/react-router";
// @ts-expect-error - vite raw asset import
import logoUrl from "../../server/assets/bm-logo.png?url";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

export const Route = createFileRoute("/api/logo")({
  server: {
    handlers: {
      GET: () => {
        // Resolve path relative to this module at build/runtime
        const path = fileURLToPath(new URL(logoUrl, import.meta.url));
        const buf = readFileSync(path);
        return new Response(buf, {
          headers: {
            "content-type": "image/png",
            "cache-control": "public, max-age=31536000, immutable",
          },
        });
      },
    },
  },
});
