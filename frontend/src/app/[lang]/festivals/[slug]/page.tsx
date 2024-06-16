import { fetchAPI } from "@/app/[lang]/utils/fetch-api";

import type { Metadata } from "next";
import FestivalView from "../../views/festival-view";
import sanitize from "../../utils/sanitize";

async function getFestivalBySlug(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/festivals`;
  const urlParamsObject = {
    filters: { slug },
    populate: {
      cover: { fields: ["url"] },
      //authorsBio: { populate: "*" },
      category: { fields: ["name"] },
      carousel: { fields: ["url", "alternativeText", "caption"] },
      artists: { fields: ["name"], populate: { cover: { fields: ["url"] } } },
      reviews: {
        fields: ["stars"],
        populate: {
          reviewer: {
            fields: ["name"],
            populate: { cover: { fields: ["url"] } },
          },
        },
      },

      musicStyles: { fields: ["title", "color", "textColor"] },
      tags: { fields: ["label"] },
      blocks: {
        populate: {
          __component: "*",
          files: "*",
          file: "*",
          url: "*",
          body: "*",
          title: "*",
          author: "*",
        },
      },
    },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(path, urlParamsObject, options);
  return response;
}

async function getMetaData(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/festivals`;
  const urlParamsObject = {
    filters: { slug },
    populate: { seo: { populate: "*" } },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(path, urlParamsObject, options);
  return response.data;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const meta = await getMetaData(params.slug);
  const metadata = meta[0].attributes.seo;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
  };
}

export default async function PostRoute({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const data = await getFestivalBySlug(slug);
  const festival = sanitize(data.data[0]);
  console.log("----------- festival------------");
  console.timeLog(JSON.stringify({ festival }));
  if (data.data.length === 0) return <h2>no post found</h2>;
  return <FestivalView data={festival} />;
}

export async function generateStaticParams() {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/festivals`;
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const articleResponse = await fetchAPI(
    path,
    {
      populate: ["category"],
    },
    options
  );

  return articleResponse.data.map(
    (article: {
      attributes: {
        slug: string;
        category: {
          slug: string;
        };
      };
    }) => ({ slug: article.attributes.slug, category: article.attributes.slug })
  );
}