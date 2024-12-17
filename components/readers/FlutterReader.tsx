// "use client";
// import React from "react";

// interface FlutterReaderProps {
//     productId: string;
//     productPath: string;
//     productType: string;
//     productName: string;
// }

// const FlutterReader = ({
//     productId,
//     productPath,
//     productType,
//     productName,
// }: FlutterReaderProps) => {
//     const mockUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/index.html?id=${productId}&url=${productPath}&type=${productType}&title=${productName}`;

//     const htmlPage = `<!DOCTYPE html>
// <html>
//   <head>
//     <base href="/" />

//     <meta charset="UTF-8" />
//     <meta content="IE=Edge" http-equiv="X-UA-Compatible" />
//     <meta name="description" content="A new Flutter project." />

//     <meta name="apple-mobile-web-app-capable" content="yes" />
//     <meta name="apple-mobile-web-app-status-bar-style" content="black" />
//     <meta name="apple-mobile-web-app-title" content="ebook_reader" />
//     <link rel="apple-touch-icon" href="icons/Icon-192.png" />

//     <link rel="icon" type="image/png" href="favicon.png" />

//     <title>ebook_reader</title>
//     <script>
// window.location.href = "${mockUrl}";
// </script>
//     <link rel="manifest" href="manifest.json" />

//     <script>
//       // Service worker version injected by flutter build (do not touch)
//       var serviceWorkerVersion = "2615520127";
//     </script>

//     <script src="flutter.js" defer></script>

//     <script
//       src="https://cdn.jsdelivr.net/npm/pdfjs-dist@2.12.313/build/pdf.js"
//       type="text/javascript"
//     ></script>
//     <script type="text/javascript">
//       pdfjsLib.GlobalWorkerOptions.workerSrc =
//         "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.12.313/build/pdf.worker.min.js";
//       pdfRenderOptions = {
//         cMapUrl: "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.12.313/cmaps/",
//         cMapPacked: true,
//       };
//     </script>
//   </head>
//   <body>
//     <script>
//       window.addEventListener("load", function (ev) {
//         _flutter.loader.loadEntrypoint({
//           serviceWorker: {
//             serviceWorkerVersion: serviceWorkerVersion,
//           },
//           onEntrypointLoaded: function (engineInitializer) {
//             engineInitializer
//               .initializeEngine({
//                 renderer: "html", // Or 'canvaskit' depending on your preference
//                 // Other configuration options can go here
//               })
//               .then(function (appRunner) {
//                 appRunner.runApp();
//               });
//           },
//         });
//       });
//     </script>
//   </body>
// </html>
// `;

//     return (
//         <div
//             dangerouslySetInnerHTML={{
//                 __html: htmlPage,
//             }}
//         ></div>
//     );
// };

// export default FlutterReader;
