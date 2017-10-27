FROM node:8-alpine

WORKDIR /app
COPY . .

RUN npm install --production

EXPOSE 8000
CMD ["node", "index.js"]