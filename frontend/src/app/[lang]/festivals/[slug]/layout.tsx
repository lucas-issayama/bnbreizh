import { fetchAPI } from "@/app/[lang]/utils/fetch-api";

export default async function LayoutRoute({
  params,
  children,
}: {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}) {
  return (
    <section className="container p-8 mx-auto space-y-6 sm:space-y-12 ">
      <div className="col-span-3">{children}</div>
    </section>
  );
}
