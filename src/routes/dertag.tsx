import { createFileRoute } from "@tanstack/react-router";
import { DerTag } from "@/components/wedding/DerTag";

export const Route = createFileRoute("/dertag")({
  head: () => ({
    meta: [
      { title: "Der Tag – Hochzeit Bruna & Marc" },
      {
        name: "description",
        content:
          "Alle Infos zum Hochzeitstag: Adresse, Uhrzeit, Dresscode und Anfahrt zur Location.",
      },
      { property: "og:title", content: "Der Tag – Hochzeit Bruna & Marc" },
      {
        property: "og:description",
        content:
          "Adresse, Uhrzeit, Dresscode und Anfahrt zur Hochzeit von Bruna & Marc am 18.10.2026.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: DerTag,
});
