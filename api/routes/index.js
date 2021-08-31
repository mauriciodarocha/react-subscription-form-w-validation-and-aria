var express = require('express');
var session = require('express-session')
var app = express();
app.use(session({ secret: 'qwertyusdfghj', resave: true }))
var router = express.Router();
app.use(router)

/* GET home page. */
app.post('/api/save', (req, res, next) => {
  let result = {
    "status": "success", 
    "message": "Thank you. You are now subscribed." 
  }
  const error_result = { 
    "status": "error", 
    "message": "Invalid Subscription request." 
  }
  const data = req.session && req.session['data'] ? req.session['data'] : []
  var subscribed = data.find((sub) => {
    return sub && sub.email === req.body.email
  })
  if (!subscribed) {
    data.push(req.body)
  } else {
    result = error_result
  }

  if (req.session && !req.session['data']) {
    req.session['data'] = data
  }
  res.json(result)
  res.end();
});

app.get('/api/get-all', (req, res, next) => {
  const result = req.session && req.session['data'] || { 
    "status": "error", 
    "message": "Nothing to retrieve."
  }
  res.json(result)
  res.end()
})

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
  res.status(404).render('404', { title: '404' });
});

module.exports = app;
