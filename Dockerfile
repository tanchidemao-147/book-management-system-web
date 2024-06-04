# 使用 Node.js 镜像作为基础镜像
FROM node:latest as build

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 并安装依赖
COPY package*.json ./
RUN npm install

# 复制源代码并构建 React 应用
COPY . .
RUN npm run build

# 使用 Nginx 镜像作为最终镜像
FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf

# 复制构建后的 React 应用到 Nginx 静态文件目录
COPY --from=build /app/build /usr/share/nginx/html

# 暴露 Nginx 默认端口
EXPOSE 80

# 启动 Nginx 服务
CMD ["nginx", "-g", "daemon off;"]