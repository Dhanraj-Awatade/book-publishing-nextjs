"use client";
import React, { useState } from 'react'
import { pdfjs, Document, Page, Outline } from 'react-pdf';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { ArrowLeftCircle, ArrowRightCircle, RotateCw } from 'lucide-react';
import { CSSTransition } from 'react-transition-group';
import styles from './EbookReader.module.css'

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs"

interface ReaderProps {
    productPath: string
}

const EbookReader = ({ productPath }: ReaderProps) => {

    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [rotation, setRotation] = useState<number>(0);
    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    return (
        <div className='max-h-[980px] md:max-h-max w-screen max-w-screen md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl overflow-hidden my-2 mx-auto'>

            {/* Progress Bar & Page number Div */}
            <div className='mt-4 mx-2 gap-y-2'>
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

                <div className="h-fit max-h-fit flex items-center justify-center">
                    <Document
                        onSourceError={() => (<h1 className='text-red-600'>Error loading PDF. Please try again</h1>)}
                        file={productPath}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading={<h3>Loading your book, Please wait...</h3>}
                        rotate={rotation}
                    >

                        <CSSTransition
                            in={pageNumber === pageNumber}
                            key={pageNumber}
                            timeout={300}
                            classNames={styles.pageTransition}
                            unmountOnExit
                        >
                            <Page renderAnnotationLayer={false} renderTextLayer={false} pageNumber={pageNumber} />
                        </CSSTransition>
                    </Document>

                </div>

                <Button className="absolute end-3 z-10 rounded-full" variant={'outline'} onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber === numPages}><ArrowRightCircle /></Button>
            </div>
        </div>
    )
}

export default EbookReader







/* Alternate implementation*/
// "use client"
// import React, { useEffect, useRef, useState } from 'react'
// import * as pdfjsLib from 'pdfjs-dist';

// interface ReaderProps {
//     productPath: string
// }

// pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.mjs"

// const EbookReader = ({ productPath }: ReaderProps) => {
//     // return (
//     //     <div>

//     //     </div>
//     // )

//     const pdfRef = useRef<HTMLDivElement | null>(null);
//     const [pdfDocument, setPdfDocument] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [zoom, setZoom] = useState(1.0);

//     useEffect(() => {
//         // Load PDF document using PDF.js
//         try {
//             const loadingTask = pdfjsLib.getDocument(productPath);
//             loadingTask.promise.then(pdf => {
//                 setPdfDocument(pdf);
//             });
//         } catch (error) {
//             console.log(error)
//         }

//     }, [productPath]);

//     useEffect(() => {
//         renderPage(currentPage);
//     }, [pdfDocument, currentPage, zoom]);

//     const renderPage = (pageNum: number) => {
//         // Render the specified page using PDF.js
//         pdfDocument?.getPage(pageNum).then(page => {
//             const viewport = page.getViewport({ scale: zoom });
//             const canvas = document.createElement('canvas');
//             canvas.width = viewport.width;
//             canvas.height = viewport.height;
//             const context = canvas.getContext('2d');

//             page.render({
//                 canvasContext: context!, viewport
//             }).promise.then(() => {
//                 if (pdfRef.current)
//                     pdfRef.current.appendChild(canvas);
//             });
//         });
//     };

//     const handlePageChange = (newPage: number) => {
//         setCurrentPage(newPage);
//     };

//     const handleZoom = (newZoom: number) => {
//         setZoom(newZoom);
//     };

//     // ... other functions for search, annotations, etc.

//     return (
//         <div ref={pdfRef}>
//             {/* Render PDF pages using canvas or WebGL */}
//             {/* Implement zoom, pan, and page turning controls */}
//             {/* Display search results and annotations */}
//             <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
//             <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>

//             <input type="range" min="0.5" max="3" step="0.1" value={zoom} onChange={(e) => handleZoom(parseFloat(e.target.value))} />
//             {/* ... */}
//         </div>
//     );
// }

// export default EbookReader
