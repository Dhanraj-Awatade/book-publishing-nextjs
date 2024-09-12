/* CORS OBSOLETE CODE */

// app.use((req, res, next) => {
//   const corsWhitelist = [
//     "https://saptarshee.in",
//     "https://www.saptarshee.in",
//     "https://saptarshee-nextjs-docker-398070399895.asia-southeast1.run.app",
//     "http://localhost:3000",
//   ];
//   if (
//     corsWhitelist.indexOf(req.headers.origin as string) !== -1 &&
//     req.method === "OPTIONS"
//   ) {
//     res.header("Access-Control-Allow-Origin", req.headers.origin);
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Access-Control-Allow-Headers,Origin, X-Requested-With, Content-Type, Accept,X-API-KEY,Authorization"
//     );
//     res.setHeader("Access-Control-Allow-Credentials", "true");
//     res.setHeader(
//       "Access-Control-Allow-Methods",
//       "GET, POST, PATCH, PUT, DELETE, OPTIONS"
//     );

//     console.log(
//       "In corsWhitelist",
//       req.headers.origin,
//       res.getHeader("Access-Control-Allow-Origin")
//     );
//   }

//   next();
//   // if (req.method === "OPTIONS") return 204;././
// });

/* CORS OBSOLETE CODE END */
