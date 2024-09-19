const AWS = require('aws-sdk');
const sqs = new AWS.SQS();

module.exports.sendMessage = async (event) => {
  let body;
  
  try {
    // Parse the incoming request body
    body = JSON.parse(event.body);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Invalid JSON format',
      }),
    };
  }

  const params = {
    QueueUrl: process.env.SQS_QUEUE_URL, // SQS queue URL from environment variables
    MessageBody: JSON.stringify(body), // Convert the body back to JSON string
  };

  try {
    const data = await sqs.sendMessage(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Message sent to SQS',
        messageId: data.MessageId, // SQS message ID for tracking
      }),
    };
  } catch (error) {
    console.error('Error sending message to SQS:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to send message to SQS',
      }),
    };
  }
};
