<?php

namespace YorumKutusu\View\Php;
use YorumKutusu\Api\Config\Config;
use YorumKutusu\View\Php\Template;

class Tool {
    public static function generatePage($pageName) {
        $pageTitle = Config::PAGEURL[$pageName]['title'];
        $content = Config::PAGEURL[$pageName]['content'];
        $path = __DIR__ . '/Template.php';
        include $path;
    }
}

?>
