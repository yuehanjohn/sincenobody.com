"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables"
  );
}

export const createClient = async (
  cookieStore: ReturnType<typeof cookies> = cookies()
) => {
  const store = await cookieStore;

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      async getAll() {
        return store.getAll();
      },
      async setAll(
        cookiesToSet: Array<{
          name: string;
          value: string;
          options?: Record<string, any>;
        }>
      ) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            // Next's RequestCookies.set expects an object: { name, value, ...options }
            store.set({ name, value, ...(options ?? {}) })
          );
        } catch {
          // When called from a Server Component the cookies store may be immutable.
          // It's safe to ignore in that case (e.g. if you rely on middleware to refresh sessions).
        }
      },
    },
  });
};
