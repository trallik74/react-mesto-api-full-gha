const router = require('express').Router();
const { errors } = require('celebrate');
const { createUser, loginUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const errorHandler = require('../middlewares/error-handler');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { valiateCreateUser, validateLoginUser } = require('../middlewares/validateRequest');
const { requestLogger, errorLogger } = require('../middlewares/logger');
const NotFoundError = require('../exeptions/not-found-error');

router.use(requestLogger);
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
router.post('/signin', validateLoginUser, loginUser);
router.post('/signup', valiateCreateUser, createUser);
router.use(auth);
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('*', (req, res, next) => next(new NotFoundError('Запрашиваемый ресурс не найден')));

router.use(errorLogger);

router.use(errors());
router.use(errorHandler);

module.exports = router;
