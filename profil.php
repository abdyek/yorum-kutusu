<?php
    require 'tool.php';
    generatePage([
        'pageTitle' => 'Profil',
        'reactScriptFile' => ['profile.js', 'comment.js', 'tag.js', 'emailValidation.js', 'cancelButton.js'],
        'styleFile' => 'profile.css'
    ]);
?>