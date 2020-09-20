<?php

require 'config.php';
require 'tool.php';
require 'session.php';
require 'vendor/autoload.php';

$router = new Buki\Router();

$router->get('/', function() {
    Tool::generatePage('ana-sayfa');
});

$router->get('/urun/:slug', function($productURL) {
    Tool::generatePage('urun');
});

$router->get('/profil/:slug/:slug?', function($profileID) {
    Tool::generatePage('profil');
});

$router->get('/yeni-urun', function(){
    Tool::generatePage('yeni-urun');
});

$router->get('/uye-ol', function() {
    Tool::generatePage('uye-ol');
});

$router->get('/giris-yap', function() {
    Tool::generatePage('giris-yap');
});

$router->get('/e-posta-dogrula', function() {
    Tool::generatePage('e-posta-dogrula');
});

$router->get('/filtrele/:any?', function() {
    Tool::generatePage('filtrele');
});

$router->run();