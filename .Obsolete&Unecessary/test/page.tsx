// import { AspectRatio } from "@/components/ui/aspect-ratio";
// import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
// import { getServerSideUser } from "@/lib/payload-utils";
// import { User } from "@/payload-types";
// import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
// import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
// import { cookies } from "next/headers";
// import Image from "next/image";
// import { NextRequest } from "next/server";
// import qs from "qs"
// const page = async () => {
//     // const nextCookies = cookies()
//     // const { user } = await getServerSideUser(nextCookies)

//     // if (user) {
//     const inputData = {
//         user: "user!.id",
//         products: "products"
//     };

//     const addProductToUserQuery = qs.stringify(
//         {
//             where: {
//                 id: {
//                     equals: "65db1df7cefd0032f4da2395",
//                 },
//             },
//         },
//         { addQueryPrefix: true }
//     );
//     const addProductToUserAPI = await fetch(
//         `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${addProductToUserQuery}`,
//         {
//             method: "PATCH",
//             credentials: "include",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 products: ['667d97bac4059fe79ae30cb5'],
//             }),
//         }
//     );
//     const text = await addProductToUserAPI.json();
//     console.log("Updated User with Products", text);
//     // }

//     return (
//         <div className='max-h-[580px] w-screen max-w-screen md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl overflow-hidden bg-fuchsia-500 my-2 mx-auto'>
//             {/* 
//             <div className='my-4 mx-2'>
//                 <div className='flex items-center justify-center space-x-2 font-semibold'>
//                     <h3>Page:{" "}{pageNumber}/{numPages}</h3>
//                 </div>
//                 <Progress className='sticky' value={Math.round(pageNumber * 100 / numPages!)} />
//             </div>

//             <div className='bg-black relative flex justify-center items-center max-w-screen-xl h-[520px] px-4 '>
//                 <Button className="absolute start-3 z-10 rounded-full" variant={'ghost'} onClick={() => setPageNumber(pageNumber - 1)} ><ArrowLeftCircle className="" /></Button>

//                 <AspectRatio className='justify-center' ratio={16 / 9}>
//                     <div className="h-fit bg-red-500 flex items-center justify-center">
//                         Document Body
//                     </div>
//                 </AspectRatio>

//                 <Button className="absolute end-3 z-10 rounded-full" variant={'ghost'} onClick={() => setPageNumber(pageNumber + 1)} ><ArrowRightCircle /></Button>
//             </div> */}
//             Test Div
//         </div>
//     )
// }

// export default page
