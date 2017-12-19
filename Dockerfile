FROM node:8.9.3-alpine

COPY . /home/node/app/

CMD ["node", "/home/node/app/index.js"]
