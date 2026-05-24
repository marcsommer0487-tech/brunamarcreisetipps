import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/wedding/Hero";

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
  component: Index,
});

function Index() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Hero />
      <iframe
        id="rest"
        src="/api/wedding"
        title="Wedding details"
        style={{
          width: "100%",
          height: "100vh",
          border: "none",
          display: "block",
        }}
      />
    </div>
  );
}
