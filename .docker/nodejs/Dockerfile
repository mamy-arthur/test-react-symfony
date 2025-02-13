FROM node:20

ARG NODE_ENV

WORKDIR /app

EXPOSE 3000

CMD if [ $NODE_ENV = 'prod' ]; \
then \
   yarn; yarn build; yarn dev;\
else \
    yarn; yarn dev; \
fi;
