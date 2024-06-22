"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

export const BlogForm = () => {
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

    if (!name) {
      toast({ variant: "destructive", title: "Please enter name" });
      return;
    }
    try {
      const response = await fetch("/api/create", {
        method: "POST",
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
    <Card className="grid w-1/2 m-auto ">
      <CardHeader>
        <CardTitle>Create Blog</CardTitle>
        <CardDescription>Post a blog in a min</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <div className="grid w-full items-center gap-4">
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
            <Button
              type="submit"
              disabled={!file || uploading}
              className="button"
            >
              {uploading ? "Uploading..." : "Submit"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
