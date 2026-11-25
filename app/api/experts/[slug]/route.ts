import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "../../../../lib/supabaseServer";

const EXPERT_COLUMNS =
  "id, category_id, rank, name, slug, sub_category, books, credentials, social_proof, podcast_status, website, instagram, source";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const supabase = getSupabaseServerClient();

    const { data, error } = await supabase
      .from("experts")
      .select(`${EXPERT_COLUMNS}, categories(id, name, slug)`)
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: "Expert not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}
