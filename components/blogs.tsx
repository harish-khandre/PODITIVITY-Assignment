import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-layout";
import { db } from "@/lib/db";
import { Blog } from "@prisma/client";
import Link from "next/link";

const fetchBlogs = async () => {
  const res = await db.blog.findMany();
  return res;
};

export async function Blogs() {
  const items = await fetchBlogs();
  return (
    <BentoGrid className="mx-auto">
      {items.map((item: Blog) => (
        <Link href={`/blogs/${item.id}`} key={item.id}>
          <BentoGridItem
            // @ts-ignore
            createdAt={item.createdAt}
            title={item.title}
            description={item.content}
            header={item.thumbnail}
            className={
              items.length === 3 || items.length === 6 ? "md:col-span-2" : ""
            }
          />
        </Link>
      ))}
    </BentoGrid>
  );
}
