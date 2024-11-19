import Image from "next/image";
import Link from "next/link"
export default function BlogCard({ id,title, images }: { id:number; title: string; images: string[] }) {
  return (
    <>
    <Link href={`/blog/${id}`}>
    <div className="max-w-4xl mx-auto my-6 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800">
      {/* Title Section */}
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{title}</h2>
      
      {/* Image Section */}
      {images.length > 0 && (
        <div className="mt-4 overflow-hidden rounded-lg">
          <Image
            src={images[0]}
            alt={title}
            width={800}
            height={450}
            className="object-cover w-full h-72 hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      {/* Content Section */}
      {/* <div
        className="mt-4 text-gray-600 dark:text-gray-300 text-sm leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content }}
      /> */}
      
      {/* Read More Button */}
      <div className="mt-6">
        <button className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
          Read More
        </button>
      </div>
    </div>
    </Link>
    </>
  );
}
