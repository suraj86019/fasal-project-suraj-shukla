const express = require('express');
const app = express();
const connect = require('./db');
const cors = require('cors')
const bodyparser = require('body-parser');
const user = require('./Models/user');
const wishList = require('./Models/wishList');
const port = 3030 || process.env.PORT;


app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
connect();

app.post('/api/createUser', (req, res) => {
    // console.log('HERE')
    try {
        user.create({
            email: req.body.email,
            password: req.body.password
        }).then(() => {
            res.json({ status: 0 });
        }).catch(() => {
            res.json({ status: -1 });
        })
    } catch (error) {
        res.json({ status: -1 });
    }
})

app.post('/api/findUser', async (req, res) => {
    // console.log('HERE')
    try {
        // console.log(req.body)
        User = await user.findOne({ email: req.body.email, password: req.body.password });
        // console.log(User);
        if (!User) {
            return res.json({ status: -1 });
        }
        res.json({ status: 0, email: User.email });
    } catch (error) {
        res.json({ status: -1 });
    }
})

app.post('/api/addList', async (req, res) => {
    // console.log('HERE')
    try {
        await wishList.create({
            title: req.body.title,
            src: req.body.src,
            id: req.body.id,
            email:req.body.email
        }).then(() => {
            res.json({ status: 0 });
        }).catch(() => {
            res.json({ status: -1 });
        })
    } catch (error) {
        res.json({ status: -1 });
    }
})


app.post('/api/getList', async (req, res) => {
    // console.log('HERE')
    try {
        let data = await wishList.find({email:req.body.email});
        
        res.json({ status: 0,data });
    } catch (error) {
        res.json({ status: -1 });
    }
})


app.post('/api/deleteList', async (req, res) => {
    // console.log('HERE')
    try {
        let data = await wishList.findOneAndDelete({_id:req.body.id});
        
        res.json({ status: 0});
    } catch (error) {
        res.json({ status: -1 });
    }
})




app.get('/', (req, res) => {
    res.send('HELLO')
})

app.listen(port, (req, res) => {
    console.log("listen at : " + port);
})
