# Image Processing From CSV




This project is an image processing system designed to handle CSV files containing product information and associated image URLs. The system performs the following tasks:
1. Receives and validates CSV files.
2. Asynchronously processes images (compressing them by 50%).
3. Stores the processed image data and associated product information in a database.
4. Provides an API to check the processing status using a unique request ID.
5. Uses webhooks to notify the completion of image processing tasks.

## Features

- Asynchronous image processing.
- Validation of CSV file format.
- Database storage of product and request data.
- Webhook notifications upon completion of processing.
- Clear API endpoints for uploading CSV files and checking processing status.

   

## Configuration

1. MongoDB: Set up your MongoDB connection string in the .env file.
2. Port: Configure the server port in the .env file.
3. Webhook URL: Specify the webhook URL to receive notifications upon completion of image processing.

## Running the Application

1. Start the server:
   ```bash
   npm start
2. Run the worker script for processing images:
   ```bash
   node workers/processImages.js
## API Documentation


