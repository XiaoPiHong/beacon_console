# 第 1 阶段：构建
FROM node:18 as build-stage

WORKDIR /app
COPY . .

RUN npm config set registry https://registry.npmmirror.com
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm run build:prod

# 第 2 阶段：配置 nginx 和发布
FROM nginx:latest

COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf