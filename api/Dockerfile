FROM alpine:3.21.2 as builder
RUN apk add npm
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM alpine:3.21.2
WORKDIR /app
RUN apk add nodejs
COPY --from=builder app/dist .
EXPOSE 80
CMD ["node", "dist/main"]