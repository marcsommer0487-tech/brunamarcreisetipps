import { createFileRoute } from "@tanstack/react-router";
import weddingHtml from "../../server/wedding.html?raw";
import logoDataUrl from "../../server/assets/bm-logo.png?inline";

// Hide the iframe's own hero + nav since the React Hero component
// now renders above the iframe in the page.
const HIDE_CSS = `<style>
  #nav,#hero{display:none !important;}
  body{padding-top:0 !important;}
</style></head>`;

const html = weddingHtml
  .replace(/__BM_LOGO__/g, logoDataUrl)
  .replace("</head>", HIDE_CSS);

export const Route = createFileRoute("/api/wedding")({
  // @ts-expect-error – server handlers supported at runtime by TanStack Start
  server: {
    handlers: {
      GET: () =>
        new Response(html, {
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
    },
  },
});
