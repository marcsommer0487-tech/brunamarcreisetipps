import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

const saveRsvpInput = (input: {
  name: string;
  guests: number;
  arrival?: string;
  dietary?: string;
  dietaryNote?: string;
}) => input;

export const saveRsvp = createServerFn({ method: "POST" })
  .validator(saveRsvpInput)
  .handler(async ({ data }) => {
    const supabase = createClient<Database>(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PUBLISHABLE_KEY!,
      {
        auth: {
          storage: undefined,
          persistSession: false,
          autoRefreshToken: false,
        },
      },
    );

    const { error } = await supabase.from("rsvp_submissions").insert({
      name: data.name.trim(),
      guests: data.guests,
      arrival: data.arrival || null,
      dietary: data.dietary || null,
      dietary_note: data.dietaryNote?.trim() || null,
    });

    if (error) {
      console.error("RSVP insert error:", error);
      throw new Error("Die Rückmeldung konnte nicht gespeichert werden.");
    }

    return { success: true };
  });
