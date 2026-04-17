"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CategoryList({
  categories,
}: {
  categories: any[];
}) {
  const currentPath = usePathname();
  // console.log("categories:", categories);
  return (
    <div className="grid grid-cols-4 gap-2">
      {categories.map((category) => (
        <div className="category-card" key={category.id}>
          <Link
            href={`${currentPath}?pcid=${category.id}`}
            className="font-bold"
          >
            {category.name}
          </Link>
        </div>
      ))}
    </div>
  );
}
