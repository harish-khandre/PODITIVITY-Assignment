"use server";

import { db } from "@/lib/db";

export const deleteBlog = async (id: string) => {
  try {
    await db.blog.delete({
      where: { id },
    });
    return { message: "Blog deleted succesfully" };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred" };
  }
};
