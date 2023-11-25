FROM node:21-alpine

WORKDIR /react-guestbook/

COPY public/ /react-guestbook/public
COPY src/ /react-guestbook/src
COPY package.json /react-guestbook/
COPY entrydb.json /react-guestbook/

RUN npm install

RUN if ! which json-server > /dev/null 2>&1 ; then npm install -g json-server ; fi

CMD ["sh", "-c", " npm start & json-server --watch entrydb.json --host 0.0.0.0 --port 3004"]
