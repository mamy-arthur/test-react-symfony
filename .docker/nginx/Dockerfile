FROM nginx
EXPOSE 80

WORKDIR /home/wwwroot/dilypse

CMD if [ $APP_ENV = 'prod' ]; \
then \
    cp /home/wwwroot/dilypse/env/nginx.prod.conf /etc/nginx/nginx.conf; \
else \
    cp /home/wwwroot/dilypse/env/nginx.dev.conf /etc/nginx/nginx.conf; \
fi;nginx -g 'daemon off;';