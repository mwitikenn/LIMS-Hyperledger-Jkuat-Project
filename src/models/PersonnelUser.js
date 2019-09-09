const mongoose=require('mongoose');
const PersonnelUserSchema=new mongoose.Schema({
    username:{type:String,
         required:true},
    password:{type:String,
         required:true},
    personnelType:{type:String,
            required:true}
   

});

const PersonnelUser=mongoose.model('PersonnelUser',PersonnelUserSchema);
module.exports=PersonnelUser;