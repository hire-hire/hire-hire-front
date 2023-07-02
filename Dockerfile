FROM node:20-alpine3.16 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build
ENV REACT_APP_API_URL=https://test-hire-hire.proninteam.ru/api/v1/
ENV REACT_APP_BASE_URL=https://test-hire-hire.proninteam.ru
CMD cp -r build result_build