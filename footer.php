<div class="row" style="margin-top: 30px">
    <div class="col-md-6">
            <span>
                <img src="img/iihr_logo-trans.png" height="30px">
            </span>
            <span style="margin-left: 20px">
                <img src="img/logo-iowa.png" height="30px">
            </span>
        <div class="row col-md-12"><p style="margin-top: 10px">&copy; 2016 IIHR | All Rights Reserved | <a href="termsofuse.php">Terms of Use</a></p></div>
    </div>
    <div class="col-md-6" style="text-align: right"><img src="img/partners.png" width="350px"></div>
</div>

</div> <!-- /container -->

<!-- Bootstrap core JavaScript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<script src="js/bootstrap.min.js"></script>
<script src="js/ie10-viewport-bug-workaround.js"></script>
<script>
    $('.coming-soon').hover(
        function() {
            var $this = $(this); // caching $(this)
            $this.data('initialText', $this.text());
            $this.text("Coming Soon");
        },
        function() {
            var $this = $(this); // caching $(this)
            $this.text($this.data('initialText'));
        }
    );
</script>
</body>
</html>