var express = require('express');
var router = express.Router();

const HOME_BANNER = require('../../controllers/admin/HomeBanner');

router.post('/home-banner', HOME_BANNER.create);

module.exports = router;