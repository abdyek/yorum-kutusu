<?php
    require 'tool.php';
    generatePage([
        'pageTitle' => 'Profil',
        'reactScriptFile' => ['profile.js', 'comment.js', 'tag.js'],
        'styleFile' => 'profile.css'
    ]);
?>