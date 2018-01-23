FROM       node:8.9.3-alpine

COPY       . /home/node/app/

ENTRYPOINT ["node", "/home/node/app/index.js"]
CMD ["all"]
