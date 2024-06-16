interface Festival {
  id: number;
  title: string;
  description: string;
  slug: string;
  avaragePricePerDay: number;
  cityName: string;
  cover: {
    url: string;
  };
  carousel: Array<{
    id: number;
    url: string;
    alternativeText: string;
    caption: string;
  }>;
  artists: Array<{
    id: number;
    name: string;
    cover: {
      url: string;
    };
  }>;
  reviews: Array<{
    id: number;
    stars: number;
    reviewer: {
      name: string;
      cover: {
        url: string;
      };
    };
  }>;

  musicStyles: Array<{
    title: string;
    color: string;
    textColor: string;
  }>;
  tags: Array<{
    label: string;
  }>;
  blocks: any[];
  publishedAt: string;
}

// reviews: {
//     fields: ["stars"],
//     populate: {
//       reviewer: { fields: ["name"], cover: { fields: ["url"] } },
//     },
//   },
