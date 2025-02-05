FROM alpine:3.21.2
RUN apk add --no-cache nodejs npm
WORKDIR /app
COPY package*.json ./
RUN npm install
ENV PORT=
ENV DATABASE_URI=
ENV JWT_SECRET=
ENV JWT_EXPIRE_IN=
ENV BCRYPT_SALT=
COPY . .
RUN npm run build
CMD ["node", "dist/main"]