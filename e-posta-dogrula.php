<?php
    require 'tool.php';
    generatePage([
        'pageTitle' => 'E-Posta Doğrulama',
        'reactScriptFile' => ['emailValidationPage.js', 'emailValidation.js'],
        'styleFile' => 'profile.css'
    ]);
?>