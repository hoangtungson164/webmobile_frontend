FROM node:12.9.1-buster-slim

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@7.3.9

# add app
COPY . . /app/

# start app
CMD ng serve --ssl --ssl-cert sslcert/cert.pem --ssl-key sslcert/key.pem --host 0.0.0.0
