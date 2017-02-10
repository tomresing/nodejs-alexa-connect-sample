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
    "sessionId": "SessionId.b6033807-5a3c-48cd-9c03-5614b61ad68d",
    "application": {
      "applicationId": "amzn1.ask.skill.277b50fe-a169-455c-935b-a37ceade4757"
    },
    "attributes": {},
    "user": {
      "userId": "amzn1.ask.account.AGZDORGCJZNK2CDPWMUOYWLNCQ6Z36QESRGKZZ6PF5AEUJKHISUMRZH52UHPBYIJPGJC4YRMYPVWUNFILGOBVHNRLNETM6RJBX6NPN6YZUH2NT7F3WEMFIV3O6JR74OXBOIR2PLGUWYYGFYOG36DTRBWOIQTVDV7KI3APOZKCPK5JQD77KF7ISJZHGN52MYZRR3YW336TL7R3OY",
      "accessToken": "EwAwA8l6BAAU7p9QDpi/D7xJLwsTgCg3TskyTaQAAZfb2SMs5gvwPdqiqer1DAp8NmhDXFL7+UndytcZqxEdPcUD0fkEt69gbJS03M2WZW6hj+bGBjnKvKEhEzOP8nepWJcIyYKF4Vgj4Si32+3nF73tGOOAY8eMPi5KbJ5V9QvMxfVAfcKkHEtUmgxBtEqKfA2/z8rz7ZEbEAUenZunOSbxPvy+1F0ANitWRCQQYOlBszP2I+F53nXXE+FZN0VzYKyt6qq5eViB4KHEI9Bw8bWBKb/HCyPfS9GlcoE0+Lfrd8jD+hrJNxfQRbDUj8eHSSi9rRkquZkCMHirHMY2LXf31MIerGzSdUfJANQjFmi22uNvhoUiYj9HpML5zIUDZgAACGKIxYJfNUUkAAKp6OtURSdg5MkYqYNaAONlRGfIp8InlYr4aBNZVsfW3junzaQYdj4rA1YtrFl3zc+0jEdlFyrDy0b6LiN5A4Fmd07yO2ECNnq4LdmH1LBUnf3gHWgvNNq0DtEyU96Qlx1lz3ts05n+0fwByf51FWwwDpUJpFGQAV5q5GCW4KeSdnpgeLD4QvST1Gxi6QdXKu/OB2FC9+yzOQH6tX3bkY/BzyAA3m95WSYN6AyvOaU374/p8HZN0oXXCFwaeozclG22iluIW8BYU9WOgxkFe7FmW+anfjgO8doo8SnRzbjX64p1Xmf8j7isSJXeL0Wn0HKtbJ0zdRNnh/UnWBFX1kHPJEBRu/f2BdpA3EQC5T1rkXVvUvEPjjwZLChLMMNmxhj1ewkFzwsEwfqEb4L2n2+TWkyTCJWTp3C3khytD+QmKuW/6bGKXa7ZCFORDRB1CtzGmVumuu7RhaNYJ7sKtBs6MlWciZilfupBRxzhFMZM7qIVbwfhFWP7Em9VqCoCsdI6dE/QGIiLd9rhwN7IkvjihLlRLo4IwfQZmV2rJoVSzcFQGlcu/qukbLZT0tj08Bpuba10LFPBf9aKM9Q7xDSE7+DD0vlPMPnXz/muilDUG+Fa4hHnWcScOu0A1ZnRBLdY6bMGZdA0tzVFsSoMW/4gDKZ/qxDQ+S/gsNcmEsT2ASQC"
    },
    "new": true
  },
  "request": {
    "type": "IntentRequest",
    "requestId": "EdwRequestId.52e3d3e8-809b-4874-b2e3-8ec0b2b22cbb",
    "locale": "en-US",
    "timestamp": "2017-02-10T03:56:49Z",
    "intent": {
      "name": "SendMailIntent",
      "slots": {}
    }
  },
  "version": "1.0"
};

// Call the Lambda function 
skill.handler(event, context);
