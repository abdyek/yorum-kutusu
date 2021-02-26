<?php

//require 'config.php';
//require 'tool.php';
require 'vendor/autoload.php';

use YorumKutusu\View\Php\Tool;

date_default_timezone_set('Europe/Istanbul');
// bunu nereye yerleştiricem bilmiyorum, şimdilik burada dursun

$router = new Buki\Router();

$router->get('/', function() {
    Tool::generatePage('ana-sayfa');
});

$router->get('/urun/:any/:slug?/:slug?', function($productURL) {
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

$router->get('/urun-duzenle/:slug', function() {
    Tool::generatePage('urun-duzenle');
});

// API REQUEST
$router->any('/api/:string', function($endpoint) {
    $class = 'YorumKutusu\Api\Controller\\' .ucfirst($endpoint);
    new $class;
});

// Test
$router->get('/test/api', function() {
    $main = new YorumKutusu\Test\Main();
});

$router->run();
