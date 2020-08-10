const functions = require('firebase-functions');
const admin = require('firebase-admin');
const path = require('path');
const os = require('os');
// const fs = require('fs');
const {
    readCsv
} = require('./utils');

admin.initializeApp();

const bucket = admin.storage().bucket();

exports.onReadCSV = functions.https.onCall(async (data, context) => {
    console.log(data);
    try {
        // console.log('path', data);
        const filePath = path.join(os.tmpdir(), `${Date.now()}_results.csv`);
        await bucket.file(data).download({
            destination: filePath,
        });
        // console.log('file', filePath);
        return await readCsv(filePath);
    } catch (e) {
        return e.message;
    }
});