import { createFileRoute } from "@tanstack/react-router";
import { DerTag } from "@/components/wedding/DerTag";

export const Route = createFileRoute("/dertag")({
  head: () => ({
    meta: [
      { title: "Der Tag – Hochzeit Bruna & Marc" },
      {
        name: "description",
        content:
          "Informationen zum Tag der Hochzeit sowie ein Anmeldelink. Bitte bestätigt bis zum 15.08., ob ihr dabei sein könnt.",
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
