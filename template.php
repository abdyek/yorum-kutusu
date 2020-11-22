<script>
    let firstContent = "<?php echo $content ?>";
    const SITEURL = "<?php echo Config::SITEURL ?>";
</script>
<!DOCTYPE html>
<html lang="tr">
<head>
    <base href="<?php echo Config::SITEURL ?>" >
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $pageTitle ?></title>
    <link rel="stylesheet" href="public/css/style.css">
    <link rel="stylesheet" href="public/css/loading.css">

    <link rel="stylesheet" href="public/css/comment.css">
    <link rel="stylesheet" href="public/css/filter.css">
    <link rel="stylesheet" href="public/css/new-product.css">
    <link rel="stylesheet" href="public/css/profile.css">
    <link rel="stylesheet" href="public/css/theme.css">

    <!-- her sayfanın css sayfasını ayırmak istiyorum buradaki gibi -->
    <link rel="stylesheet" href="public/css/semantic.min.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/fork-awesome@1.1.7/css/fork-awesome.min.css" integrity="sha256-gsmEoJAws/Kd3CjuOQzLie5Q3yshhvmo7YNtBG7aaEY=" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&family=Work+Sans:wght@500&display=swap" rel="stylesheet">
</head>
<body>
    <div id="root"></div>

    <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>

    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="public/script/semantic.min.js"></script>
    <script src="public/script/script.js"></script>

    <!-- React bileşenimizi yükleyin. -->
    <script src="public/js/components.js"></script>

    <script src="public/js/cancelButton.js"></script>
    <script src="public/js/comment.js"></script>
    <script src="public/js/emailValidation.js"></script>
    <script src="public/js/emailValidationPage.js"></script>
    <script src="public/js/filter.js"></script>
    <script src="public/js/index.js"></script>
    <script src="public/js/login.js"></script>
    <script src="public/js/newProduct.js"></script>
    <script src="public/js/pageNavigation.js"></script>
    <script src="public/js/product.js"></script>
    <script src="public/js/profile.js"></script>
    <script src="public/js/signup.js"></script>
    <script src="public/js/tag.js"></script>
    <script src="public/js/app.js"></script>

</body>
</html>
<?php // sayfa yükleme sayıları buradan artırılacak ancak api içerisindekine erişimi buradan erişim biraz sıkıntı çıkaracağı için bu kısmı şimdilik bırakıyorum ?>
