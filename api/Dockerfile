FROM alpine:3.21.2
RUN apk add --no-cache nodejs npm
WORKDIR /app
COPY package*.json ./
RUN npm install
ENV PORT=
ENV DATABASE_URI=
ENV JWT_SECRET=
ENV JWT_EXPIRE_IN=
ENV SSL_CERT_PATH=
ENV SSL_KEY_PATH=
COPY . .
RUN npm run build
CMD ["node", "dist/main"]