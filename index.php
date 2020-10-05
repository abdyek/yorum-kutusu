<?php

require 'config.php';
require 'tool.php';
require 'vendor/autoload.php';

$router = new Buki\Router();

$router->get('/', function() {
    Tool::generatePage('ana-sayfa');
});

$router->get('/urun/:slug/:slug?/:slug?', function($productURL) {
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

// API REQUEST
$router->any('/api/:string', function($endpoint) {
    require 'api/require.php';
    require './api/endpoints/'.$endpoint.'.php';
    $class = ucfirst($endpoint);
    new $class;
});

// deneme
$router->get('/deneme', function(){
    require 'deneme.php';
});


$router->run();