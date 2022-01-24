FROM node:17
ENV NODE_ENV=production

WORKDIR /usr/app
COPY ./ /usr/app

RUN npm install --production
EXPOSE 3000
CMD ["node", "index.js"]