const _ = require('lodash');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectionString = 'mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASSWORD+'@'+process.env.DB_SERVER+'/dogeTagDB?retryWrites=true&w=majority';
mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    normalizedUsername: String,
    dogname: String,
    wifKey: String,
    publicKey: String,
    tweetUrl: String,
    active: Boolean
}, { versionKey: false });

const userModel = mongoose.model("Users", UserSchema);

const getUserByPublicKey = (pk, cb) => {
    const query = {
        publicKey: pk
    };

    userModel.findOne(query, (err, user) => {
        if (err || user == null) {
            if (user == null) err = "missing user";
            cb(err);
        } else {
            let userPick = _.pick(user, ['username', 'dogname', 'tweetUrl', 'publicKey']);
            cb(null, userPick);
        }
    });
};

module.exports = {
    getUserByPublicKey: getUserByPublicKey
};