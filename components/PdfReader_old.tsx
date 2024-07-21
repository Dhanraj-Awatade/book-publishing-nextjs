// "use client";
// import React from 'react'
// // import { pdfjs, Document, Page } from 'react-pdf'
// // import { Viewer, Worker } from "@react-pdf-viewer/core";
// // import "@react-pdf-viewer/core/lib/styles/index.css";
// // import { SidebarTab, defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// // import "@react-pdf-viewer/default-layout/lib/styles/index.css";


// // import type { AttachmentPlugin } from '@react-pdf-viewer/attachment';
// // import type { BookmarkPlugin } from '@react-pdf-viewer/bookmark';
// // import type { PdfJs, Plugin, ScrollMode } from '@react-pdf-viewer/core';
// // import type { ThumbnailPlugin, ThumbnailPluginProps } from '@react-pdf-viewer/thumbnail';
// // import type { ToolbarPlugin, ToolbarPluginProps, ToolbarProps, ToolbarSlot } from '@react-pdf-viewer/toolbar';
// // import readingIndicatorPlugin from './reader_components/readingIndicatorPlugin';
// import ReadingIndicator from './reader_components/ReadingIndicator';
// import { cn } from '@/lib/utils';

// // // const worker = new pdfjs.PDFWorker()
// // const workerPath = "../lib/pdf.worker.mjs"

// interface ReaderProps {
//     productPath: string
// }

// // interface CustomLayoutPlugin extends Plugin {
// //     activateTab(index: number): void;
// //     toggleTab(index: number): void;
// //     readonly attachmentPluginInstance: AttachmentPlugin;
// //     readonly bookmarkPluginInstance: BookmarkPlugin;
// //     readonly thumbnailPluginInstance: ThumbnailPlugin;
// //     readonly toolbarPluginInstance: ToolbarPlugin;
// // }

// // interface CustomLayoutPluginProps {
// //     thumbnailPlugin?: ThumbnailPluginProps;
// //     toolbarPlugin?: ToolbarPluginProps;
// //     renderToolbar?: (Toolbar: (props: ToolbarProps) => React.ReactElement) => React.ReactElement;
// //     setInitialTab?: (doc: PdfJs.PdfDocument) => Promise<number>;
// //     sidebarTabs?: (defaultTabs: SidebarTab[]) => SidebarTab[];
// // }


// // function customLayoutPluginInstance(props?: CustomLayoutPluginProps): CustomLayoutPlugin

// const PdfReader = ({ productPath }: ReaderProps) => {

//     //     // pdfjs.GlobalWorkerOptions.workerSrc = workerPath
//     // const defaultLayoutPluginInstance = defaultLayoutPlugin();
//     // const readingIndicatorPluginInstance = readingIndicatorPlugin()


//     return (
//         // <Document file={productPath}>
//         //     <Page pageIndex={0} />
//         // </Document>
//         <>
//             <ReadingIndicator className={cn("w-full sticky")} />
//             <div className="h-screen w-screen">
//                 {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@4.3.136/build/pdf.worker.min.mjs">
//                     <Viewer
//                         fileUrl={productPath}
//                         plugins={[readingIndicatorPluginInstance]}

//                         enableSmoothScroll={true}
//                     />
//                 </Worker>*/}
//             </div>
//         </>
//     )
// }

// export default PdfReader
