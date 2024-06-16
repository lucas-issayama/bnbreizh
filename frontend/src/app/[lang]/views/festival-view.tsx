import { formatDate, getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import { postRenderer } from "@/app/[lang]/utils/post-renderer";
import Image from "next/image";
import ImageSlider from "../components/ImageSlider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlockView } from "../utils/block-view";

export default function FestivalView({ data }: { data: Festival }) {
  const {
    title,
    description,
    publishedAt,
    cover,
    carousel,
    artists,
    reviews,
    musicStyles,
    tags,
  } = data;
  //const author = authorsBio.data?.attributes;
  const imageUrl = getStrapiMedia(cover.url);
  // const authorImgUrl = getStrapiMedia(
  //   authorsBio.data?.attributes.avatar.data.attributes.url
  // );

  return (
    <article className="space-y-8 dark:bg-black dark:text-gray-50  bg-opacity-80">
      {/* <p>{JSON.stringify({ data })}</p> */}
      {carousel.length > 0 && <ImageSlider data={{ files: carousel }} />}

      {/* {imageUrl && (
        <Image
          src={imageUrl}
          alt="article cover image"
          width={400}
          height={400}
          className="w-full h-96 object-cover rounded-lg"
        />
      )} */}

      <div className="space-y-6">
        <h1 className="leading-tight text-5xl font-bold ">{title}</h1>

        <div className="flex justify-start">
          {tags?.map((tag) => (
            <Badge variant="outline">{tag.label}</Badge>
          ))}
        </div>
        <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
          <div className="col-span-2">
            {" "}
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
                <CardDescription>{data.cityName}</CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </div>
          <div className="col-span-1">
            {" "}
            <Card>
              <CardHeader>
                <CardTitle>Avarage price </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">
                  {data.avaragePricePerDay} € /day
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div>
        <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6 ">
          <div className="col-span-2">
            {" "}
            <Card>
              <CardHeader>
                <CardTitle>Artists</CardTitle>
              </CardHeader>
              <CardContent>
                {artists?.map((artist: any) => (
                  <div className="flex justify-start my-2">
                    {artist?.cover?.url && (
                      <Image
                        src={getStrapiMedia(artist?.cover?.url) ?? ""}
                        alt="article cover image"
                        width={100}
                        height={100}
                        className="w-10 h-10 border rounded-full dark:bg-gray-500 dark:border-gray-700"
                      />
                    )}
                    <div className="mx-2 mt-1">{artist?.name}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Music styles</CardTitle>
              </CardHeader>
              <CardContent>
                {musicStyles?.map((musicStyle) => (
                  <div className="">
                    {/* <p>{JSON.stringify(musicStyle)}</p> */}
                    {/* <div className="mx-2 mt-1"></div> */}
                    <Badge
                      variant="outline"
                      color="red"
                      style={{
                        backgroundColor: musicStyle?.color ?? "white",
                        color: musicStyle?.textColor ?? "black",
                      }}
                    >
                      {musicStyle?.title}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="col-span-2">
            {" "}
            <Card>
              <CardHeader>
                <CardTitle>Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                {reviews?.map((review: any) => (
                  <div className="flex justify-between  my-2">
                    <div className=" flex justify-start">
                      {review?.reviewer?.cover?.url && (
                        <Image
                          src={
                            getStrapiMedia(review?.reviewer?.cover?.url) ?? ""
                          }
                          alt="article cover image"
                          width={100}
                          height={100}
                          className="w-10 h-10 border rounded-full dark:bg-gray-500 dark:border-gray-700"
                        />
                      )}
                      <div className="mx-2 mt-1">{review?.reviewer?.name}</div>
                    </div>
                    <p className="mx-2 mt-1">{review?.stars} </p>
                  </div>
                ))}
                {/* <div className="flex justify-between">
                  {authorImgUrl && (
                    <Image
                      src={authorImgUrl}
                      alt="article cover image"
                      width={100}
                      height={100}
                      className="w-10 h-10 border rounded-full dark:bg-gray-500 dark:border-gray-700"
                    />
                  )}
                  <p className="mx-2">5</p>
                </div> */}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="dark:text-gray-100">
        <p>{description}</p>

        {data.blocks.map((section: any, index: number) => (
          <BlockView section={section} index={index}></BlockView>
        ))}
      </div>
    </article>
  );
}

// postRenderer(section, index)
