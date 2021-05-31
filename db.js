const _ = require('lodash');
const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://dogeTag:SvhZeqx4sprynmAv@shop.auuyn.gcp.mongodb.net/dogeTagDB?retryWrites=true&w=majority';
mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    normalizedUsername: String,
    dogname: String,
    wifKey: String,
    secretKey: String,
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