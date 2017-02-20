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
      "accessToken": "eyJ0eXAiOiJKV1QiLCJub25jZSI6IkFRQUJBQUFBQUFEUk5ZUlEzZGhSU3JtLTRLLWFkcENKU1N5b29BSjdqSG9xNlh1N2pjS2xydjJNUlk2NV85c2h0UW1oWFpJU1VKOVo1SUIzdVc5SEFpa1FHTG9QeGg0TU1ZYV8zOTFoMVQ5Q0RjQURpckZVNFNBQSIsImFsZyI6IlJTMjU2IiwieDV0IjoiX1VncVhHX3RNTGR1U0oxVDhjYUh4VTdjT3RjIiwia2lkIjoiX1VncVhHX3RNTGR1U0oxVDhjYUh4VTdjT3RjIn0.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDcvIiwiaWF0IjoxNDg3NTY3ODU4LCJuYmYiOjE0ODc1Njc4NTgsImV4cCI6MTQ4NzU3MTc1OCwiYWNyIjoiMSIsImFtciI6WyJwd2QiLCJtZmEiXSwiYXBwX2Rpc3BsYXluYW1lIjoiR3JhcGggQm90IEFsZXhhIFNraWxsIiwiYXBwaWQiOiIxYmEwMTg5Zi1lMTgzLTQ0YjgtYTE2Yy1jNzM3OGVmMmRhMmEiLCJhcHBpZGFjciI6IjEiLCJmYW1pbHlfbmFtZSI6IlN0dWJicyIsImdpdmVuX25hbWUiOiJQYXVsIiwiaW5fY29ycCI6InRydWUiLCJpcGFkZHIiOiIxNjcuMjIwLjYwLjE3NyIsIm5hbWUiOiJQYXVsIFN0dWJicyIsIm9pZCI6IjQ4ZWIzM2Q2LWYwMDktNDkxMy05OGQzLTZkZDg1MTU4NzZkYSIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS0yMTI3NTIxMTg0LTE2MDQwMTI5MjAtMTg4NzkyNzUyNy00NzYzMDQ1IiwicGxhdGYiOiI1IiwicHVpZCI6IjEwMDMwMDAwODAxQzEzMDEiLCJzY3AiOiJNYWlsLlJlYWQgTWFpbC5TZW5kIFVzZXIuUmVhZCIsInN1YiI6ImxuVHNZamJPUjZJdV9OTlBIMnVCTjZCdWo4TkFOUWhqYTFGcU1uYXVCdzQiLCJ0aWQiOiI3MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDciLCJ1bmlxdWVfbmFtZSI6InBzdHViYnNAbWljcm9zb2Z0LmNvbSIsInVwbiI6InBzdHViYnNAbWljcm9zb2Z0LmNvbSIsInZlciI6IjEuMCJ9.NgxIDpHYJPwCNSsMsarqHIF59u-dYtpC2q0nfxRKJB0j_wrR49vcVKpPQX7HyKvxeoLSVPxVIyzA5ZAmYr4V56mdUey--Oe-fhrCmck8MKlQg80wmgV8Y0E_uTIUrcP87Y17mWlWhA5PJ6vRm4DIostiTKylGN9O39Q8xSlH4m63Xzs9h4BZ9YkXPh1-t4eX91L38uiwXF-3P3dssDB_8tZ4ebjzigBOL7Hk-oiLpWnGpGevTvwtmopYT-_BxsdydwJ-rVAe_-JFEWkSFbRVAEeMmL3g5yJPV0oQAiojDH1AOLTo_JznzH-tOPvxKUZJMqIbvuSGQZvSacRJtSJNFw"
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
