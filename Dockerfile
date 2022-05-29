FROM node:alpine

WORKDIR /home/projects

COPY ./ ./
RUN npm install

CMD ["npm", "start"]