var express = require('express');
var router = express.Router();

const HOME_BANNER = require('../../controllers/admin/HomeBanner');

router.post('/home-banner', HOME_BANNER.createBanner);
router.get('/home-banner/:id', HOME_BANNER.getBannerById);

module.exports = router;