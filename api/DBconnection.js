const mongoose = require('mongoose');
const url = process.env.MONGO || "mongodb+srv://ishita:ishita123@cluster0.ce9py.mongodb.net/test";
mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false

}, (err) => {
    if (!err) {
        console.log("DB Conneted Succefully!!!");
    }
    else {
        console.log(err);
    }
});