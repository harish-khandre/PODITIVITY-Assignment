"use client";
import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import { deleteBlog } from "@/actions/delete";
import { useRouter } from "next/navigation";

export const DeleteBlog = ({ id }: { id: string }) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      deleteBlog(id);
      router.push("/");
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <Button variant="destructive" onClick={handleDelete}>
      <Trash size={15} />
    </Button>
  );
};
