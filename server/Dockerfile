FROM node:alpine

WORKDIR '/usr/app'

COPY ./package.json ./

RUN npm install

COPY ./ ./

# The start command is tied to the script in package.json
CMD ["npm", "run", "start"]