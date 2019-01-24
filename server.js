const express = require('express');
const app = express();

app.set('views', __dirname + '/views');
app.use(express.static(__dirname + "/public/dist/public")); //MUST point the server to the Angular folder
app.set('view engine', 'ejs');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rate_my_cakes', { useNewUrlParser: true });

var CommentSchema = new mongoose.Schema({ 
    comment_content: { type: String, required: true },
    rating: { type: Number, required: true }
})
const Comment = mongoose.model('Comment', CommentSchema);


var CakeSchema = new mongoose.Schema({
    baker_name: { type: String  , required: true },
    img_url: {type: String, required: true },
    comment: [CommentSchema] 
})
const Cake = mongoose.model('Cake', CakeSchema);


//create
app.post('/cake', function (req, res){
    var cakeInstance = new Cake ( req.body );
    console.log(req.body);
    cakeInstance.save(function (err){
        if (err) {
            return res.json({status: "error creating document in DB", err: err});
        }
        else {
            return res.json({status: "Success adding document to DB", cake: cakeInstance});
        }
    })
})


//Retrieve
app.get('/cakes', function (req, res) {
    Cake.find({}, function (err, data){
        if(err){
            res.json({err:err});
        }
        else {
            res.json({data: data});
        }
    })
})

//Retrieve specific id
app.get('/cake/:id', function (req, res){
    Cake.findById({_id: req.params.id}, function(err, data){
        if(err){
            res.json({err:err});
        }
        else {
            console.log('task has been retrieved');
            res.json({data: data});
        }
    })

})


//update
app.put('/cake', function (req, res){
    console.log(req.body);
    Cake.findByIdAndUpdate(req.body._id, {$set: {baker_name: req.body.baker_name, img_url: req.body.img_url}}, function(err, data){
        if(err){
            console.log("document not found in db");
            res.json({err: err});
        }
        else{
            console.log("successfully updated");
            console.log(data);
            res.json({data:data})
        }
    })
})

//delete
app.delete('/cake/:id', function (req, res){
    Cake.findOneAndDelete({_id:req.params.id}, function (err){
        if(err){
            res.json({err:err});
        } else {
            res.json({status: "Success deleting the object"});
        }
    })
})

//create a rating/comment and push it into the existing cake object
app.post('/cake/rating/:id', function (req, res) {
    var commentInstance = new Comment ( req.body );
    console.log("This is the body", req.body);
    commentInstance.save(function (err){
        if (err) {
            res.json({status: "error creating document in DB", err: err});
        }
        else {
            res.json({status: "Success adding document to DB", comment: commentInstance});
            Cake.findOneAndUpdate(req.params.id, {$push: {comment:{comment_content: commentInstance.comment_content, rating: commentInstance.rating}}}, function(err, data){
                if(err){
                    console.log("document not found in db");
                    res.json({err: err});
                }
                else{
                    console.log("successfully updated", data);
                }
            })
        }
    })

})

app.listen(8000, function () {
    console.log("listening on port 8000");
})