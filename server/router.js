
const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { seesion: false});

module.exports = function(app) {
     /* ---TEST FILE ...
  app.get('/', function(req, res, next) {
    // call function 'get' on app -
    // (get maps directly to type of http request issued that we want to handle)

    res.send(['coffee', 'chair', 'computer'])
    });
    ----END TEST FUNCTIONLE*/
  app.get('/', requireAuth, function(req, res) {
    res.send({ hi: 'there' })
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
}
