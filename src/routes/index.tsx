import { createFileRoute } from "@tanstack/react-router";
import { WeddingSite } from "@/components/wedding/WeddingSite";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hochzeit · Wedding · Casamento — 18.10.2026 · Belo Horizonte" },
      {
        name: "description",
        content:
          "Trilingual wedding website (DE/EN/PT) — 18 October 2026, Belo Horizonte, Brazil.",
      },
      {
        property: "og:title",
        content: "Hochzeit · Wedding · Casamento — 18.10.2026 · Belo Horizonte",
      },
      {
        property: "og:description",
        content: "Join us in Belo Horizonte on 18 October 2026.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: WeddingSite,
});
