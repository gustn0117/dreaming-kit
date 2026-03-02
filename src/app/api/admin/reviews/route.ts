import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifySessionToken } from "@/lib/admin-auth";
import { revalidatePath } from "next/cache";

function checkAuth(request: NextRequest): boolean {
  const token = request.cookies.get("admin_session")?.value;
  return !!token && verifySessionToken(token);
}

export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("*, products:product_id(name_en)")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("reviews")
    .insert({
      product_id: body.productId,
      nickname: body.nickname,
      user_id: body.userId,
      date: body.date,
      rating: body.rating,
      content: body.content,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath(`/shop/${body.productId}`);
  return NextResponse.json(data, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, productId } = await request.json();
  const supabase = createAdminClient();

  const { error } = await supabase.from("reviews").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (productId) revalidatePath(`/shop/${productId}`);
  return NextResponse.json({ success: true });
}
