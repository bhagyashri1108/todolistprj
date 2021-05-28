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


app.get('/api/tasks',async(req,res)=>{
   let tasks=[];
   try{
        tasks=await obj.find({});
        console.log(tasks);
        res.status(200).send(tasks);
        //console.log(typeof(tasks));
        //res.json(tasks) 
    }catch(error){
        res.status(500).send(error);
    } 
});

app.post('/api/take',async(req,res) =>{
    
    const newtask= new obj({
        list:[req.body.it.listname],
        task:req.body.it.taskname,
        task_time:req.body.it.time,
        fav:req.body.it.favorite
    }); 
    
    //console.log(newtask);
    console.log(req.body.it.time);
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


app.put('/api/update/:id' , async(req,res)=> {
    
    console.log(req.body.objt.list);
    console.log(req.body.objt.task_time);
    console.log(req.body.objt.task);
    console.log(req.body.objt.fav); 
    //console.log(req.body.objt);
   try{

        conds={list:req.body.objt.list,task:req.body.objt.task};
        const docs=await obj.updateOne({_id:req.params.id},conds);
        console.log(docs);
        if(docs){
            res.status(201).send(docs);
            console.log('value updated....')
        }
        return res.status(404).send();
    }catch(error){
        res.status(500).send(error);
    }  
});


app.delete('/api/delete/:id',async(req,res)=>{

    try{
        const docs=await obj.findByIdAndRemove(req.params.id);
        if(docs)
        {
            res.status(201).send(docs);
            console.log('item removed');
        }
        res.status(404).send();
    }
    catch(error){
        res.status(500).send(error);
    }
    //console.log(req.body.objt);
    console.log(req.params.id);

   /*console.log(req.body.objt.list);
    console.log(req.body.objt.task_time);
    console.log(req.body.objt.task);
    console.log(req.body.objt.fav);  */
});


app.listen(5000,(req,res) => {
    console.log('server is listening')
})