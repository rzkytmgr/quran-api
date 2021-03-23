# pull nodejs v14.16.0
FROM node:14.16.0-alpine3.10

# change workdir to /app
WORKDIR /app

# copying package.json to /app
COPY package.json /app

# running npm install in container
RUN npm install

# copying all of file in this folder to /app in container
COPY . /app 

# running npm start command in container
CMD ["npm", "start"]