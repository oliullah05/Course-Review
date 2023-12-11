import { app } from "./app"
import  mongoose from 'mongoose';
import config from "./config";




// getting-started.js
async function server() {
try{
  await mongoose.connect(config.database_url);

  app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
  })
}
catch(err){
  console.log(err);
}

 
}






server().catch(err => console.log(err));