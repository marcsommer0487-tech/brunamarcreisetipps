import { createFileRoute } from "@tanstack/react-router";
import weddingHtml from "../../server/wedding.html?raw";

export const Route = createFileRoute("/api/wedding")({
  server: {
    handlers: {
      GET: () =>
        new Response(weddingHtml, {
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
    },
  },
});
