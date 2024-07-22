/** @type {import('next').NextConfig} */

const nextConfig = {
    async headers() {
        return [
          {
            source: "/api/:path*",
            headers: [
              { key: "Access-Control-Allow-Credentials", value: "true" },
              { key: "Access-Control-Allow-Origin", value: `${process.env.NEXT_PUBLIC_SERVER_URL}` },
              { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
              { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
              // { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }
            ]
          },
          // {
          //   source: "/api/trpc/:path*",
          //   headers: [
          //     { key: "Access-Control-Allow-Credentials", value: "true" },
          //     { key: "Access-Control-Allow-Origin", value: "*" },
          //     { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          //     { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
          //     { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }
          //   ]
          // }
        ]
      },
    images:{
        remotePatterns:[
            {
                hostname:"shabdashivar.in",
                pathname:"**",
                port:"3000",
                protocol:"https"
            },
            {
                hostname:"localhost",
                pathname:"**",
                port:"3000",
                protocol:"http"
            },
            {
                hostname:"192.168.124.211",
                pathname:"**",
                port:"3000",
                protocol:"http"
            }
        ]
    },
    webpack: (config) => {
           config.resolve.alias.canvas = false;
        //    config.resolve.alias["payload"] = path.resolve("./node_modules/payload/dist/payload.js")
        // //    config.resolve.alias["payload"] = path.resolve("./node_modules/payload/dist/config/load.js")
        config.module.rules.push({
            test: /\.node/,
            use: "raw-loader",
          });   
        return config;
         
  },
    // experimental: {
    //     urlImports: ['https://cdnjs.cloudflare.com/ajax/libs/pdf.js/','https://unpkg.com/'],
    //   },
    // output:"export"
};

module.exports = nextConfig