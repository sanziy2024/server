const express = require('express');
const path = require('path');
const collection = require('./config');
const app = express();
const bcrypt = require('bcrypt')

const port = 5000;
app.use(express.json());
app.use(express.urlencoded({
    extended:false
}))
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.post('/signup', async (req, res)=>{
    const data = {
        name : req.body.username,
        password : req.body.password
    };

    const existingUser = await collection.findOne({name: data.name});

    if (existingUser){
       res.send("user already exist");
    }

        //secure your password with bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword;
        const userdata = await collection.insertMany(data);
        res.send('Signup successful')
    });

app.post('/login', async (req, res)=>{
    try{
        const check = await collection.findOne({name: req.body.username})
        if(!check){
            res.send('username cannot found')
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (isPasswordMatch){
                res.sendFile(path.join(__dirname, 'public', 'homepage.html'));
        }else{
            res.send("wrong password");
        } 
    }catch{
        res.send("wrong details");
    }
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
//