import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia, formatDate } from "../utils/api-helpers";

interface Festival {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
    cityName: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    cover: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    category: {
      data: {
        attributes: {
          name: string;
          slug: string;
        };
      };
    };
    authorsBio: {
      data: {
        attributes: {
          name: string;
          avatar: {
            data: {
              attributes: {
                url: string;
              };
            };
          };
        };
      };
    };
  };
}

export default function FestivalsList({
  data: festivals,
  children,
}: {
  data: Festival[];
  children?: React.ReactNode;
}) {
  return (
    <section className="container p-6 mx-auto space-y-6 sm:space-y-12">
      <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {festivals.map((festival) => {
          const imageUrl = getStrapiMedia(
            festival.attributes.cover.data?.attributes.url
          );

          //const category = festival.attributes.category.data?.attributes;
          //const authorsBio = festival.attributes.authorsBio.data?.attributes;

          // const avatarUrl = getStrapiMedia(
          //   authorsBio?.avatar.data.attributes.url
          // );

          return (
            <Link
              href={`/festivals/${festival.attributes.slug}`}
              key={festival.id}
              className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-900 lg:w-[300px] xl:min-w-[375px] rounded-md overflow-hidden shadow-md hover:shadow-xl "
            >
              {imageUrl && (
                <Image
                  alt="presentation"
                  width="240"
                  height="240"
                  className="object-cover w-full h-44 "
                  src={imageUrl}
                />
              )}
              <div className="p-6 space-y-2 relative">
                {/* {avatarUrl && (
                  <Image
                    alt="avatar"
                    width="80"
                    height="80"
                    src={avatarUrl}
                    className="rounded-full h-16 w-16 object-cover absolute -top-8 right-4"
                  />
                )} */}

                <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
                  {festival.attributes.title}
                </h3>

                <div className="flex justify-between items-center">
                  <span className="text-xs dark:text-gray-400">
                    {festival.attributes.cityName}
                  </span>
                  {/* {authorsBio && (
                    <span className="text-xs dark:text-gray-400">
                      {authorsBio.name}
                    </span>
                  )} */}
                </div>
                <p className="py-4">{festival.attributes.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
      {children && children}
    </section>
  );
}
