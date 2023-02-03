const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
module.exports.connect =()=>{ 
    mongoose.connect(process.env.DB_PORT,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
}).then(()=>[
    console.log(`DATABASE CONNECTED SUCCESSFULLY`)
]).catch(()=>{
    console.log(`FAILED TO CONNECT DB`)
})
}
