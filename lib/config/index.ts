export const PRODUCT_CATEGORIES = [
  {
    label: "Biography & Memoir",
    value: "biography" as const,
    href: "/books?category=biography",
    imgSrc: "/Images/Category_Images/biography.png",
  },
  {
    label: "Non-Fiction",
    value: "nonfiction" as const,
    href: "/books?category=nonfiction",
    imgSrc: "/Images/Category_Images/Nonfiction.png",
  },
  {
    label: "Business & Finance",
    value: "business" as const,
    href: "/books?category=business",
    imgSrc: "/Images/Category_Images/business.png",
  },
  {
    label: "Periodicals",
    value: "periodicals" as const,
    href: "/books?category=periodicals",
    imgSrc: "/Images/Category_Images/periodicals.png",
  },
  {
    label: "Romance",
    value: "romance" as const,
    href: "/books?category=romance",
    imgSrc: "/Images/Category_Images/romance.png",
  },
  {
    label: "Science Fiction & Fantasy",
    value: "fantasy" as const,
    href: "/books?category=fantasy",
    imgSrc: "/Images/Category_Images/fantasy.png",
  },
  {
    label: "Mystery & Suspense",
    value: "mystery" as const,
    href: "/books?category=mystery",
    imgSrc: "/Images/Category_Images/mystery.png",
  },
  {
    label: "Young Adult",
    value: "youngadult" as const,
    href: "/books?category=youngadult",
    imgSrc: "/Images/Category_Images/youngadult.png",
  },
  {
    label: "Fiction",
    value: "fiction" as const,
    href: "/books?category=fiction",
    //To-Do(Completed): Add Categories & Images Here
    imgSrc: "/Images/Category_Images/fiction.png",
  },
  {
    label: "Literature",
    value: "literature" as const,
    href: "/books?category=literature",
    imgSrc: "/Images/Category_Images/literature.png",
  },
  {
    label: "Kids",
    value: "kids" as const,
    href: "/books?category=kids",
    imgSrc: "/Images/Category_Images/kids.png",
  },
  {
    label: "Comics, Graphic Novels & Manga",
    value: "comics" as const,
    href: "/books?category=comics",
    imgSrc: "/Images/Category_Images/comics.png",
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
