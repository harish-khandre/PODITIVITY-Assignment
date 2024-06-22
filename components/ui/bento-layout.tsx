import { cn } from "@/lib/utils";
import { format } from "date-fns";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  createdAt,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  createdAt?: string;
}) => {
  return (
    <div
      className={cn(
        " h-full row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4  dark:border-white/[0.2]  border border-transparent justify-between flex flex-col space-y-4",
        className,
      )}
    >
      <img
        src={header as string}
        alt="thumbnail"
        className="flex flex-1  w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br object-cover "
      />
      <div className="group-hover/bento:translate-x-2 transition duration-200 ">
        <p className="text-xs">
          {format(createdAt as string, "MMMM dd, yyyy")}
        </p>
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2 text-xl">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 dark:text-neutral-300 md:line-clamp-2 lg:line-clamp-3">
          {description}
        </div>
      </div>
    </div>
  );
};
