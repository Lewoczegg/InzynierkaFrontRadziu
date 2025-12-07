FROM node:20-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --legacy-peer-deps
RUN npm install @monaco-editor/react @chakra-ui/react @emotion/react @emotion/styled framer-motion --force
COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
