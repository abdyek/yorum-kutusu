<!DOCTYPE html>
<html lang="tr">
<head>
    <base href="<?php echo $siteUrl ?>" >
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $pageInfo['pageTitle'];?></title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/loading.css">
    <?php
        if(is_array($pageInfo['styleFile'])) {
            foreach ($pageInfo['styleFile'] as $styleFile) {
                echo '<link rel="stylesheet" href="css/'.$styleFile.'">';
            }
        } else {
            echo '<link rel="stylesheet" href="css/'.$pageInfo['styleFile'].'">';
        }
    ?>
    <!-- her sayfanın css sayfasını ayırmak istiyorum buradaki gibi -->
    <link rel="stylesheet" href="css/semantic.min.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/fork-awesome@1.1.7/css/fork-awesome.min.css" integrity="sha256-gsmEoJAws/Kd3CjuOQzLie5Q3yshhvmo7YNtBG7aaEY=" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&family=Work+Sans:wght@500&display=swap" rel="stylesheet">
</head>
<body>
    <div id="root"></div>

    <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>

    <script src="https://code.jquery.com/jquery-3.5.0.min.js" integrity="sha256-xNzN2a4ltkB44Mc/Jz3pT4iU1cmeR0FkXs4pru/JxaQ=" crossorigin="anonymous"></script>
    <script src="script/semantic.min.js"></script>

    <!-- React bileşenimizi yükleyin. -->
    <script src="js/components.js"></script>
    <?php
        if(is_array($pageInfo['reactScriptFile'])) {
            foreach ($pageInfo['reactScriptFile'] as $scriptFile) {
                echo '<script src="js/'.$scriptFile.'"></script> ';
            }
        } else {
            echo '<script src="js/'.$pageInfo['reactScriptFile'].'"></script>';
        }
    ?>
    <script src="js/app.js"></script>

</body>
</html>