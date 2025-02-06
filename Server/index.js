require('dotenv').config();
const express = require('express');
const PORT = 4000;
const server = express();
const cluster = require('node:cluster');
const numCPUs = require('node:os').availableParallelism();
const process = require('node:process');


const connect = require('./Db/db.connection');

// routes
const AuthRouter = require('./Routes/AuthRoutes');

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
    server.use(express.json());
    server.use('/auth/v1',AuthRouter);
    server.listen(process.env.PORT,async()=>{
        try {
          await connect.db(); // db connection
          console.log(`server is running on ${process.env.PORT}`);
        }catch(error) {
           console.log(error);
           process.exit(1);
        }
    })

  console.log(`Worker ${process.pid} started`);
}