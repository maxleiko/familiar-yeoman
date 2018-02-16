FROM       node:8.9.3-alpine

RUN        mkdir /famster

WORKDIR    /famster

COPY       . /home/node/app/

ENTRYPOINT ["node", "/home/node/app/index.js"]
