"use client";
import React, { useState } from "react";
import { pdfjs, Document, Page, Outline } from "react-pdf";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { AspectRatio } from "../ui/aspect-ratio";
import { ArrowLeftCircle, ArrowRightCircle, RotateCw } from "lucide-react";
// import pdfjsWorker from "react-pdf/node_modules/pdfjs-dist/build/pdf.worker.entry";
// import worker from 'pdfjs-dist/webpack'
// import pdfjsWorker from "react-pdf/dist/cjs/pdf.worker.entry";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs";
// 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
// new URL(
//     'pdfjs-dist/build/pdf.worker.min.mjs',
//     import.meta.url,
// ).toString();

interface ReaderProps {
    productPath: string;
}

const PdfReader = ({ productPath }: ReaderProps) => {
    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [rotation, setRotation] = useState<number>(0);
    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    // the required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistance = 50;

    const onTouchStart = (e: any) => {
        setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: any) => setTouchEnd(e.targetTouches[0].clientX);

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        if (isLeftSwipe || isRightSwipe)
            console.log("swipe", isLeftSwipe ? "left" : "right");
        if (isLeftSwipe) {
            setPageNumber(pageNumber + 1);
            console.log(pageNumber);
        }
        if (isRightSwipe) {
            pageNumber === 1
                ? console.log("first page")
                : setPageNumber(pageNumber - 1);
            console.log(pageNumber);
        }
    };

    return (
        <div
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            className="bg-amber-500 h-full flex flex-col justify-around mt-4 md:max-h-max w-screen max-w-screen md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl overflow-hidden mx-auto"
        >
            {/* Viewer Div with Next Prev Buttons */}
            <div className="bg-green-500 px-4 flex justify-center items-center max-w-screen-sm md:max-w-screen-lg">
                {/*  relative  h-[820px] md:h-[820px] */}
                {/* <div className="h-fit max-h-fit flex items-center justify-start bg-amber-500"> */}
                <Document
                    onSourceError={() => (
                        <h1 className="text-red-600">
                            Error loading PDF. Please try again
                        </h1>
                    )}
                    file={productPath}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={<h3>Loading your book, Please wait...</h3>}
                    rotate={rotation}
                >
                    <Page
                        renderAnnotationLayer={false}
                        renderTextLayer={false}
                        pageNumber={pageNumber}
                        // onAnimationStart={()}
                        // width={screen.availWidth}
                        height={screen.height}
                        scale={0.8}
                    />
                </Document>
                {/* </div> */}
            </div>

            {/* Progress Bar & Page number Div */}
            <div className="mt-4 mx-2 gap-y-2 bg-red-500 mb-0">
                <div className="flex items-center justify-between space-x-2 font-semibold">
                    <Button
                        className="rounded-full"
                        // absolute start-3 z-10
                        variant={"ghost"}
                        onClick={() => setPageNumber(pageNumber - 1)}
                        disabled={pageNumber === 1}
                    >
                        <ArrowLeftCircle className="" />
                    </Button>

                    <h3>
                        Page: {pageNumber}/{numPages}
                    </h3>

                    <Button
                        className=" rounded-full"
                        variant={"ghost"}
                        onClick={() => setRotation(rotation + 90)}
                        disabled={numPages === 0}
                    >
                        <RotateCw />
                        <p className="mx-2">Rotate</p>
                    </Button>
                    <Button
                        className="rounded-full"
                        // absolute end-3 z-10
                        variant={"ghost"}
                        onClick={() => setPageNumber(pageNumber + 1)}
                        disabled={pageNumber === numPages}
                    >
                        <ArrowRightCircle />
                    </Button>
                </div>
                <Progress
                    className="sticky"
                    value={Math.round((pageNumber * 100) / numPages!)}
                />
            </div>
        </div>
    );

    // return (
    //     <div className='max-h-full w-screen max-w-screen md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl overflow-y-auto overflow-x-hidden bg-fuchsia-500 my-2 mx-auto'>

    //         <div className='my-4 mx-2'>
    //             <div className='flex items-center justify-center space-x-2 font-semibold'>
    //                 <h3>Page:{" "}{pageNumber}/{numPages}</h3>
    //             </div>
    //             <Progress className='sticky' value={Math.round(pageNumber * 100 / numPages!)} />
    //         </div>

    //         <div className='bg-black relative flex justify-center items-center max-w-screen-xl px-4'>
    //             <Button className="absolute start-3 z-10 rounded-full" variant={'ghost'} onClick={() => setPageNumber(pageNumber - 1)} ><ArrowLeftCircle className="" /></Button>

    //             <AspectRatio className='justify-center ' ratio={16 / 9}>
    //                 <div className="h-screen bg-red-500 flex items-center justify-center">
    //                     <Document
    //                         onSourceError={() => (<h1 className='text-red-600'>Error loading PDF. Please try again</h1>)}
    //                         file={productPath}
    //                         onLoadSuccess={onDocumentLoadSuccess}
    //                     >

    //                         <Page renderAnnotationLayer={false} renderTextLayer={false} pageNumber={pageNumber} />
    //                     </Document>
    //                 </div>
    //             </AspectRatio>

    //             <Button className="absolute end-3 z-10 rounded-full" variant={'ghost'} onClick={() => setPageNumber(pageNumber + 1)} ><ArrowRightCircle /></Button>
    //         </div>
    //     </div>
    // )

    // return (
    //     <div className='max-h-full max-w-screen-xl overflow-auto my-2 mx-auto justify-center'>

    //         <div className='my-4 mx-2'>
    //             <div className='flex items-center justify-center space-x-2 font-semibold'>
    //                 <h3>Page:{" "}{pageNumber}/{numPages}</h3>
    //             </div>
    //             <Progress className='sticky' value={Math.round(pageNumber * 100 / numPages!)} />
    //         </div>
    //         <div className='bg-black'>
    //             <div className='mx-4 bg-blue-500 w-[450px] md:w-[640px] lg:w-[1080px]'>
    //                 <AspectRatio className='bg-red-500' ratio={16 / 9}></AspectRatio>
    //                 <div className="h-screen w-screen overflow-y-auto ">

    //                     {/*  */}
    //                 </div>
    //                 <Button onClick={() => setPageNumber(pageNumber + 1)} >Next Page</Button>
    //             </div>
    //         </div>
    //     </div>
    // )
};

export default PdfReader;
