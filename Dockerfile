FROM node:18.14.2 as build

WORKDIR /pomodoro-timer

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

RUN rm -rf /etc/nginx/conf.d

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /pomodoro-timer/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
