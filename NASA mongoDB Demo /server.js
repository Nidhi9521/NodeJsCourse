const http = require('http');
const app = require('./app');
const mongoose=require('mongoose')
const { loadLaunchData } = require('./models/launches.model');

const PORT = process.env.PORT || 8000;
const {loadPlanetsData} = require('./models/planets.model')
const MONGO_URL='mongodb://localhost:27017/';
const server = http.createServer(app);
mongoose.connection.on('open',()=>{
  console.log('Ready!!');
})
mongoose.connection.on('error',(err)=>{
  console.error(err);
})
async function loadserverdata(){
  await mongoose.connect(MONGO_URL,
  //   {
  //   useNewUrlParser:true,
  //   useFindAndModify: false,
  //   useCreateIndex: true,
  //   useUnifiedTopolgy: true
  // }
  )
  await loadPlanetsData();
  await loadLaunchData();
  
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}
  
loadserverdata();