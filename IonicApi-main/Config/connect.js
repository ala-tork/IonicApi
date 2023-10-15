const mongoose = require ('mongoose');
try {
    mongoose.connect('mongodb+srv://djebbiasma331:5EFyGMsqnse2miwX@cluster0.xh4tgla.mongodb.net/')
    .then(() => console.log('Db Connected!'));
} catch (error) {
    console.log(error);
}

module.exports = mongoose;