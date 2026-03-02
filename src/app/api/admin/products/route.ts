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
    .from("products")
    .select("*")
    .order("sort_order")
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
    .from("products")
    .insert({
      name: body.name,
      name_en: body.nameEn,
      price: body.price,
      image: body.image || "",
      artist: body.artist,
      manufacturer: body.manufacturer,
      release_date: body.releaseDate,
      country: body.country || "대한민국",
      description: body.description || null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath("/shop");
  return NextResponse.json(data, { status: 201 });
}

export async function PUT(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("products")
    .update({
      name: body.name,
      name_en: body.nameEn,
      price: body.price,
      image: body.image,
      artist: body.artist,
      manufacturer: body.manufacturer,
      release_date: body.releaseDate,
      country: body.country,
      description: body.description || null,
      is_visible: body.isVisible,
      sort_order: body.sortOrder,
    })
    .eq("id", body.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath("/shop");
  revalidatePath(`/shop/${body.id}`);
  return NextResponse.json(data);
}

export async function DELETE(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await request.json();
  const supabase = createAdminClient();

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath("/shop");
  return NextResponse.json({ success: true });
}
