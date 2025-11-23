FROM nginx:stable-alpine

# Copy built files from local dist folder
COPY dist/apps/shell /usr/share/nginx/html
COPY dist/apps/guides /usr/share/nginx/html/guides
COPY dist/apps/hub /usr/share/nginx/html/hub

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

