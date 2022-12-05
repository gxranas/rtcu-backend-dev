const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const cookieSession = require('cookie-session');
const passport = require('passport');
const passportSetup = require('./middleware/passport');
const UserRoute = require('./routes/UserRoute');
const AddressRoute = require('./routes/AddressRoute');

app.use(cookieSession({
    name: "session",
    keys: ["justbetty"],
    maxAge: 24 * 60 * 60 * 100
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: process.env.LOCAL_HOST,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}));
app.use(express.json());

app.use('/users', UserRoute);
app.use('/addresses', AddressRoute);

app.listen(process.env.PORT, () => {
    console.log("Server is running on port:" + process.env.PORT);
})