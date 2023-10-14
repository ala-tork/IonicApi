const mongoose = require ('mongoose');
try {
    mongoose.connect('mongodb://127.0.0.1:27017/ionicDb')
    .then(() => console.log('Db Connected!'));
} catch (error) {
    console.log(error);
}

module.exports = mongoose;