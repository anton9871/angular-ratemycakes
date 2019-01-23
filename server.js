const express = require('express');
const app = express();

app.set('views', __dirname + '/views');
app.use(express.static(__dirname + "/public/dist/public")); //MUST point the server to the Angular folder
app.set('view engine', 'ejs');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ninja_gold', { useNewUrlParser: true });

var GameSchema = new mongoose.Schema({
    gold: { type: Number, default: 0, required: true },
    activities: {type: [String] },
    _id: {type: Number, required:true}
})
const Game = mongoose.model('Game', GameSchema);

app.post('/start_game', function (req,res){
    var game_instance = new Game ();
    game_instance.gold = 0;
    game_instance._id = 1;
    game_instance.save(function(err){
        if (err){
            res.json({status: "Failure", error:err})
        } else {
            res.redirect('/');
        }
    })
})


app.put('/process', function (req, res){

    var building = req.body.building;
    console.log("You selected this type: ", req.body.building);
    
    if (building == 'farm') {
        let incrementer = Math.floor(Math.random() * (20 - 10)) + 10;;
        Game.findByIdAndUpdate ({_id: 1}, {$inc: {gold: incrementer}}, function (err, data){
            if (err) {
                res.json({message: 'Error', err:err})
            } else {
                res.json( {message: 'Success', data: data} )
                console.log("You received this amount of gold: ", incrementer);
            }
        })
    }
    else if (building == 'cave') {
        let incrementer = Math.floor(Math.random() * (10 - 5)) + 5;;
        Game.findByIdAndUpdate ({_id: 1}, {$inc: {gold: incrementer}}, function (err, data){
            if (err) {
                res.json({message: 'Error', err:err})
            } else {
                res.json( {message: 'Success', data:data} )
                console.log("You received this amount of gold: ", incrementer);
            }
        })
    }
    else if (building == 'house') {
        let incrementer = Math.floor(Math.random() * (5 - 2)) + 2;
        Game.findByIdAndUpdate ({_id: 1}, {$inc: {gold: incrementer}}, function (err, data){
            if (err) {
                res.json({message: 'Error', err:err})
            } else {
                res.json( {message: 'Success', data:data} )
                console.log("You received this amount of gold: ", incrementer);
            }
        })
    } else  {
        let incrementer = Math.floor(Math.random() * (100)) - 50;
        Game.findByIdAndUpdate ({_id: 1}, {$inc: {gold: incrementer}}, function (err, data){
            if (err) {
                res.json({message: 'Error', err:err, data:data})
            } else {
                res.json( {message: 'Success'} )
                console.log("You received this amount of gold: ", incrementer);
            }
        })
    }
})

app.get('/get_gold', function (req, res) {
    Game.find({_id:1}, function (err, data){
        if (err){
            res.json({status: 'Failure getting gold', err: err})
        } else {
            res.json({info:data[0].gold})
        }
    })
})


// //Retrieve
// app.get('/tasks', function (req, res) {
//     Task.find({}, function (err, data){
//         if(err){
//             return res.json({ status: "Error running query" , err:err});
//         }
//         else {
//             return res.json({status: "Success running query", data: data});
//         }
//     })
// })

// //Retrieve specific id
// app.get('/task/:id', function (req, res){
//     Task.findById({_id: req.params.id}, function(err, data){
//         if(err){
//             return res.json({status: "Error running query", err:err});
//         }
//         else {
//             console.log('task has been retrieved');
//             return res.json({status: "Success running query", data: data});
//         }
//     })

// })

// //create
// app.post('/task', function (req, res){
//     var taskInstance = new Task ( req.body );
//     console.log(req.body);
//     taskInstance.save(function (err){
//         if (err) {
//             return res.json({status: "error creating document in DB", err: err});
//         }
//         else {
//             return res.json({status: "Success adding document to DB", task: taskInstance});
//         }
//     })
// })

// //update
// app.put('/task/:id', function (req, res){
//     Task.findByIdAndUpdate({_id:req.params.id}, {$set: {title: req.body.title}}, function(err, data){
//         if(err){
//             console.log("document not found in db");
//             return res.json({err: err});
//         }
//         else{
//             console.log("successfully updated");
//             console.log(req.body.title);
//             return res.json({data:data})
//         }
//     })
// })

// //delete
// app.delete('/task/:id', function (req, res){
//     Task.findOneAndDelete({_id:req.params.id});
//     return res.json({data: "Success deleting the object"});

// })

app.listen(9000, function () {
    console.log("listening on port 8000");
})