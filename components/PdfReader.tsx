"use client";
import React, { useState } from 'react'
import { pdfjs, Document, Page, Outline } from 'react-pdf';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { AspectRatio } from './ui/aspect-ratio';
import { ArrowLeftCircle, ArrowRightCircle, RotateCw } from 'lucide-react';
// import pdfjsWorker from "react-pdf/node_modules/pdfjs-dist/build/pdf.worker.entry";
// import worker from 'pdfjs-dist/webpack'
// import pdfjsWorker from "react-pdf/dist/cjs/pdf.worker.entry";



pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs"
// 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
// new URL(
//     'pdfjs-dist/build/pdf.worker.min.mjs',
//     import.meta.url,
// ).toString();

interface ReaderProps {
    productPath: string
}

const PdfReader = ({ productPath }: ReaderProps) => {

    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [rotation, setRotation] = useState<number>(0);
    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    return (
        <div className='max-h-[980px] md:max-h-max w-screen max-w-screen md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl overflow-hidden my-2 mx-auto'>

            {/* Progress Bar & Page number Div */}
            <div className='mt-4 mx-2'>
                <div className='flex items-center justify-center space-x-2 font-semibold'>
                    <h3>Page:{" "}{pageNumber}/{numPages}</h3>

                    <Button
                        className=" rounded-full"
                        variant={'ghost'}
                        onClick={() => setRotation(rotation + 90)}
                        disabled={numPages === 0}
                    >
                        <RotateCw />
                        <p className='mx-2'>Rotate</p>
                    </Button>
                </div>
                <Progress className='sticky' value={Math.round(pageNumber * 100 / numPages!)} />
            </div>

            {/* Viewer Div with Next Prev Buttons */}
            <div className='relative flex justify-center items-center max-w-screen-sm md:max-w-screen-xl h-[820px] md:h-[820px] px-4 '>
                <Button className="absolute start-3 z-10 rounded-full" variant={'outline'} onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber === 1}><ArrowLeftCircle className="" /></Button>

                <div className="h-fit flex items-center justify-center">
                    <Document
                        onSourceError={() => (<h1 className='text-red-600'>Error loading PDF. Please try again</h1>)}
                        file={productPath}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading={<h3>Loading your book, Please wait...</h3>}
                        rotate={rotation}
                    >

                        <Page renderAnnotationLayer={false} renderTextLayer={false} pageNumber={pageNumber} />
                    </Document>

                </div>

                <Button className="absolute end-3 z-10 rounded-full" variant={'outline'} onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber === numPages}><ArrowRightCircle /></Button>
            </div>
        </div>
    )

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
}

export default PdfReader
