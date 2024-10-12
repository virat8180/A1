const mongoose = require('mongoose');
const { mongoURI } = require('../config');
const { processImages } = require('../services/imageProcessor');
const Request = require('../models/Request');
const DB = 'mongodb+srv://virat:JvtdTwXXPMcebL26@atlascluster.ls6vsjh.mongodb.net/Image-processing'


mongoose.connect(DB)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

async function startProcessing() {
    const pendingRequests = await Request.find({ status: 'PENDING' });
    for (const request of pendingRequests) {
        await Request.updateOne({ id: request.id }, { status: 'PROCESSING', updatedAt: new Date() });
        processImages(request.id);
    }
}

startProcessing();
