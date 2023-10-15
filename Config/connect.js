const mongoose = require ('mongoose');
try {
    mongoose.connect('mongodb+srv://ahmedayadi:80syyFgv5dZh836s@ionic-webservice.hevrnwa.mongodb.net/')
    .then(() => console.log('Db Connected!'));
} catch (error) {
    console.log(error);
}

module.exports = mongoose;