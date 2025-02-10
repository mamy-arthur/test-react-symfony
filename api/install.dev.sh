export APP_DEBUG=1 && composer install && \
php bin/console lexik:jwt:generate-keypair --skip-if-exists && \
php bin/console doctrine:mongodb:fixtures:load && \
php bin/console cache:clear;