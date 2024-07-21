FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PAYLOAD_SECRET cascasa8895a4cxc4s84cwasc
ENV MONGODB_URL mongodb+srv://dhanraj:dhanu2020@saptarshee.gi7pexh.mongodb.net/?retryWrites=true&w=majority
ENV NEXT_PUBLIC_SERVER_URL http://shabdashivar.in
ENV RAZORPAY_ID rzp_live_CgO7cPvnACYQ4E
ENV RAZORPAY_KEY lToFcTaZj8Es4THS2676BSeO

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]