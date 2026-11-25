import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "../../../lib/supabaseServer";

const EXPERT_COLUMNS =
  "id, category_id, rank, name, slug, sub_category, books, credentials, social_proof, podcast_status, website, instagram, source";

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseServerClient();
    const categorySlug =
      request.nextUrl.searchParams.get("category")?.trim() || "";

    let query = supabase
      .from("experts")
      .select(
        categorySlug
          ? `${EXPERT_COLUMNS}, categories!inner(id, name, slug)`
          : `${EXPERT_COLUMNS}, categories(id, name, slug)`
      )
      .order("rank", { ascending: true });

    if (categorySlug) {
      query = query.eq("categories.slug", categorySlug);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data ?? []);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}
