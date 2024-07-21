export const PRODUCT_CATEGORIES = [
  {
    label: "Fiction",
    value: "fiction" as const,
    href: "/books?category=fiction",
    //To-Do: Add Categories & Images Here
    imgSrc: "",

    // categories: [
    //   {
    //     label: "Erotica",
    //     value: "erotica",
    //     href: "#",
    //     imgSource: "",
    //   },
    // ],
  },
  {
    label: "Erotica",
    value: "erotica" as const,
    href: "/books?category=erotica",
    imgSrc: "",
    // categories: [
    //   {
    //     label: "Erotica",
    //     value: "erotica",
    //     href: "#",
    //     imgSource: "",
    //   },
    // ],
  },
];

export const PRODUCT_TYPES = [
  {
    label: "Paperback",
    value: "paperback" as const,
  },
  {
    label: "eBook",
    value: "ebook" as const,
  },
];

export const LINKS = [
  {
    id: 1,
    title: "Home",
    link: "",
  },
  {
    id: 2,
    title: "Books",
    link: "/books",
  },
  {
    id: 3,
    title: "Authors",
    link: "/authors",
  },
  {
    id: 4,
    title: "Publish With Us",
    link: "/publish",
  },
  {
    id: 5,
    title: "About Us",
    link: "/about",
  },
];
