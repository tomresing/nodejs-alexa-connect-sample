// import the Lambda function 
var skill = require('./index.js');

// Mock the context input from Alexa
var context =
            {
            succeed: function () {
                console.log('------------');
                console.log('Context succeed');
            },
            fail: function (err) {
                console.log('------------');
                console.log('Context fail');
                console.log('   error:', err);
            },            
            callbackWaitsForEmptyEventLoop: true,
            logGroupName: "/aws/lambda/GraphBot",
            logStreamName: "2016/09/12/[$LATEST]87cc665c85fe4299ad5e0d5e424be2d2",
            functionName: "Graph-Snippet-Skill",
            memoryLimitInMB: "128",
            functionVersion: "$LATEST",
            invokeid: "0e347316-53d0-11e6-a3c3-b9f00dad8a1b",
            awsRequestId: "0e347316-53d0-11e6-a3c3-b9f00dad8a1b",
            invokedFunctionArn: "arn:aws:lambda:us-east-1:906973470133:function:Graph-Snippet-Skill"
            };

// Mock the event input from Alexa
var event = 
{
  "session": {
    "sessionId": "SessionId.bc74fffc-3073-4f38-ac16-6c229e3bd81e",
    "application": {
      "applicationId": "amzn1.ask.skill.b1f438ec-284c-4bb4-ae35-9f198083aeec"
    },
    "attributes": {},
    "user": {
      "userId": "amzn1.ask.account.AFCQUG25DSVPISOJRQ2AVMI4KUSWRIQXCDNLYUNQMWCPRDSNFTHIBOGVZJZIF4PYHOIRTWN5ZMZM22FWASNWGOHN5LQU54OLBAYWLRFSJMCWHLHEIFQR46INMHWDVCTERU3F46E4IB2LRQB2XWK2R63T6D6Y36BIY7V3H5TL7KD2NPI7DLFJZMNABMRJP73MBPMVLOCJFOGJBMQ",
      "accessToken": "EwAwA8l6BAAU7p9QDpi/D7xJLwsTgCg3TskyTaQAAbGERYZOx1Iv69im6WQ48XkizSf6aFi+/qtPOkViV6uX4WcT9pvvIQPZzJy0mT1mZotHCVeapT2UhEaWxKMqcJBqHMKujaUxfV/4/GF5pJP9px9wlUCqg+8bx7PSlhU3eccCoVJlLvJ+F2J41PNmX5HBKdZ/ZKspz7yOLrpP3JPVyKMzJydofoeMuNsv5J3riSEIywCUiukFalakRMw3pO+ccDdCaWvIKZfw8xyuXnHNUGOuVaFLiumZguSyprk9enWvZxRJV8Moz1tRMWCgvHweyMsf6Xcs3uEqXwOiNnVEKLAWa/0MR/c3dw61k/HDgN5mK0h9oL1qfWxY0Ryqn2IDZgAACGzgoLlqwJOkAAJpbUJIO0sBuRz6dy0R8TGHPM+sgsK5mIQ74cr0K39L7uX0IqHTCokqTuJvwVpo74vnnGPtcFXdgCvGSbTJEMu3/r/3uUz6G9vyW08jRpn6ugxm5hjurdgBHNW+F/vV1Gdiq/zXu32/nSHTadD3V9R1By2siSRoCrmFJr2uWmjO0GJrvN/nvn9PzZIYhRQ3rFnb9b6LIhcPqYYxKZwxhfWsWNFlZ/8n4/3feFAVKs4wrWNe0icmVXVy1N7Ty15FtymzDSWwOBEH1lwp815eQnAP6CAcQcPeGE274RA2KgQDlwr36v8o2UpeciezMNWUxrsDw/zPqfht9V8AEKQ5018V8EKk9AgBdLAAqfDuLWAuAlG1tZ8VMVxff0IfTk7sc/i0XbXbUJK7Vy+1ern2slv3VCI6CyzGIHWOavHnvPShLihL3rpXBlXLuhmCSw9DqlFi5K9pI0+uh5AHgQLCzwGbpaj59+7dDM+l4FWCx05RZHOofeux+WoTKbKchWDMSnrmPD9dMS0kkP4D2f4CZf2cirg2M04nHhK2eMWDE8ZuLZC0lR8dj6XBAZqZcI6/X70b9K/pqgiv6jAqKjvAI4WM6O57Hu0YyJOoEm6lZzEKT4S1RrwmofYZqXFGG0MjkdTK83vuwSelg0qomIb1CY7rMUrVwz+HZICDFwDat5RaACQC"
    },
    "new": true
  },
  "request": {
    "type": "IntentRequest",
    "requestId": "EdwRequestId.ec11af31-a531-4d62-962c-f630c52c2f32",
    "locale": "en-US",
    "timestamp": "2017-02-10T17:25:39Z",
    "intent": {
      "name": "SendMailIntent",
      "slots": {}
    }
  },
  "version": "1.0"
};

// Call the Lambda function 
skill.handler(event, context);
