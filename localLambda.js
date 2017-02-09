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
            logGroupName: "\/aws\/lambda\/GraphBot",
            logStreamName: "2016\/09\/12\/[$LATEST]87cc665c85fe4299ad5e0d5e424be2d2",
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
    "sessionId": "SessionId.571d7211-844f-45fe-a2cd-9035cbfb8327",
    "application": {
      "applicationId": "amzn1.ask.skill.277b50fe-a169-455c-935b-a37ceade4757"
    },
    "attributes": {},
    "user": {
      "userId": "amzn1.ask.account.AGVTKWCOM2IXBBFOWB5ZS6MJDJKCD4F62LQJYHLI2CPBQTER5VSS3VF7KNRYD3KTW4OB3BQNVTHDTTK4HOEF4J3ENKBBRLYW6NVHE3HHHBUMZ3JQKS57ZJV24ZWIG2J3M6ENQM3M674U7J2OUHRSGHK3YJJ6VFD7HB35I4AILOHRLAWVTNGMWW3MCDLJ3HKZ6TATEIJCCE5HOTY",
      "accessToken": "eyJ0eXAiOiJKV1QiLCJub25jZSI6IkFRQUJBQUFBQUFEUk5ZUlEzZGhSU3JtLTRLLWFkcENKLW10LXBWQWRCSk9TR282MTE4U1RWZWpWaDZUa09TdGp5YlM3Ym9keU1oM01CZjRkQnF1ZWlkTTd2NmUtbGtULVBvR20tYkZuR3N0cnNHc3ljQTZVcWlBQSIsImFsZyI6IlJTMjU2IiwieDV0IjoiX1VncVhHX3RNTGR1U0oxVDhjYUh4VTdjT3RjIiwia2lkIjoiX1VncVhHX3RNTGR1U0oxVDhjYUh4VTdjT3RjIn0.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDcvIiwiaWF0IjoxNDg2NjY2NTQ2LCJuYmYiOjE0ODY2NjY1NDYsImV4cCI6MTQ4NjY3MDQ0NiwiYWNyIjoiMSIsImFpbyI6IkFRQUJBQUVBQUFEUk5ZUlEzZGhSU3JtLTRLLWFkcENKcUxvYlQxTV9nSVpySEhzd1JWaF8wVVFGdFpzc0xQX2VqTWJQY1NHVjhabzhUdU9lVGJ6STdOQWk3Z000NldMUFhYWjVCaVlWaWY5eUdkV0dPMTliM2dvSG9EZlA2TjZYdWFwY3V2Qk9RUzJjYVhtMURDRUxOTGtMdVJnd0FtQlRJQUEiLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcF9kaXNwbGF5bmFtZSI6InBzdHViYnMtZ3JhcGgtYm90IiwiYXBwaWQiOiIxYmEwMTg5Zi1lMTgzLTQ0YjgtYTE2Yy1jNzM3OGVmMmRhMmEiLCJhcHBpZGFjciI6IjEiLCJmYW1pbHlfbmFtZSI6IlN0dWJicyIsImdpdmVuX25hbWUiOiJQYXVsIiwiaW5fY29ycCI6InRydWUiLCJpcGFkZHIiOiI1MC4xNDkuMTE4LjExOSIsIm5hbWUiOiJQYXVsIFN0dWJicyIsIm9pZCI6IjQ4ZWIzM2Q2LWYwMDktNDkxMy05OGQzLTZkZDg1MTU4NzZkYSIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS0yMTI3NTIxMTg0LTE2MDQwMTI5MjAtMTg4NzkyNzUyNy00NzYzMDQ1IiwicGxhdGYiOiI1IiwicHVpZCI6IjEwMDMwMDAwODAxQzEzMDEiLCJzY3AiOiJNYWlsLlJlYWQgTWFpbC5TZW5kIFVzZXIuUmVhZCIsInN1YiI6ImxuVHNZamJPUjZJdV9OTlBIMnVCTjZCdWo4TkFOUWhqYTFGcU1uYXVCdzQiLCJ0aWQiOiI3MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDciLCJ1bmlxdWVfbmFtZSI6InBzdHViYnNAbWljcm9zb2Z0LmNvbSIsInVwbiI6InBzdHViYnNAbWljcm9zb2Z0LmNvbSIsInZlciI6IjEuMCJ9.Ek8DNbskq_B5nzXRm36IJ4CqdxUreErVLWFYjciqIMhT0XNSZdCSrPQyGzIIZAqPQs8Isjk4uX0QMf2M3sPAK1PLRCOAefIwjJVKT3fHX3yPBaJkeod9pE8AdJ4HR3KF2jEdAvf9Yls4ZwUA-Kx_OFAFHlBkABGrSiNxIdYiNlsLRL503EJE6TRjyksMFqroQR7fZ-cCQVLcMNKYik4gH8UghjIDeNKB5lGHUpx7kCwcgDgMz3iGvonAe9KItkG-pJJTimniFsD3JH3YGc8AfsV_-b9HuSppRUddL7QL_8T1H-s-_QXXpQt9zB7R1vla1tlJ5f8D2JdmYEJmgj7JgA"
    },
    "new": true
  },
  "request": {
    "type": "LaunchRequest",
    "requestId": "EdwRequestId.4049538c-2747-4ffd-b67f-a9394dc26e5d",
    "locale": "en-US",
    "timestamp": "2017-02-09T19:14:16Z"
  },
  "version": "1.0"
};

// Call the Lambda function 
skill.handler(event, context);
