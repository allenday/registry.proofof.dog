const fs = require('firebase-admin');
const _ = require('lodash');
const dotenv = require('dotenv');

dotenv.config();

const serviceAccount = require('./config/' + process.env.FS_CREDENTIAL_FILE);

fs.initializeApp({
    credential: fs.credential.cert(serviceAccount)
});

const db = fs.firestore(); 

const getUserByPublicKey = (pk, cb) => {
    db
    .collection('dogtag')
    .doc('registry')
    .collection('users')
    .where('publicKey', '=', pk)
    .get()
    .then((snapshot) => {
        if (snapshot.empty) {
            cb('missing data');
        } else {
            let userPick = _.pick(snapshot.docs[0].data(), ['username', 'dogname', 'tweetUrl', 'publicKey']);
            cb(null, userPick)
        }
    }).catch((err) => {
        console.log(err);
        cb('database error');
    })    
};

module.exports = {
    getUserByPublicKey: getUserByPublicKey
};