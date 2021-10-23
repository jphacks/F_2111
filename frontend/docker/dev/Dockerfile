FROM node:16

WORKDIR /workdir

COPY package.json .
COPY package-lock.json .
RUN npm install

EXPOSE 3000
CMD ["npm", "run", "dev"]
