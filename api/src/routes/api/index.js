const router = require('express').Router();

router.use('/', require('./users'));
router.use('/profiles', require('./profiles'));
router.use('/tracks', require('./tracks'));
router.use('/tags', require('./tags'));
router.use('/accounts', require('../../accounts/accounts.controller'));
router.use('/stats', require('./stats'));
router.use('/info', require('./info'));

router.use(function (err, req, res, next) {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function (errors, key) {
        errors[key] = err.errors[key].message;

        return errors;
      }, {}),
    });
  }

  return next(err);
});

module.exports = router;
