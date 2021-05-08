<?php
    namespace YorumKutusu\View\Php;
    use YorumKutusu\Api\Config\Config;
?>
<!DOCTYPE html>
<script>
    const firstContent = "<?php echo $content ?>";
    const SITEURL = "<?php echo Config::SITEURL ?>";
</script>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $pageTitle ?></title>
    <link rel="stylesheet" href="<?php echo Config::SITEURL ?>public/css/style.css">
    <link rel="stylesheet" href="<?php echo Config::SITEURL ?>public/css/loading.css">
    <link rel="stylesheet" href="<?php echo Config::SITEURL ?>public/css/semantic.min.css" />
    <link rel="stylesheet" href="<?php echo Config::SITEURL ?>public/css/theme.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/fork-awesome@1.1.7/css/fork-awesome.min.css" integrity="sha256-gsmEoJAws/Kd3CjuOQzLie5Q3yshhvmo7YNtBG7aaEY=" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&family=Work+Sans:wght@500&display=swap" rel="stylesheet">
</head>
<body>
    <div id="root"></div>

    <script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>

    <script src="<?php echo Config::SITEURL ?>public/script/script.js"></script>

    <!-- React bileşenimizi yükleyin. -->
    <script src="<?php echo Config::SITEURL ?>public/js/components.js"></script>
    <script src="<?php echo Config::SITEURL ?>public/js/cancelButton.js"></script>
    <script src="<?php echo Config::SITEURL ?>public/js/comment.js"></script>
    <script src="<?php echo Config::SITEURL ?>public/js/emailValidation.js"></script>
    <script src="<?php echo Config::SITEURL ?>public/js/emailValidationPage.js"></script>
    <script src="<?php echo Config::SITEURL ?>public/js/filter.js"></script>
    <script src="<?php echo Config::SITEURL ?>public/js/index.js"></script>
    <script src="<?php echo Config::SITEURL ?>public/js/login.js"></script>
    <script src="<?php echo Config::SITEURL ?>public/js/newProduct.js"></script>
    <script src="<?php echo Config::SITEURL ?>public/js/pageNavigation.js"></script>
    <script src="<?php echo Config::SITEURL ?>public/js/product.js"></script>
    <script src="<?php echo Config::SITEURL ?>public/js/profile.js"></script>
    <script src="<?php echo Config::SITEURL ?>public/js/signup.js"></script>
    <script src="<?php echo Config::SITEURL ?>public/js/tag.js"></script>
    <script src="<?php echo Config::SITEURL ?>public/js/editProduct.js"></script>
    <script src="<?php echo Config::SITEURL ?>public/js/forgotMyPassword.js"></script>
    <script src="<?php echo Config::SITEURL ?>public/js/app.js"></script>

</body>
</html>
<?php // sayfa yükleme sayıları buradan artırılacak ancak api içerisindekine erişimi buradan erişim biraz sıkıntı çıkaracağı için bu kısmı şimdilik bırakıyorum ?>
