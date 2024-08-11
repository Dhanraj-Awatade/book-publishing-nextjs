// app.use(cors());
// app.get("/api/trpc", cors(), (req, res) => {});
// app.use(function (req, res, next) {
//   // const allowedOrigins = [
//   //   "https://saptarshee.in",
//   //   "https://www.saptarshee.in",
//   //   "https://saptarshee.in",
//   //   "https://www.saptarshee.in",
//   //   "http://localhost:3000",
//   // ];
//   // const corsOptions = {
//   //   "Access-Control-Allow-Credentials": "true",
//   //   "Access-Control-Allow-Methods": "GET,DELETE,PATCH,POST,PUT",
//   //   "Access-Control-Allow-Headers":
//   //     "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
//   // };

//   // const origin = req.headers.host ?? "";
//   // const isAllowedOrigin = allowedOrigins.includes(origin);

//   // // Handle preflighted requests
//   // const isPreflight = req.method === "OPTIONS";

//   // if (isPreflight) {
//   //   const preflightHeaders = {
//   //     ...(isAllowedOrigin && { "Access-Control-Allow-Origin": origin }),
//   //     ...corsOptions,
//   //   };
//   //   return NextResponse.json({}, { headers: preflightHeaders });
//   // }

//   // if (isAllowedOrigin) {
//   // res.setHeader("Access-Control-Allow-Origin", s);
//   // }
//   res.setHeader("Access-Control-Allow-Origin", "https://www.saptarshee.in");
//   next();
// });

// // const corsOptions = {
// //   origin: [
// //     "https://saptarshee.in",
// //     "https://www.saptarshee.in",
// //     "https://saptarshee.in",
// //     "https://www.saptarshee.in",
// //   ],
// // };
// // app.use(cors(corsOptions));
