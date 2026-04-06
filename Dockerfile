# Étape 1 : Build de l'application
FROM node:18-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Étape 2 : Serveur de production (Nginx)
FROM nginx:stable-alpine as production-stage
# On copie la config Nginx pour gérer le routage (indispensable pour Vue Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf
# On copie les fichiers compilés par Vue (dossier /dist)
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]