var todoss = require('./models/todo');
var getNavigatorCoords =  require('geo-loc-utils');
var geolocation = require('geolocation')
 /*global.navigator = {
  userAgent: 'node.js'
};
console.log("geolocation.getCurrentPosition");
geolocation.getCurrentPosition(function(pos){
	console.error(pos)
});
*/

/*geolocation.getCurrentPosition(function (err, position) {
  if (err) throw err;
  console.error("getNavieeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
  console.log(position)
})*/
/*console.error("getNavieeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
console.error(getNavigatorCoords.getNavigatorCoords())
getNavigatorCoords.getNavigatorCoords()
.then(function(position){
	console.log("positionnnnnnnnnnnnnnnnnnnnnnnnn" + position);
}),function(data){
	console.log("22222222222222222222222222" + data)
};*/
console.error("sssssssssssssssssssssssssss" + todoss.Todo1);
console.error("aaaaaaaaaaaaaaaaaaaaaaaaa" + todoss.user);
var Todo = todoss.Todo1;
var User = todoss.user;
function getTodos(res) {
    Todo.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
};

function getUsers(res){
	 User.find(function (err, todos) {

	        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
	        if (err) {
	            res.send(err);
	        }

	        res.json(todos); // return all todos in JSON format
	    });
}

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
        getTodos(res);
    });

    // create t`odo and send back all todos after creation
    app.post('/api/todos', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
    	console.error("reqqqqqqqqqqqqqqqqqqqqqqqqqq11111111111111");
        console.error(req);
        Todo.create({
            name: req.body.name,
            email: req.body.email,
            webaddress: req.body.webaddress,
            cover: req.body.cover,
            workingFlag: req.body.workingFlag,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTodos(res);
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
    
    app.post('/', function(req, res) {
    	console.error("chhhddddddddddddddddddd");
    	//console.error(req);
    	console.error(req.body.type);
    	console.error(req.body.email);
        var email = req.body.email;

        // register button was clicked
        if (req.body.type === 'register') {
            var pw = req.body.pw;
            var newUser = new User({
                email: email,
                pw: pw
            });
            console.error("emailllll",req.body.email);
            console.error("passsssss",req.body.pw);
            nev.createTempUser(newUser, function(err, existingPersistentUser, newTempUser) {
                if (err) {
                    return res.status(404).send('ERROR: creating temp user FAILED');
                }
                console.error("existingPersistentUserrrrrrrrrrr");
                console.error(existingPersistentUser);
                console.error("newTempUserrrrrrrrrrrrrrrr");
                console.error(newTempUser);
                // user already exists in persistent collection
                if (existingPersistentUser) {
                    return res.json({
                        msg: 'You have already signed up and confirmed your account. Did you forget your password?'
                    });
                }

                // new user created
                if (newTempUser) {
                	console.error("ssssssssssssssss" + nev.options.URLFieldName)
                    var URL = newTempUser[nev.options.URLFieldName];
                    console.error("URLlllllllllll" + URL);
                    console.error("emailllllllllllll" + email)
                    nev.sendVerificationEmail(email, URL, function(err, info) {
                        if (err) {
                            return res.status(404).send('ERROR: sending verification email FAILED');
                        }
                        res.json({
                            msg: 'An email has been sent to you. Please check it to verify your account.',
                            info: info
                        });
                    });

                    // user already exists in temporary collection!
                } else {
                    res.json({
                        msg: 'You have already signed up. Please check your email to verify your account.'
                    });
                }
            });

            // resend verification button was clicked
        } else {
            nev.resendVerificationEmail(email, function(err, userFound) {
                if (err) {
                    return res.status(404).send('ERROR: resending verification email FAILED');
                }
                if (userFound) {
                    res.json({
                        msg: 'An email has been sent to you, yet again. Please check it to verify your account.'
                    });
                } else {
                    res.json({
                        msg: 'Your verification code has expired. Please sign up again.'
                    });
                }
            });
        }
    });
    
    app.post('/register', function(req, res) {
    	console.error(" in register");
    	console.error("reqqqqqqqqqqqqqqqqqqqqqqqqqq11111111111111");
        console.error(req.body);
        User.findOne(
                { email : req.body.email },
                function (err, user) {
                    if (err) res.send(err);

                    if (user) {
                        // username already exists
                        res.send("Username " + user.email + " is already taken");
                    } else {
                    	console.error("in else blockkkkkk")
                    	console.error(req.body)
                    	User.create({
                            email: req.body.email,
                            pw: req.body.pw,
                            fName : req.body.fName,
                            lName : req.body.lName,
                            timeStamp : req.body.timeStamp,
                            ip : req.socket.remoteAddress,
                            location : req.body.location,
                            done: false
                        }, function (err, todo) {
                            if (err)
                                res.send(err);

                            // get and return all the todos after you create another
                            res.send(todo);
                        });
                    }
                });
        
    });
    
    app.post('/login',function(req,res){
    	console.error("in loginnnnnnnnnnnnnn");
    	console.error(req.clientIp);
    	console.error(req.body.pw);
    	User.findOne(
                { email : req.body.email, pw : req.body.pw },
                function (err, user) {
                    if (err) res.send(err);

                    if(user) {
                        // username already exists
                        res.send(user);
                    }else {
                    	res.send("Login Failed");
                    }
                });
    });
    
    app.get('/email-verification/:URL', function(req, res) {
        var url = req.params.URL;

        nev.confirmTempUser(url, function(err, user) {
            if (user) {
                nev.sendConfirmationEmail(user.email, function(err, info) {
                    if (err) {
                        return res.status(404).send('ERROR: sending confirmation email FAILED');
                    }
                    res.json({
                        msg: 'CONFIRMED!',
                        info: info
                    });
                });
            } else {
                return res.status(404).send('ERROR: confirming temp user FAILED');
            }
        });
    });
    
};