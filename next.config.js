/** @type {import('next').NextConfig} */

const nextConfig = {
  images:{
    // domains:['saptarshee.in','localhost','192.168.204.211','shabdashivar.in'],
    // domains:[`${process.env.NEXT_PUBLIC_SERVER_URL}`],
    remotePatterns:[
        {
            hostname:"saptarshee.in",
            pathname:"**",
            port:'',
            protocol:"https"
        },
        {
          hostname:"saptarshee.in",
          pathname:"/media/**",
          port:'',
          protocol:"https"
      },
        {
          hostname:"www.saptarshee.in",
          pathname:"**",
          port:'',
          protocol:"https"
      },
        {
            hostname:"localhost",
            pathname:"**",
            port:"3000",
            protocol:"http"
        },
        {
            hostname:"192.168.1.211",
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
    // experimental: {
    //     urlImports: ['https://cdnjs.cloudflare.com/ajax/libs/pdf.js/','https://unpkg.com/'],
    //   },
    // output:"export"
};

module.exports = nextConfig