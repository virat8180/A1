const axios = require('axios');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const Product = require('../models/Product');
const Request = require('../models/Request');
const { webhookURL } = require('../config');

async function processImage(url) {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data, 'binary');
        const compressedimageBuffer = await sharp(buffer)
            .jpeg({ quality: 50 })  // Compress to 50% quality
            .toBuffer();
        const outputPath = path.join(__dirname, 'processed-images', `${productName}-${Date.now()}.jpg`);
        fs.writeFileSync(outputPath, compressedimageBuffer);




        return outputPath;
    } catch (error) {
        console.error(`Error processing image: ${error.message}`);
        throw error

    }
}

async function processImages(requestId) {
    try {
        const products = await Product.find({ requestId });
        for (const product of products) {
            const outputImageUrls = [];
            for (const inputImageUrl of product.inputImageUrls) {
                const outputImageUrl = await processImage(inputImageUrl);

                outputImageUrls.push(outputImageUrl);
            }
            product.outputImageUrls = outputImageUrls;
            await product.save();
        }
        // await axios.post(webhookURL, { requestId, status: 'COMPLETED' });
        await Requestmodel.updateOne({ id: requestId }, { status: 'COMPLETED', updatedAt: new Date() });
    } catch (error) {
        // await axios.post(webhookURL, { requestId, status: 'FAILED' });
        await Requestmodel.updateOne({ id: requestId }, { status: 'FAILED', updatedAt: new Date() });
    }
}

module.exports = { processImages };