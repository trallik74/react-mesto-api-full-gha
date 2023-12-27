const allowedCors = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://trallik-mesto.nomoredomainsmonster.ru',
  'https://trallik-mesto.nomoredomainsmonster.ru',
  'http://158.160.135.22',
  'https://158.160.135.22',
];

const cors = (req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    return res.end();
  }

  return next();
};

module.exports = { cors };
