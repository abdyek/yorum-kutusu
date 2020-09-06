<?php

require 'tool.php';
require 'vendor/autoload.php';

$router = new Buki\Router();

$router->get('/', function() {
    return 'Hello World!';
});

$router->get('/urun/:string', function($productURL) {
    generatePage([
        'pageTitle' => 'Ürün Sayfası',
        'reactScriptFile' => ['product.js', 'comment.js', 'tag.js', 'pageNavigation.js', 'cancelButton.js'],
        'styleFile' => 'comment.css'
    ]);
});

$router->get('/profil/:string', function($profileID) {
    generatePage([
        'pageTitle' => 'Profil',
        'reactScriptFile' => ['profile.js', 'comment.js', 'tag.js', 'emailValidation.js', 'cancelButton.js'],
        'styleFile' => 'profile.css'
    ]);
});

$router->get('/yeni-urun', function(){
    generatePage([
        'pageTitle' => 'Yeni Ürün Oluştur',
        'reactScriptFile' => ['newProduct.js', 'tag.js', 'comment.js', 'cancelButton.js'],
        'styleFile' => ['new-product.css', 'comment.css']
    ]);
});

$router->get('/uye-ol', function() {
    generatePage([
        'pageTitle' => 'Üye Ol',
        'reactScriptFile' => 'signup.js',
        'styleFile' => ''
    ]);
});

$router->get('/giris-yap', function() {
    generatePage([
        'pageTitle' => 'Giriş Yap',
        'reactScriptFile' => 'login.js',
        'styleFile' => ''
    ]);
});

$router->get('/e-posta-dogrula', function() {
    generatePage([
        'pageTitle' => 'E-Posta Doğrulama',
        'reactScriptFile' => ['emailValidationPage.js', 'emailValidation.js'],
        'styleFile' => ''
    ]);
});

$router->get('/filtrele', function() {
    generatePage([
        'pageTitle' => 'Kategori',
        'reactScriptFile' => ['filter.js'],
        'styleFile' => 'filter.css'
    ]);
});

$router->run();