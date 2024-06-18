interface Festival {
  id: number;
  title: string;
  description: string;
  slug: string;
  averagePricePerDay: number;
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
    id: number;
    title: string;
    color: string;
    textColor: string;
  }>;
  tags: Array<{
    id: number;
    label: string;
  }>;
  blocks: any[];
  publishedAt: string;
}
