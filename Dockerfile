# Stage 1: Build
FROM oven/bun:latest AS build

WORKDIR /app

COPY . .

RUN bun install --frozen-lockfile
RUN bun run build

# Stage 2: Runtime
FROM nginx:alpine AS serve

COPY --from=build /app/dist /usr/share/nginx/html

RUN chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /usr/share/nginx/html
RUN find /usr/share/nginx/html -type f -exec chmod 644 {} \;
RUN find /usr/share/nginx/html -type d -exec chmod 755 {} \;

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Start the application
CMD ["nginx", "-g", "daemon off;"]
