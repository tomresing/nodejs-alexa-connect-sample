/*
 * Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */
/*jslint es6 this:true */
"use strict";

// Amazon Alexa SDK
// https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs
var Alexa = require("alexa-sdk");

// Microsoft Graph JavaScript SDK
// npm install msgraph-sdk-javascript
const MicrosoftGraph = require("msgraph-sdk-javascript");

// Email helper
var emailHelper = require("./emailHelper.js");

// Graph client
var client = {};

// Message when the skill is first called
var WelcomeMessage = "Welcome to Graph Bot. . Here are some things you can say. . . Send Mail . . Send a test message . . or Send me mail";
var WelcomeMessageCard = 'Here are some things you can say:\n\n "Send Mail" \n "Send a test message" \n "Send me mail"';
var WelcomeMessageCardTitle = "Welcome to Graph Bot"

// Message for help intent
var HelpMessage = "Here are some things you can say. . . Send Mail . . Send a test message . . or Send me mail";
var HelpMessageCard = 'Here are some things you can say:\n\n "Send Mail" \n "Send a test message" \n "Send me mail"';
var HelpMessageCardTitle = "Graph Bot Help"

// Used to tell user skill is closing
var shutdownMessage = "Ok see you again soon.";

// Used to tell user to link their account to the skill
var linkAccountMessage = "Please link your Microsoft account to use this skill.";

// Response Card images
// An image cannot be larger than 2 MB
var responseCardImages = {
    // 720w x 480h
    smallImageUrl: "https://raw.githubusercontent.com/PaulStubbs/nodejs-alexa-connect-sample/master/skill/AlexaGraphBotCard720x480.png",
    // 1200w x 800h
    largeImageUrl: "https://raw.githubusercontent.com/PaulStubbs/nodejs-alexa-connect-sample/master/skill/AlexaGraphBotCard1200x800.png"
};

// Entry point for Alexa
exports.handler = function(event, context, callback) {

    // DEBUG: return all the environment varibles
    console.log(process.env)
    // DEBUG: return the Node version info
    console.log(process.versions);

    // Verify that the Request is Intended for Your Service
    // This value is set on the server or in the .env file
    // SETUP NOTE: Add Lambda Environment Variable called ApplicationId
    var appId = process.env.ApplicationId;

    var alexa = Alexa.handler(event, context);
    alexa.appId = appId;
    alexa.registerHandlers(handlers);

    // Get the OAuth 2.0 Bearer Token from the linked account
    var token = event.session.user.accessToken;
    console.log("AuthToken: " + token);

    // validate the Auth Token
    if (token) {
        // TODO: validate the token

        // Initialize the Microsoft Graph client
        client = MicrosoftGraph.Client.init({
            authProvider: (done) => {
                done(null, token);
            }
        });

        // Handle the intent
        alexa.execute();

    } else {

        // DEBUG: no token! display card and let user know they need to sign in
        console.log("No Token");
        var speechOutput = linkAccountMessage;
        alexa.emit(":tellWithLinkAccountCard", speechOutput);
    }
};


var handlers = {
    "LaunchRequest": function () {
        console.log("LaunchRequest");
        var speechOutput = WelcomeMessage;
        var repromptSpeech = WelcomeMessage;
        var cardTitle = WelcomeMessageCardTitle;
        var cardContent = WelcomeMessageCard;
        this.emit(":askWithCard", speechOutput, repromptSpeech, cardTitle, cardContent, responseCardImages);
    },
    "SessionEndedRequest": function () {
        console.log("SessionEndedRequest");
        var speechOutput = shutdownMessage;
        this.emit(":tell", speechOutput);
    },
    "SendMailIntent": function () {
        console.log("SendMailIntent");

        SendMailIntent(this);

    },
    "AMAZON.StopIntent": function() {
        console.log("StopIntent");
        var speechOutput = shutdownMessage;
        this.emit(":tell", speechOutput);
    },
    // Let the user completely exit the skill
    "AMAZON.CancelIntent": function() {
        console.log("CancelIntent");
        this.emit(":tell", shutdownMessage);
    },
    // Provide help about how to use the skill
    "AMAZON.HelpIntent": function () {
        console.log("HelpIntent");
        var speechOutput = HelpMessage;
        var repromptSpeech = HelpMessage;
        var cardTitle = HelpMessageCardTitle;
        var cardContent = HelpMessageCard;
        this.emit(":askWithCard", speechOutput, repromptSpeech, cardTitle, cardContent, responseCardImages);
    },
    // Catch everything else
    "Unhandled": function () {
        console.log("Unhandled Intent");
        var speechOutput = HelpMessage;
        var repromptSpeech = HelpMessage;
        this.emit(":ask", speechOutput, repromptSpeech);
    }
};

function SendMailIntent(alexaResponse){
        // get the authenticated user info
        getUser(alexaResponse)
        // **
        // handle the getUser results
        .catch(function(err){
            console.log("getUser Error: " + JSON.stringify(err));
        })
        .then(function(user){
            // then send a mail to the current user
            return sendMail(user);
        })
        // **
        // handle the sendMail results
        .catch(function(err){
            console.log("sendMail Error: " + JSON.stringify(err));
            alexaResponse.emit(":tell", "There was an error sending the mail");
        })
        .then(function(mail){
            // then send confirmation back to alexa
            var mailSubject = mail.Message.Subject;
            console.log("Mail Sent: " + JSON.stringify(mail));
            //return the results to Alexa
            //return alexaResponse.emit(":tell", "Mail Sent to you.");
            return alexaResponse.emit(":tell", "Mail sent to you with a subject of " + mailSubject);
        })
}

function getUser(){
    //Make a call to the Graph API
    return client
            .api("/me")
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

    //DEBUG: log the user
    console.log("displayName: " + displayName + 
                " destinationEmailAddress: " + destinationEmailAddress); 

    //Make a call to the Graph API
    client
        .api("/me/sendMail")
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

