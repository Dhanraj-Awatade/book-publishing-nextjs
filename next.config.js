/** @type {import('next').NextConfig} */

const nextConfig = {
  basePath:'',
  // redirects:async ()=>{
  //   return [
  //     {
  //       source:'/:path*',
  //       has:[{type:'header',value:'origin',key:'http://localhost:3000'}],
  //       // www.${process.env.NEXT_PUBLIC_SERVER_URL}
  //       destination:`${process.env.NEXT_PUBLIC_SERVER_URL}/:path*`,
  //       permanent:true
  //     }
  //   ]
  // },
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
            hostname:"saptarshee-nextjs-docker-398070399895.asia-southeast1.run.app",
            pathname:"**",
            port:"",
            protocol:"https"
        },
        {
            hostname:"192.168.191.211",
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
          { key: "Access-Control-Allow-Origin", value: "https://saptarshee.in"/*`${process.env.NEXT_PUBLIC_SERVER_URL}`*/ },
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
    // output:"standalone"
};

module.exports = nextConfig