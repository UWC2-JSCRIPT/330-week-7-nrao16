const { Router } = require('express');
const router = Router();
router.use('/landing', require('./landing'))

module.exports = router;