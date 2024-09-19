// SNS Handler
module.exports.snsHandler = async (event) => {
  console.log("SNS event received:", JSON.stringify(event, null, 2));
  
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "SNS message processed successfully!",
      input: event,
    }),
  };
};

// HTTP API Handler
module.exports.httpHandler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello from HTTP API!",
      input: event,
    }),
  };
};
