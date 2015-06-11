#!/bin/bash

composer install
mysql -uroot -e "create database empdb;"
php artisan migrate
php artisan db:seed