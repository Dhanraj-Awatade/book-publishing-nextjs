FROM node:22.8.0 AS base

FROM base AS deps
# Install dependencies
RUN apt update && apt install -y libc6 fuse curl bash gnupg lsb-release

# Add Google Cloud repository and install gcsfuse (using official website method, working method)
RUN export GCSFUSE_REPO=gcsfuse-`lsb_release -c -s` && echo "deb [signed-by=/usr/share/keyrings/cloud.google.asc] https://packages.cloud.google.com/apt $GCSFUSE_REPO main" | tee /etc/apt/sources.list.d/gcsfuse.list
RUN curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | tee /usr/share/keyrings/cloud.google.asc
RUN apt update && apt install -y gcsfuse

#  (old method)
# RUN echo "deb http://packages.cloud.google.com/apt gcsfuse-bullseye main" | tee /etc/apt/sources.list.d/gcsfuse.list \
#     && curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add - \
#     && apt update && apt install -y gcsfuse

WORKDIR /app

COPY package.json ./
RUN yarn install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1
ENV PAYLOAD_SECRET cascasa8895a4cxc4s84cwasc
ENV MONGODB_URL mongodb+srv://dhanraj:dhanu2020@saptarshee.gi7pexh.mongodb.net/?retryWrites=true&w=majority
ENV NEXT_PUBLIC_SERVER_URL https://saptarshee.in
ENV RAZORPAY_ID rzp_live_CgO7cPvnACYQ4E
ENV RAZORPAY_KEY lToFcTaZj8Es4THS2676BSeO

RUN yarn build

FROM base AS runner
WORKDIR /app

# Create system group and user first
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Ensure the directory structure exists and is writable
RUN mkdir -p /app/dist/product_files \
    && mkdir -p /app/dist/media \
    && chown -R nextjs:nodejs /app

# Set up environment variables
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

ENV PAYLOAD_SECRET cascasa8895a4cxc4s84cwasc
ENV MONGODB_URL mongodb+srv://dhanraj:dhanu2020@saptarshee.gi7pexh.mongodb.net/?retryWrites=true&w=majority
ENV NEXT_PUBLIC_SERVER_URL https://saptarshee.in
ENV RAZORPAY_ID rzp_live_CgO7cPvnACYQ4E
ENV RAZORPAY_KEY lToFcTaZj8Es4THS2676BSeO

COPY --from=builder /app/public ./public
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/build ./build
COPY --from=builder /app/next.config.js ./next.config.js
# COPY --from=builder --chown=nextjs:nodejs /app/media ./dist/media
# COPY --from=builder --chown=nextjs:nodejs /app/product_files ./dist/product_files
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

RUN chmod -R 755 /app/dist/product_files
RUN chmod -R 755 /app/dist/media

# Copy entrypoint script
# COPY entrypoint.sh /entrypoint.sh
# RUN chmod +x /entrypoint.sh

USER nextjs

EXPOSE 3000

ENV PORT 3000

# ENTRYPOINT ["/entrypoint.sh"]
CMD ["yarn", "start"]
