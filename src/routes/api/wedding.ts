import { createFileRoute } from "@tanstack/react-router";
import weddingHtml from "../../server/wedding.html?raw";
import logoDataUrl from "../../server/assets/bm-logo.png?inline";

const html = weddingHtml.replace(/__BM_LOGO__/g, logoDataUrl);

export const Route = createFileRoute("/api/wedding")({
  server: {
    handlers: {
      GET: () =>
        new Response(html, {
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
    },
  },
});
