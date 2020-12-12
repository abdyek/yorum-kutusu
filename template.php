<script>
    const firstContent = "<?php echo $content ?>";
    const SITEURL = "<?php echo Config::SITEURL ?>";
</script>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $pageTitle ?></title>
    <link rel="stylesheet" href="http://localhost/yorum-kutusu/public/css/style.css">
    <link rel="stylesheet" href="http://localhost/yorum-kutusu/public/css/loading.css">

    <link rel="stylesheet" href="http://localhost/yorum-kutusu/public/css/comment.css">
    <link rel="stylesheet" href="http://localhost/yorum-kutusu/public/css/filter.css">
    <link rel="stylesheet" href="http://localhost/yorum-kutusu/public/css/new-product.css">
    <link rel="stylesheet" href="http://localhost/yorum-kutusu/public/css/profile.css">
    <link rel="stylesheet" href="http://localhost/yorum-kutusu/public/css/theme.css">

    <!-- her sayfanın css sayfasını ayırmak istiyorum buradaki gibi -->
    <link rel="stylesheet" href="http://localhost/yorum-kutusu/public/css/semantic.min.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/fork-awesome@1.1.7/css/fork-awesome.min.css" integrity="sha256-gsmEoJAws/Kd3CjuOQzLie5Q3yshhvmo7YNtBG7aaEY=" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&family=Work+Sans:wght@500&display=swap" rel="stylesheet">
</head>
<body>
    <div id="root"></div>

    <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>

    <script src="http://localhost/yorum-kutusu/public/script/script.js"></script>

    <!-- React bileşenimizi yükleyin. -->
    <script src="http://localhost/yorum-kutusu/public/js/components.js"></script>

    <script src="http://localhost/yorum-kutusu/public/js/cancelButton.js"></script>
    <script src="http://localhost/yorum-kutusu/public/js/comment.js"></script>
    <script src="http://localhost/yorum-kutusu/public/js/emailValidation.js"></script>
    <script src="http://localhost/yorum-kutusu/public/js/emailValidationPage.js"></script>
    <script src="http://localhost/yorum-kutusu/public/js/filter.js"></script>
    <script src="http://localhost/yorum-kutusu/public/js/index.js"></script>
    <script src="http://localhost/yorum-kutusu/public/js/login.js"></script>
    <script src="http://localhost/yorum-kutusu/public/js/newProduct.js"></script>
    <script src="http://localhost/yorum-kutusu/public/js/pageNavigation.js"></script>
    <script src="http://localhost/yorum-kutusu/public/js/product.js"></script>
    <script src="http://localhost/yorum-kutusu/public/js/profile.js"></script>
    <script src="http://localhost/yorum-kutusu/public/js/signup.js"></script>
    <script src="http://localhost/yorum-kutusu/public/js/tag.js"></script>
    <script src="http://localhost/yorum-kutusu/public/js/app.js"></script>

</body>
</html>
<?php // sayfa yükleme sayıları buradan artırılacak ancak api içerisindekine erişimi buradan erişim biraz sıkıntı çıkaracağı için bu kısmı şimdilik bırakıyorum ?>
