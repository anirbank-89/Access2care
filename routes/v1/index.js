var express = require('express');
var router = express.Router();

/** GET home page */
router.get('/', (req, res, next) => {
    res.send({ status: false });
});

const ADMIN = require('../../controllers/auth/Admin');

const middleware  = require('../../service/middleware').middleware;

const AdminRoute = require('./admin');

/**====================== without login url ====================== */
router.post('/admin/register', ADMIN.register);
router.post('/admin/login', ADMIN.login);
/**==================== without login url end =====================*/

router.use(middleware);




router.use('/admin', AdminRoute);

module.exports = router;