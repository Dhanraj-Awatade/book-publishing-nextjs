FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
# COPY media ./
# COPY product_files ./
RUN yarn install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
# COPY --from=deps /app/media ./media
# COPY --from=deps /app/product_files ./product_files
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

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

ENV PAYLOAD_SECRET cascasa8895a4cxc4s84cwasc
ENV MONGODB_URL mongodb+srv://dhanraj:dhanu2020@saptarshee.gi7pexh.mongodb.net/?retryWrites=true&w=majority
ENV NEXT_PUBLIC_SERVER_URL https://saptarshee.in
ENV RAZORPAY_ID rzp_live_CgO7cPvnACYQ4E
ENV RAZORPAY_KEY lToFcTaZj8Es4THS2676BSeO

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/build ./build
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder --chown=nextjs:nodejs /app/media ./dist/media
COPY --from=builder --chown=nextjs:nodejs /app/product_files ./dist/product_files
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["yarn", "start"]