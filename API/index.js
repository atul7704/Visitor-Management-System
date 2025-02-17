var express=require("express")
var app=express()
var pool=require('./db')
const bodyParser=require('body-parser')
app.use(bodyParser.json())
app.get('/',(req,res)=>{
res.send('<h1>it is bydefault tab<h1/>')
})

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*") //allows all origin
    res.header("Access-Control-Allow-Methods","GET,HEAD,OPTIONS,POST,PUT,DELETE") //allows all methods
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Authorization") 
    next();
    });


app.get('/visitor',async(req,res)=>{
    try{
        var result= await pool.query("select * from visitor")
        res.json({visitorlist:result.rows})
    }catch(err){
        console.log(err)
    }
})

app.get('/getbyid',async(req,res)=>{
    try{
        var {id}=req.body;
        var result=await pool.query('select * from visitor where vid=$1',[id])
        res.json({ status: '200', message: 'Select successful',visitorlist:result.rows})
    }catch(err){
        console.log(err)
    }
})

app.get('/getname', async (req, res) => {
    try {
        const { name } = req.query; // ✅ Corrected: Read from query parameters
        if (!name) {
            return res.status(400).json({ status: '400', message: 'Name is required' });
        }

        const result = await pool.query('SELECT * FROM visitor WHERE fullname ILIKE $1', [`%${name}%`]); // ✅ Partial match search

        res.json({ status: '200', message: 'Select successful', data: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: '500', message: 'Internal Server Error' });
    }
});



app.delete('/deleteD',async(req,res)=>{
    try{
        var {id}=req.body;
        var result=await pool.query('delete from visitor where vid=$1',[id])
        res.json({status:'200',message:"delete successful"})
    }catch(err){
        console.log(err)
    }
})


app.post('/insertD',async(req,res)=>{
    try{
        var {fullnamee,contactt,purposee,assignedtoo,statuss}=req.body;
        var result=await pool.query('insert into visitor(fullname,contact,purpose,assignedto,status)values($1,$2,$3,$4,$5) returning *',[fullnamee,contactt,purposee,assignedtoo,statuss])
        res.json({status:'200',message:"insert successful"})
    }catch(err){ 
        console.log(err)
    }
})


app.put('/updateD',async(req,res)=>{
    try{
        var {fullnamee,contactt,purposee,assignedtoo,statuss,id}=req.body;
        var result=await pool.query('update visitor set fullname=$1,contact=$2,purpose=$3,assignedto=$4,status=$5 where vid=$6 returning *',[fullnamee,contactt,purposee,assignedtoo,statuss,id])
        res.json({status:'200',message:"update successful"})
    }catch(err){ 
        console.log(err)
    }
})

//Now we are creating API for User

app.get('/user',async(req,res)=>{
    try{
        var result= await pool.query("select * from UserLogin")
        res.json({userlist:result.rows})
    }catch(err){
        console.log(err)
    }
})

app.get('/getuserbyid',async(req,res)=>{
    try{
        var {id}=req.body;
        var result=await pool.query('select * from UserLogin where uid=$1',[id])
        res.json({visitorlist:result.rows})
    }catch(err){
        console.log(err)
    }
})


app.delete('/deleteUserId',async(req,res)=>{
    try{
        var {id}=req.body;
        var result=await pool.query('delete from UserLogin where uid=$1',[id])
        res.json({status:'200',message:"delete successful"})
    }catch(err){
        console.log(err)
    }
})


app.post('/insertUserId',async(req,res)=>{
    try{
        var {emaill,passwordd}=req.body;
        var result=await pool.query('insert into UserLogin(email,password)values($1,$2) returning *',[emaill,passwordd])
        res.json({status:'200',message:"insert successful"})
    }catch(err){ 
        console.log(err)
    }
})


app.put('/updateUserId',async(req,res)=>{
    try{
        var {emaill,passwordd,id}=req.body;
        var result=await pool.query('update visitor set email=$1,password=$2 where uid=$2 returning *',[emaill,passwordd,id])
        res.json({status:'200',message:"update successful"})
    }catch(err){ 
        console.log(err)
    }
})



app.listen(3000,'127.0.0.1',()=>{
    console.log("listening to 127.0.0.1:3000")
})