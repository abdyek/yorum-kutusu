<?php if(isset($_SESSION["username"])): // php ile react'ı birleştirmek bana böyle çözümler üretmeye zorladı ?>
    <script>
        <?php echo "const username='".$_SESSION["username"]."'"; ?>
    </script>
<?php else: ?>
    <script>
        <?php echo "const username=undefined"; ?>
    </script>
<?php endif; ?>