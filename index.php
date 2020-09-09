<?php

require 'config.php';
require 'tool.php';
require 'session.php';
require 'vendor/autoload.php';

$router = new Buki\Router();

$router->get('/', function() {
    return 'Hello World!';
});

$router->get('/urun/:string', function($productURL) {
    Tool::generatePage('urun');
});

$router->get('/profil/:string', function($profileID) {
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

$router->get('/filtrele', function() {
    Tool::generatePage('filtrele');
});

$router->run();