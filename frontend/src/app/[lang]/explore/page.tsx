"use client";
// import { sectionRenderer } from "@/app/[lang]/utils/section-renderer";
// import { Metadata } from "next";
// import { getPageBySlug } from "@/app/[lang]/utils/get-page-by-slug";
// import { FALLBACK_SEO } from "@/app/[lang]/utils/constants";
import { useState, useEffect, useCallback } from "react";
import { fetchAPI } from "../utils/fetch-api";

import Map from "../components/Map";
import sanitize from "../utils/sanitize";

type Props = {
  params: {
    lang: string;
    slug: string;
  };
};

export default async function ExplorePage({ params }: Props) {
  const [isLoading, setLoading] = useState(true);
  const [festivals, setFestivals] = useState(Array<Festival>);
  const fetchData = useCallback(async (start: number, limit: number) => {
    setLoading(true);
    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
      const path = `/festivals`;
      const urlParamsObject = {
        sort: { createdAt: "desc" },
        populate: {
          cover: { fields: ["url"] },
          // category: { populate: "*" },
          // authorsBio: {
          //   populate: "*",
          // },
        },
        pagination: {
          start: start,
          limit: limit,
        },
      };
      const options = { headers: { Authorization: `Bearer ${token}` } };
      const res = await fetchAPI(path, urlParamsObject, options);

      let values = sanitize(res.data);
      setFestivals(values);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }, [fetchData]);

  return (
    <div className="mx-5">
      <h2 className="text-lg">Explore </h2>
      {/* <p>{JSON.stringify({ festivals })}</p> */}
      <br></br>
      <div>
        <Map festivals={festivals} />
      </div>
    </div>
  );
}