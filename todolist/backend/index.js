const expres=require('express')
const mongose=require('mongoose')
const obj=require('./model/course.model')

app=expres()

app.use(expres.json());
app.use(expres.urlencoded({extended:false}));

mongose.connect('mongodb://localhost:27017/listdb',{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true , useFindAndModify: false },(error) =>{
    if(!error) console.log("success");
    else{
        console.log("not success");
    }
});


app.get('/api/tasks',(req,res)=>{
   let tasks=[];
    obj.find({},function(err,docs){
        if(err)res.json(err);
        else {
            //console.log(typeof(docs));
            //console.log(typeof(docs))
            tasks=docs
            console.log(tasks);
            console.log(typeof(tasks));
            /*
            var favar=tasks.filter( (e1) =>{
                return e1.fav===true
            }) 
            console.log('favar is',favar)
            
            var nonfavar=tasks.filter( (e2) =>{
                return e2.fav===false
            })
            console.log('nonfavar is',nonfavar)
            tasks=favar.concat(nonfavar);
            console.log('final output',tasks);   
            console.log(typeof(tasks)); */
            res.json(tasks) 
        }
    }) 
    /*
    const tasks=[
        {listname:'homework',taskname:'sciene',time:6,favorite:'yes'}
    ];*/ 
    //res.json(tasks)
});

app.post('/api/take',async(req,res) =>{
    
    const newtask= new obj({
        list:req.body.it.listname,
        task:req.body.it.taskname,
        task_time:req.body.it.time,
        fav:req.body.it.favorite
    }); 
    
    //console.log(newtask);
    //console.log(task_time);
    try{
        await newtask.save();
        res.status(201).send(newtask);
        console.log('task saved in database');
    }
    catch(error){
        res.status(500).send(error);
    }
  /*  newtask.save()
        .then(data => {
           res.json(data);
            console.log('task saved');  
        })
        .catch(err => {
            res.json({message:err});
        }); */
    //res.json(req.body);
    console.log(req.body.it.favorite);
    console.log(req.body.it.time);
    console.log(req.body.it.taskname);
    console.log(req.body.it.listname);
});

app.listen(5000,(req,res) => {
    console.log('server is listening')
})