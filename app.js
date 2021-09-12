const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash")
const mongoose = require('mongoose');


const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
startingContent = "Your message is being sending. Please wait.... ";


mongoose.connect('mongodb+srv://admin2:abcd1234@cluster0.tdi55.mongodb.net/contactPage?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });


// mongoose.connect('mongodb://localhost:27017/myapp');

const postSchema = {
    fromEmail: String,
    toEmail: String,
    title: String,
    messageInc: String,


};

const Records = mongoose.model("Records", postSchema);

app.get("/", (req, res) => {


    setTimeout(() => {
        res.render("home");
    }, 2000)

})


app.get("/records", (req, res) => {
    Records.find({}, function (err, posts) {
        res.render("records", {
            postsAll: posts
        });
    });
})

app.get("/records/:postId", (req, res) => {
    const requestedPostId = req.params.postId;

    Records.deleteOne({ _id: requestedPostId }, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Succesfully deleted the document")
            res.redirect("/records");

        }
    });

})



app.post("/", (req, res) => {

    const post = new Records({
        fromEmail: req.body.fromEmail,
        toEmail: req.body.toEmail,
        title: req.body.title,
        messageInc: req.body.messageInc
    });


    post.save(function (err) {
        if (!err) {
            res.redirect("/");
        }
    });
})


const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on ${PORT}`));