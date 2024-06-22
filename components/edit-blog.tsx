"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import { Textarea } from "./ui/textarea";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";

export function EditBlog({ id }: { id: string }) {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | undefined>(undefined);

  const { toast } = useToast();
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFile(file);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      toast({ variant: "destructive", title: "Please enter Image" });
      return;
    }

    if (!content) {
      toast({ variant: "destructive", title: "Please enter Content" });
      return;
    }

    if (!title) {
      toast({ variant: "destructive", title: "Please enter Title" });
      return;
    }

    if (!name) {
      toast({ variant: "destructive", title: "Please enter Name" });
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("content", content);
    formData.append("title", title);
    formData.append("id", id);

    if (!name) {
      toast({ variant: "destructive", title: "Please enter name" });
      return;
    }
    try {
      const response = await fetch("/api/edit", {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        toast({ variant: "destructive", title: "Error sending request" });
        setUploading(false);
        return;
      }

      setUploading(false);
      toast({ title: "Form submitted successfully!" });
      const success = response.status === 200;
      if (success) router.push("/");
    } catch (error) {
      toast({ variant: "destructive", title: "Something went wrong!" });
      console.log(error);
      setUploading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Pencil size="15" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Edit blog</SheetTitle>
          <SheetDescription>
            Make changes to your Blog here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={onSubmit}>
          <div className="grid w-full items-center gap-4 m-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Author Name</Label>
              <Input
                id="name"
                placeholder="Author Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Title of the blog"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Write content of the blog"
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="thumbnail">Thumbnail</Label>
              <Input
                id="thumbnail"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit" disabled={!file || uploading}>
                {uploading ? "Uploading..." : "Submit"}
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
