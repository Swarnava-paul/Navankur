const mongoose = require('mongoose');

class DbConnection {
    constructor() {};

    async db() {
          try{
             await mongoose.connect(process.env.DATABASE_URI);
             console.log('Connected to Database');
          }catch(error) {
             console.log('Failed to Connect with Database')
             throw new Error(error);
          }
    }

}
const connect = new DbConnection();
module.exports = connect