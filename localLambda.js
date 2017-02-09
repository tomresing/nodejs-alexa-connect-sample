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
    "sessionId": "SessionId.fed670ec-7a42-4f70-a134-c24e6368cbfb",
    "application": {
      "applicationId": "amzn1.ask.skill.277b50fe-a169-455c-935b-a37ceade4757"
    },
    "attributes": {},
    "user": {
      "userId": "amzn1.ask.account.AGVTKWCOM2IXBBFOWB5ZS6MJDJKCD4F62LQJYHLI2CPBQTER5VSS3VF7KNRYD3KTW4OB3BQNVTHDTTK4HOEF4J3ENKBBRLYW6NVHE3HHHBUMZ3JQKS57ZJV24ZWIG2J3M6ENQM3M674U7J2OUHRSGHK3YJJ6VFD7HB35I4AILOHRLAWVTNGMWW3MCDLJ3HKZ6TATEIJCCE5HOTY",
      "accessToken": "eyJ0eXAiOiJKV1QiLCJub25jZSI6IkFRQUJBQUFBQUFEUk5ZUlEzZGhSU3JtLTRLLWFkcENKelpBYVpuUlQ1QnRjUlBUcEdCdGpCQTlGRi1NU2g0SDFRODJSdk0yMVlhVzhpN1J5eEkwWjNDTnRKb3dBdDF5bWdOeW5oMTFodjVoaHQwYmZSQzQyVnlBQSIsImFsZyI6IlJTMjU2IiwieDV0IjoiX1VncVhHX3RNTGR1U0oxVDhjYUh4VTdjT3RjIiwia2lkIjoiX1VncVhHX3RNTGR1U0oxVDhjYUh4VTdjT3RjIn0.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC83MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDcvIiwiaWF0IjoxNDg2NjE0MDY5LCJuYmYiOjE0ODY2MTQwNjksImV4cCI6MTQ4NjYxNzk2OSwiYWNyIjoiMSIsImFpbyI6IkFRQUJBQUVBQUFEUk5ZUlEzZGhSU3JtLTRLLWFkcENKU3ZuZGlkbDZNZTJENHlHYjI1aVRCdFhDWW84RWtpR2FqTEtlVlpRamU4Ykt3Z0NmMmJPdlZMbkpOYXk2LVJFZ3huUEcwYTBRQ0VRYkxPc29YS3hvRHB5dlJ0SFFTT3UwbDVWaW9KcFFIbmhRZkRaNm85SnZ1V3JWaWpQeFp6YjJJQUEiLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcF9kaXNwbGF5bmFtZSI6InBzdHViYnMtZ3JhcGgtYm90IiwiYXBwaWQiOiIxYmEwMTg5Zi1lMTgzLTQ0YjgtYTE2Yy1jNzM3OGVmMmRhMmEiLCJhcHBpZGFjciI6IjEiLCJmYW1pbHlfbmFtZSI6IlN0dWJicyIsImdpdmVuX25hbWUiOiJQYXVsIiwiaW5fY29ycCI6InRydWUiLCJpcGFkZHIiOiI1MC4xNDkuMTE4LjExOSIsIm5hbWUiOiJQYXVsIFN0dWJicyIsIm9pZCI6IjQ4ZWIzM2Q2LWYwMDktNDkxMy05OGQzLTZkZDg1MTU4NzZkYSIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS0yMTI3NTIxMTg0LTE2MDQwMTI5MjAtMTg4NzkyNzUyNy00NzYzMDQ1IiwicGxhdGYiOiI1IiwicHVpZCI6IjEwMDMwMDAwODAxQzEzMDEiLCJzY3AiOiJNYWlsLlJlYWQgTWFpbC5TZW5kIFVzZXIuUmVhZCIsInN1YiI6ImxuVHNZamJPUjZJdV9OTlBIMnVCTjZCdWo4TkFOUWhqYTFGcU1uYXVCdzQiLCJ0aWQiOiI3MmY5ODhiZi04NmYxLTQxYWYtOTFhYi0yZDdjZDAxMWRiNDciLCJ1bmlxdWVfbmFtZSI6InBzdHViYnNAbWljcm9zb2Z0LmNvbSIsInVwbiI6InBzdHViYnNAbWljcm9zb2Z0LmNvbSIsInZlciI6IjEuMCJ9.wE88qTIuF9wewzPPIYsTvzzONSrsyoE3SODfEezEhGcASkSd23-D0Xfgxw8ZCePSLSsBXpIUNaHZ8l6B7a2E2QfUwc0O2Jr0Y_X2YLmoWnapNnaOXvaVLZLUJ57UL3GedtZ5ahT4K00HxlubeZxR9LzRCHcZAHm8jxhC3P-wGznG2gBXlGKmJHuhAzgeL7GJH5fJ3J1fu3kpxtK5VXMgDBWasBlYmCtKZjlMIeuX4vbK7QYON71bhw71xExqNQpp9JdkW0OBX9-E8umAcqLnen_uInQfDTxWqes63VeSFKb9Yma77y6KloFBwMUf3sBy0xWaOFENbxMkDtO5bLbtzQ"
    },
    "new": true
  },
  "request": {
    "type": "LaunchRequest",
    "requestId": "EdwRequestId.46823a2c-b53e-4961-8f0e-3947f5eed83b",
    "locale": "en-US",
    "timestamp": "2017-02-09T04:41:11Z"
  },
  "version": "1.0"
};

// Call the Lambda function 
skill.handler(event, context);
