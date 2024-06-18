import { formatDate, getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
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
import Rating from "../components/Rating";

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

  return (
    <article className="space-y-8 dark:bg-black dark:text-gray-50  bg-opacity-80">
      {carousel.length > 0 && <ImageSlider data={{ files: carousel }} />}

      <div className="space-y-6">
        <h1 className="leading-tight text-5xl font-bold ">{title}</h1>

        <div className="flex justify-start">
          {tags?.map((tag) => (
            <Badge key={tag.id} variant="outline">
              {tag.label}
            </Badge>
          ))}
        </div>
        <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 ">
          <div className="col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
                <CardDescription>{data.cityName}</CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </div>
          <div className="col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Average price </CardTitle>
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

      <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6 ">
        <div className="col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Artists</CardTitle>
            </CardHeader>
            <CardContent>
              {artists?.map((artist) => (
                <div key={artist.id} className="flex justify-start my-2">
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
                <div key={musicStyle.id} className="">
                  <Badge
                    variant="outline"

                    // style={{
                    //   backgroundColor: musicStyle?.color ?? "white",
                    //   color: musicStyle?.textColor ?? "black",
                    // }}
                  >
                    {musicStyle?.title}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              {reviews?.map((review: any) => (
                <div key={review.id} className="flex justify-between  my-2">
                  <div className=" flex justify-start">
                    {review?.reviewer?.cover?.url && (
                      <Image
                        src={getStrapiMedia(review?.reviewer?.cover?.url) ?? ""}
                        alt="article cover image"
                        width={100}
                        height={100}
                        className="w-10 h-10 border rounded-full dark:bg-gray-500 dark:border-gray-700"
                      />
                    )}
                    <div className="mx-2 mt-1">{review?.reviewer?.name}</div>
                  </div>
                  <Rating rating={review?.stars ?? 0}></Rating>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="dark:text-gray-100">
        <p>{description}</p>
        {data.blocks.map((section: any, index: number) => (
          <BlockView key={index} section={section} index={index}></BlockView>
        ))}
      </div>
    </article>
  );
}
