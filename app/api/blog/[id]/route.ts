import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const paths = url.pathname.split("/");
  const id = paths[paths.length - 1].toString();

  try {
    const blogs = db.blog.findUnique({
      where: {
        id: id,
      },
    });

    return NextResponse.json(blogs);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch data" });
  }
}
