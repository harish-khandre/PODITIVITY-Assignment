import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { uploadFileToS3 } from "@/lib/upload-image";

export async function PUT(req: Request) {
  const formData = await req.formData();
  const image = formData.get("file");
  const name = formData.get("name");
  const title = formData.get("title");
  const content = formData.get("content");
  const id = formData.get("id");
  console.log("id", id);

  // Check if name, title, or content are null or not strings
  if (
    typeof name !== "string" ||
    typeof title !== "string" ||
    typeof content !== "string" ||
    typeof id !== "string"
  ) {
    return NextResponse.json(
      { error: "Please enter all fields" },
      { status: 400 },
    );
  }

  // Check if image is an instance of File
  if (!(image instanceof File)) {
    return NextResponse.json({ error: "File not found" }, { status: 400 });
  }

  // Upload the image to S3
  const img = await uploadFileToS3(image);

  // Handle failed image upload
  if (!img) {
    return NextResponse.json(
      { error: "Failed to upload image to S3" },
      { status: 500 },
    );
  }

  try {
    // Create a new blog entry in the database
    await db.blog.update({
      where: { id: id },
      data: {
        author: name,
        title: title,
        content: content,
        thumbnail: img,
      },
    });

    return NextResponse.json({ message: "Form submitted!" });
  } catch (error) {
    console.error("Error storing data:", error);
    return NextResponse.json({ error: "Failed to register" }, { status: 500 });
  }
}
