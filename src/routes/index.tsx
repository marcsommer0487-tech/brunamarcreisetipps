import { createFileRoute } from "@tanstack/react-router";
import { WeddingSite } from "@/components/wedding/WeddingSite";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Reisetipps - Hochzeit Bruna & Marc" },
      {
        name: "description",
        content:
          "Nützliche Tipps rund um die Anreise, zu Brasilien und möglichen Ausflügen.",
      },
      {
        property: "og:title",
        content: "Reisetipps - Hochzeit Bruna & Marc",
      },
      {
        property: "og:description",
        content: "Nützliche Tipps rund um die Anreise, zu Brasilien und möglichen Ausflügen.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: WeddingSite,
});
