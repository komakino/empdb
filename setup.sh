#!/bin/bash

cd /var/www
composer install
mysql -uroot -proot -e "create database empdb;"
php artisan migrate
php artisan db:seed