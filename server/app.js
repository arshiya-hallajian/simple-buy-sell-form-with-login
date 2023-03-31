const express       = require('express');
const app           = express();
const dotenv        = require('dotenv');
const mongoose      = require('mongoose');
const cors          = require('cors');

//routes
const authRoute = require('./routes/auth');
const mainRoute = require('./routes/userMain');
dotenv.config();

//database connection
try {
    mongoose.set('strictQuery', true);
    mongoose.connect(
        process.env.DB_CONNECT,
        {useNewUrlParser: true},
        () => {
            console.log('connected to db!');
        }
    );
}catch (e) {
    console.log('db error');
}

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static('images'))
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

//middleRoute
app.use('/api', authRoute);
app.use('/api', mainRoute);

//server run
app.listen(4000, () => console.log('server is running'));


//jwt route
// app.post('/jwt',(req, res) => {
//
// })