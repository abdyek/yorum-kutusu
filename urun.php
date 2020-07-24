<?php
    require 'tool.php';
    generatePage([
        'pageTitle' => 'Ürün Sayfası',
        'reactScriptFile' => ['product.js', 'comment.js', 'tag.js'],
        'styleFile' => 'product.css'
    ]);
?>