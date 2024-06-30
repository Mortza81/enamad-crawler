import mongoos from "mongoose"
const websiteSchema=new mongoos.Schema({
    name:{
        type:String,
        required:true
    },
    expiration:{
        type:String,
        required:true
    },
    stars:{
        type:Number,
        required:true
    },
    domain:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    }
})
const Website=mongoos.model('Website',websiteSchema)
export {Website}