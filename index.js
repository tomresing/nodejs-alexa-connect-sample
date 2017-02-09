/*
 * Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

'use strict';
// Amazon Alexa SDK
// https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs
var Alexa = require("alexa-sdk");

// Verify that the Request is Intended for Your Service
var appId = 'amzn1.ask.skill.277b50fe-a169-455c-935b-a37ceade4757';

// Microsoft Graph JavaScript SDK
// npm install msgraph-sdk-javascript
const MicrosoftGraph = require("msgraph-sdk-javascript");

// Email helper
var emailHelper = require("./emailHelper.js");

// Graph client
var client = {};

// Message when the skill is first called
var welcomeMessage = "Welcome to Graph Bot. Graph Bot can send you an email by saying, Send me mail. What would you like? ";

// Message for help intent
var HelpMessage = "Here are some things you can say: Send Mail. Send a test message. or Send me mail";

// Used to tell user skill is closing
var shutdownMessage = "Ok see you again soon.";

// Used to tell user to link their account to the skill
var linkAccountMessage = "Please link your Microsoft account to use this skill.";

// Response Card images
// An image cannot be larger than 2 MB
var responseCardImages = {
    // 720w x 480h
    smallImageUrl: 'https://imgs.xkcd.com/comics/standards.png',
    // 1200w x 800h
    largeImageUrl: 'https://imgs.xkcd.com/comics/standards.png'
};

// Entry point for Alexa
exports.handler = function(event, context, callback) {

    // DEBUG: return the Node version info
    console.log(process.versions);

    var alexa = Alexa.handler(event, context);
    alexa.appId = appId;
    alexa.registerHandlers(handlers);

    // Get the OAuth 2.0 Bearer Token from the linked account
    var token = event.session.user.accessToken;
    console.log("AuthToken: " + token);

    // validate the Auth Token
    if (token) {
        //has a token
        // Initialize the Microsoft Graph client

        client = MicrosoftGraph.Client.init({
            authProvider: (done) => {
                done(null, token);
            }
        });

        // Handle the intent
        alexa.execute();

    } else {
        //no token! display card and let user know they need to sign in
        var speechOutput = linkAccountMessage
        alexa.emit(':tellWithLinkAccountCard', speechOutput);
    }
};


var handlers = {
    'LaunchRequest': function () {
        console.log('LaunchRequest');
        var speechOutput = "Welcome to Graph Bot." + HelpMessage;
        var repromptSpeech = HelpMessage;      
        this.emit(':ask', speechOutput, repromptSpeech);
    },
    'SendMailIntent': function () {   
        console.log('SendMailIntent');

        SendMailIntent(this);

    },
    "AMAZON.StopIntent": function() {
        console.log('StopIntent');
        var speechOutput = shutdownMessage
        this.emit(':tell', speechOutput);  
    },
    // Let the user completely exit the skill
    "AMAZON.CancelIntent": function() {
        console.log('CancelIntent');
        this.emit(':tell', shutdownMessage);  
    },
    // Provide help about how to use the skill 
    "AMAZON.HelpIntent": function () {
        console.log('HelpIntent');
        var speechOutput = HelpMessage;
        var repromptSpeech = HelpMessage;
        var cardTitle = 'Graph Bot Help';
        var cardContent = 'Visit http://GitHub.com/paulstubbs/ for more info.';
        this.emit(':askWithCard', speechOutput, repromptSpeech, cardTitle, cardContent, responseCardImages);
    },
    // Catch everything else
    'Unhandled': function () {
        console.log('Unhandled Intent');
        var speechOutput = HelpMessage;
        var repromptSpeech = HelpMessage;
        this.emit(':ask', speechOutput, repromptSpeech);
    }
};

function SendMailIntent(alexaResponse){
        
        //var alexaResponse = this;

        // get the authenticated user info
        getUser(alexaResponse)
        // **
        // handle the getUser results
        .catch(function(err){
            console.log("getUser Error: " + JSON.stringify(err));
        })
        .then(function(user){
            // then send a mail to the current user
            return sendMail(user)
        })
        // **
        // handle the sendMail results
        .catch(function(err){
            console.log("sendMail Error: " + JSON.stringify(err));
            alexaResponse.emit(':tell', "There was an error sending the mail");
        })
        .then(function(mail){
            // then send confirmation back to alexa
            var mailSubject = mail.Message.Subject;
            console.log("Mail Sent: " + JSON.stringify(mail));
            //return the results to Alexa
            //return alexaResponse.emit(':tell', "Mail Sent to you.");
            return alexaResponse.emit(':tell', "Mail sent to you with a subject of " + mailSubject);
        })
}

function getUser(){
        
    //Make a call to the Graph API
    return client
            .api('/me')
            .get();  
}

function sendMail(user){

    return new Promise(function(resolve, reject){

    var destinationEmailAddress = user.userPrincipalName;
    var displayName = user.displayName;

    var mail = emailHelper.generateMailBody(
        displayName,
        destinationEmailAddress
    );

    //Make a call to the Graph API
    client
        .api('/me/sendMail')
        .post({message: mail.Message}, (err, res) => {
            if(err){
                console.log("sendMail Error: " + JSON.stringify(err));
                reject(err);
            }else{
                // log the sendMail results
                console.log("sendMail successful: ");
                // return the mail that was sent
                resolve(mail);
            }
    });

    }) //end Promise
}

