chown -R 1000:1000 . &&\
composer install && \
php bin/console --env=dev cache:clear && \
php bin/console --env=dev -n lexik:jwt:generate-keypair --skip-if-exists && \
php bin/console --env=dev -n doctrine:mongodb:fixtures:load --append; \
export APP_DEBUG=0 && composer dump-env $APP_ENV && \
composer install --no-dev --optimize-autoloader && \
php bin/console cache:clear && \
chmod 777 -R var/;