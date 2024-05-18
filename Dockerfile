###########################
# ETAPA: DEPENDENCIES     #
###########################
FROM circleci/node:16-browsers AS dependencies
WORKDIR /app

COPY package*.json ./
RUN npm install
# RUN npm cache clean --force

COPY . .
#==============================================================================

###########################
# ETAPA: UNIT TESTS       #
###########################
FROM dependencies AS unit_tests
COPY . ./
RUN npm run test:docker
#==============================================================================

###########################
# ETAPA: BUILD/PACKAGE    #
###########################
FROM unit_tests AS build

RUN npm run build
#==============================================================================

###########################
# ETAPA: APLICACAO        #
###########################
FROM nginx:1.21.1-alpine AS app-spa
ARG NAME
ARG VERSION
LABEL VENDOR=SMSD
LABEL NAME=$NAME
LABEL VERSION=$VERSION
ENV APP_HOME '/usr/share/nginx/html'

ENV PORT 8080
EXPOSE $PORT


COPY --from=build /app/dist/ /usr/share/nginx/html
# Copia os certificados para o contêiner Nginx
COPY certs/ /etc/nginx/certs/
COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
#==============================================================================
