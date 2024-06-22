import { db } from "@/lib/db";
import { DeleteBlog } from "./delete-blog";
import { EditBlog } from "./edit-blog";

async function fetchBlog(id: string) {
  try {
    const blog = await db.blog.findUnique({
      where: {
        id: id,
      },
    });
    return blog;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default async function BlogPage({ id }: { id: string }) {
  const objectBlogs = await fetchBlog(id);
  const blogs = [objectBlogs];

  return (
    <>
      {blogs.map((blog: any) => (
        <div key={blog.id} className="flex h-full md:w-[70%] py-4 px-8 gap-4">
          <div className="blog-section  w-full mx-auto  h-full border-2   rounded-2xl ">
            <div className="lg:h-[27rem]">
              <img
                src={blog.thumbnail}
                alt="thumbnail"
                className="object-cover w-full h-full rounded-t-2xl"
              />
            </div>
            <div className="h-full lg:p-8 ">
              <div className="flex justify-between items-center h-full">
                <h1 className="text-2xl sm:text-2xl font-bold p-3 ">
                  {blog.title}
                </h1>
                <div className="flex flex-row gap-4">
                  <EditBlog id={blog.id} />
                  <DeleteBlog id={blog.id} />
                </div>
              </div>
              <hr />
              <section className=" p-3">
                <p>{blog.content}</p>
              </section>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
