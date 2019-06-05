const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');     // Log all HTTP requests to the console
require('dotenv').config()
const path = require('path');
const app = express();
const checkJwt = require('express-jwt');    // Check for access tokens automatically
const bcrypt = require('bcrypt');           // Used for hashing passwords!
var mongoose = require('mongoose')
app.use(express.static(path.join(__dirname, '../build')));
app.use(bodyParser.json());                 // Make sure all json data is parsed

/****** Configuration *****/
const port = (process.env.PORT || 9090);
console.log(process.env.JWT_SECRET)
if (!process.env.JWT_SECRET) {
    console.error('You need to put a secret in the JWT_SECRET env variable!');
    process.exit(1);
}

app.use(morgan('combined')); // Log all requests to the console


/****** Database *****/
var mongoose = require('mongoose');


// Online DB// Local DB
mongoose.connect(process.env.dbUrl, (err) => {
    console.log('MongoDB Connection Status: ', err)
})

//mongoose.connect('mongodb+srv://admin:kenneth1992@cluster0-f3idh.mongodb.net/Eksamen19?retryWrites=true');

// Open Paths - Har ikke brug for login for at tilgå dem
let openPaths = [
    '/api/users/authenticate',
    '/api/users/create',
    '/api/jobs',
    '/api/newArea',
    '/api/newJob',
    '/api/newCategory',
    '/api/areas',
    '/api/category',
    '/admin', 
    '/jobs'
];

/****** Validate the user using authentication ******/
app.use(
    checkJwt({ secret: process.env.JWT_SECRET }).unless({ path : openPaths})
);

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: err.message });
    }
});


const users = [
    { id: 0, username: "bob", password: '1234'},
    { id: 1, username: "ole", password: 'password'},,
];




/****** Socket.IO ******/

const server = app.listen(port,
    () => console.log(`Some app running on port ${port}`));

const  io = require('socket.io').listen(server);

io.of('/my_app').on('connection', function (socket){
    socket.on('hello', function (from, msg) {
        console.log(`I received a private message from '${from}' saying '${msg}'`);
    });
    socket.on('Disconnect', () => {
        console.log("Someone disconnected");
    });
});


// Additional headers to avoid triggering CORS security errors in the browser
// Read more: https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

    // Intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        // respond with 200
        console.log("Allowing OPTIONS");
        res.sendStatus(200);
    } else {
        // move on
        next();
    }
});



/****** Schemas - Database *****/

var areaSchema = new mongoose.Schema ({
    area: Array
})

var categorySchema = new mongoose.Schema ({
    category: Array
})

var jobSchema = new mongoose.Schema ({
    jobtitle: String,
    jobcategory: String,
    jobarea: String,
    description: String,
    company: String,
    email: String
})

var areas = mongoose.model('area', areaSchema);
var categories = mongoose.model('category', categorySchema);
var jobs = mongoose.model('job', jobSchema);


// -------- ADD NEW JOB
app.post('/api/NewJob', (req, res, next) => {
    var NewJob = new jobs(req.body)
    NewJob.save(function (err, NewJob) {

        io.of('/api/my_app').emit('new-data', {
            msg: 'New data is available on /api/my_data'
        });

        if (err) { return next(err) }
        res.json(201, NewJob);
        console.log("Et nyt job er tilføjet");
    })
})

// -------- ADD Job Category
app.post('/api/NewCategory', (req, res, next) => {
    var NewCategory = new categories(req.body)
    NewCategory.save(function (err, NewCategory) {

        io.of('/api/my_app').emit('new-data', {
            msg: 'New data is available on /api/my_data'
        });

        if (err) { return next(err) }
        res.json(201, NewCategory);
        console.log("En ny category er tilføjet");
    })
})

// -------- ADD Job Area
app.post('/api/NewArea', (req, res, next) => {
    var NewArea = new areas(req.body)
    NewArea.save(function (err, NewArea) {

        io.of('/api/my_app').emit('new-data', {
            msg: 'New data is available on /api/my_data'
        });

        if (err) { return next(err) }
        res.json(201, NewArea);
        console.log("Et nyt jobområde er tilføjet");
    })
})




/****** Routes *****/

// Jobs
app.get("/api/jobs", (req, res) => {
    jobs.find({}, (err, jobs) => {
        res.send(jobs)
    })
})

//Categories
app.get("/api/category", (req, res) => {
    categories.find({}, (err, categories) => {
        res.send(categories)
    })
})

//Areas
app.get("/api/areas", (req, res) => {
    areas.find({}, (err, areas) => {
        res.send(areas)
    })
})

app.get('/api/', (req, res) => {
    jobs.find(function (err, data) {
        if (err) return console.error(err);
        res.status(200).json(data)

    });
})

app.get('/api/data/:id', (req, res) => {

    const { id } = req.params;
    const jobs = data.filter((data) => data.id == id)[0];

    if(!jobs) {
        res.sendStatus(404);
    }
    else {
        res.status(200).json(jobs);
    }

    res.json({
        msg: `you have sent this id: ${req.params.id}` 
    });

});


/******  User Router ******/
let usersRouter = require('./users_router')(users);
app.use('/api/users', usersRouter);

/****** Error handling ******/
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send({msg: 'Something broke!'})
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});


// app.listen(port, () => console.log(`Mandatory QA API kører på: ${port}!`))


