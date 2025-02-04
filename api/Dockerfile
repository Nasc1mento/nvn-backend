# https://docs.nestjs.com/deployment#dockerizing-your-application
FROM node:20
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
ENV PORT=3000
ENV DATABASE_URL=mongodb://localhost:27017/tadw
ENV JWT_SECRET=secret
ENV JWT_EXPIRE_IN=1d
ENV BCRYPT_SALT=10
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["node", "dist/main"]