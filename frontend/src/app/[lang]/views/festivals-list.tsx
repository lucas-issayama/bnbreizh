import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia, formatDate } from "../utils/api-helpers";

export default function FestivalsList({
  data: festivals,
  children,
}: {
  data: Festival[];
  children?: React.ReactNode;
}) {
  return (
    <section className="container p-6 mx-auto space-y-6 sm:space-y-12 ">
      <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {festivals.map((festival) => {
          const imageUrl = getStrapiMedia(festival.cover?.url);
          return (
            <Link
              href={`/festivals/${festival.slug}`}
              key={festival.id}
              className="w-[100%] mx-auto group 
               dark:bg-gray-900  xl:min-w-[375px]             
              rounded-md overflow-hidden hover:shadow-xl  
            "
            >
              <div className="relative">
                {imageUrl && (
                  <Image
                    alt={festival.title}
                    width="500"
                    height="500"
                    className="object-cover w-full h-96  rounded-2xl "
                    src={imageUrl}
                  />
                )}
                <div
                  className="rounded-2xl absolute inset-0 flex 
               items-center justify-center p-6 opacity-0 group-hover:opacity-50
               bg-black transition-opacity duration-300
               text-white
                 "
                >
                  <p className="text-center text-xl">Open</p>
                </div>
              </div>

              <div className="p-6 space-y-2 relative  ">
                <h3 className="text-2xl font-semibold ">{festival.title}</h3>

                <div className="flex justify-between items-center">
                  <span className="text-xs dark:text-gray-400">
                    {festival.cityName}
                  </span>
                </div>
                <p className="py-4">{festival.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
      {children && children}
    </section>
  );
}
