import { createFileRoute } from "@tanstack/react-router";
import { Casamento } from "@/components/wedding/Casamento";

export const Route = createFileRoute("/casamento")({
  head: () => ({
    meta: [
      { title: "O grande dia – Casamento Bruna & Marc" },
      {
        name: "description",
        content:
          "Informações sobre o dia do casamento e link de confirmação. Por favor, confirmem a presença até 15/08.",
      },
      { property: "og:title", content: "O grande dia – Casamento Bruna & Marc" },
      {
        property: "og:description",
        content:
          "Endereço, horário, dress code e como chegar ao casamento de Bruna & Marc em 18/10/2026.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Casamento,
});
