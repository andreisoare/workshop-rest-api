var express = require('express')
  , router = express.Router()
  , conn = require('../../db')
  , ensureAuthentication = require('../../middleware/ensureAuthentication')


router.get('/', ensureAuthentication, function(req, res) {
  var Tweet = conn.model('Tweet')
    , stream = req.query.stream
    , userId = req.query.userId
    , options = { sort: { created: -1 } }
    , query = null


  if (stream === 'home_timeline') {
    query = { userId: { $in: req.user.followingIds }}
  } else if (stream === 'profile_timeline' && userId) {
    query = { userId: userId }
  } else {
    return res.sendStatus(400)
  }

  Tweet.find(query, null, options, function(err, tweets) {
    if (err) {
      return res.sendStatus(500)
    }
    var responseTweets = tweets.map(function(tweet) { return tweet.toClient() })
    res.send({ tweets: responseTweets })
  })
})


router.get('/:tweetId', function(req, res) {
  console.log('env:', process.env.NODE_ENV)
  var Tweet = conn.model('Tweet')

  Tweet.findById(req.params.tweetId, function(err, tweet) {
    if (err) {
      return res.sendStatus(500)
    }
    if (!tweet) {
      return res.sendStatus(404)
    }
    res.send({ tweet: tweet.toClient() })
  })
})

router.delete('/:tweetId', ensureAuthentication, function(req, res) {
  var Tweet = conn.model('Tweet')
    , tweetId = req.params.tweetId

  if (!ObjectId.isValid(tweetId)) {
    return res.sendStatus(400)
  }

  Tweet.findById(tweetId, function(err, tweet) {
    if (err) {
      return res.sendStatus(500)
    }

    if (!tweet) {
      return res.sendStatus(404)
    }

    if (tweet.userId !== req.user.id) {
      return res.sendStatus(403)
    }

    Tweet.findByIdAndRemove(tweet._id, function(err) {
      if (err) {
        return res.sendStatus(500)
      }
      res.sendStatus(200)
    })
  })

})


router.post('/', ensureAuthentication, function(req, res) {
  var Tweet = conn.model('Tweet')
    , tweetData = req.body.tweet

  tweetData.created = Date.now() / 1000 | 0
  tweetData.userId = req.user.id

  Tweet.create(tweetData, function(err, tweet) {
    if (err) {
      return res.sendStatus(500)
    }
    res.send({ tweet: tweet.toClient() })
  })

})


module.exports = router
