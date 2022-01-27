FROM node:16 AS build-env
ENV NODE_ENV=production

WORKDIR /usr/app
COPY ./ /usr/app

RUN npm install --production

FROM gcr.io/distroless/nodejs:16
COPY --from=build-env /usr/app /usr/app
WORKDIR /usr/app
EXPOSE 3000
CMD ["node", "index.js"]