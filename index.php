<?php

if (empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] === "off") {
    $location = 'https://www.' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
    header('HTTP/1.1 301 Moved Permanently');
    header('Location: ' . $location);
    exit;
}

require 'vendor/autoload.php';

use YorumKutusu\View\Php\Tool;
use Buki\Router\Router;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

date_default_timezone_set('Europe/Istanbul');
// bunu nereye yerleştiricem bilmiyorum, şimdilik burada dursun

$router = new Router;

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

$router->get('/e-posta-dogrula/:any?', function() {
    Tool::generatePage('e-posta-dogrula');
});

/* $router->get('/filtrele/:any?', function() {
    Tool::generatePage('filtrele');
}); */

$router->get('/urun-duzenle/:slug', function() {
    Tool::generatePage('urun-duzenle');
});

$router->get('/parolami-unuttum', function() {
    Tool::generatePage('parolami-unuttum');
});

// API REQUEST
$router->any('/api/:string', function($controller) {
    $controllerClassName = ucfirst($controller);
    $path = __DIR__ . '/src/Api/Controller/'.$controllerClassName.'.php';
    if(!file_exists($path)) {
        http_response_code(404);
        exit();
    }
    $class = 'YorumKutusu\Api\Controller\\' .$controllerClassName;
    new $class;
});

// Test
/* $router->get('/test/api', function() {
    $main = new YorumKutusu\Test\Main();
}); */

// Admin
$router->get('/yonet', function() {
    Tool::generateAdminPage();
});

$router->run();
