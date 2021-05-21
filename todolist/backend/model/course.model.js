const mongose=require('mongoose');

var courseschema=new mongose.Schema({
    list:{
        type:String,
        required:"Required"
    },
    task:{
        type:String,
        required:"Required"
    },
    task_time:{
        type:String,
        required:"Required"
    },
    fav:{
        type:Boolean,
        required:"Required"
    }
});

module.exports=mongose.model("lists",courseschema);   //name of collection