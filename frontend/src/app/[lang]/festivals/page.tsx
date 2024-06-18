"use client";
import { useState, useEffect, useCallback } from "react";
import { fetchAPI } from "../utils/fetch-api";

import Loader from "../components/Loader";
import PageHeader from "../components/PageHeader";
import FestivalsList from "../views/festivals-list";
import sanitizeData from "../utils/sanitize-data";

interface Meta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}

export default function Festivals() {
  const [meta, setMeta] = useState<Meta | undefined>();
  const [festivals, setFestivals] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = useCallback(async (start: number, limit: number) => {
    setLoading(true);
    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
      const path = `/festivals`;
      const urlParamsObject = {
        sort: "createdAt",
        populate: {
          cover: { fields: ["url"] },
        },
        pagination: {
          start: start,
          limit: limit,
        },
      };
      const options = { headers: { Authorization: `Bearer ${token}` } };
      const responseData = await fetchAPI(path, urlParamsObject, options);
      if (start === 0) {
        setFestivals(sanitizeData(responseData.data));
      } else {
        setFestivals((prevData: any[]) => [
          ...prevData,
          ...sanitizeData(responseData.data),
        ]);
      }

      setMeta(responseData.meta);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  function loadMore(): void {
    const nextPosts = meta!.pagination.start + meta!.pagination.limit;
    fetchData(nextPosts, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }

  useEffect(() => {
    fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }, [fetchData]);

  if (isLoading) return <Loader />;

  return (
    <div>
      <PageHeader
        heading="Festivals"
        text="Discover a festival and plan your trip for an unforgettable experience"
      />
      <FestivalsList data={festivals}>
        {meta!.pagination.start + meta!.pagination.limit <
          meta!.pagination.total && (
          <div className="flex justify-center">
            <button
              type="button"
              className="px-6 py-3 text-sm rounded-lg hover:underline dark:bg-gray-900 dark:text-gray-400"
              onClick={loadMore}
            >
              Load more ...
            </button>
          </div>
        )}
      </FestivalsList>
    </div>
  );
}
