/** @type {import('next').NextConfig} */
// const path = require("path");

const nextConfig = {
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
    output:"standalone"
};

module.exports = nextConfig