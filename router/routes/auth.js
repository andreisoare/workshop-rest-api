var express = require('express')
  , router = express.Router()
  , passport = require('../../auth')


router.post('/login', function (req, res) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return res.sendStatus(500)
    }
    if (!user) {
      return res.sendStatus(403)
    }
    req.login(user, function(err) {
      if (err) {
        return res.sendStatus(500)
      }
      return res.send({ user: user.toClient() })
    })
  })(req, res)
})


router.get('/logout', function (req, res) {
  req.logout()
  res.sendStatus(200)
})

module.exports = router
