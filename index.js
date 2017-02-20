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

// Adding logging levels
// error -  Other runtime errors or unexpected conditions. 
// warn -   'Almost' errors, other runtime situations that are undesirable 
//          or unexpected, but not necessarily "wrong".
// info -   Interesting runtime events (startup/shutdown/Intents). 
// debug -  Detailed information on the flow through the system. 
var logLevels = {error: 3, warn: 2, info: 1, debug: 0};

// get the current log level from the current environment if set, else set to info
var currLogLevel = process.env.LOG_LEVEL != null ? process.env.LOG_LEVEL : 'info';

// print the log statement, only if the requested log level is greater than the current log level
function log(statement, logLevel) {

    // no loglevel, set to debug
    if(!logLevel){
        logLevel = logLevels.debug;
    }
    // output log if greater then log level
    if(logLevel >= logLevels[currLogLevel] ) {
        console.log(statement);
    }
}

// Entry point for Alexa
exports.handler = function(event, context, callback) {

    // DEBUG: return all the environment varibles
    log(process.env, logLevels.debug);
    // DEBUG: return the Node version info
    log(process.versions, logLevels.debug);

    // Verify that the Request is Intended for Your Service
    // This value is set on the server or in the .env file
    // SETUP NOTE: Add Lambda Environment Variable called ApplicationId
    var appId = process.env.ApplicationId;

    var alexa = Alexa.handler(event, context);
    alexa.appId = appId;
    alexa.registerHandlers(handlers);

    // Get the OAuth 2.0 Bearer Token from the linked account
    var token = event.session.user.accessToken;

    // validate the Auth Token
    if (token) {
        log("Auth Token: " + token, logLevels.debug);
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
        // no token! display card and let user know they need to sign in
        log("No Auth Token", logLevels.warn);
        var speechOutput = linkAccountMessage;
        alexa.emit(":tellWithLinkAccountCard", speechOutput);
    }
};


var handlers = {
    "LaunchRequest": function () {
        log("LaunchRequest", logLevels.info);
        var speechOutput = WelcomeMessage;
        var repromptSpeech = WelcomeMessage;
        var cardTitle = WelcomeMessageCardTitle;
        var cardContent = WelcomeMessageCard;
        this.emit(":askWithCard", speechOutput, repromptSpeech, cardTitle, cardContent, responseCardImages);
    },
    "SessionEndedRequest": function () {
        log("SessionEndedRequest", logLevels.info);
        var speechOutput = shutdownMessage;
        this.emit(":tell", speechOutput);
    },
    "SendMailIntent": function () {
        log("SendMailIntent", logLevels.info);

        SendMailIntent(this);

    },
    "AMAZON.StopIntent": function() {
        log("StopIntent", logLevels.info);
        var speechOutput = shutdownMessage;
        this.emit(":tell", speechOutput);
    },
    // Let the user completely exit the skill
    "AMAZON.CancelIntent": function() {
        log("CancelIntent", logLevels.info);
        this.emit(":tell", shutdownMessage);
    },
    // Provide help about how to use the skill
    "AMAZON.HelpIntent": function () {
        log("HelpIntent", logLevels.info);
        var speechOutput = HelpMessage;
        var repromptSpeech = HelpMessage;
        var cardTitle = HelpMessageCardTitle;
        var cardContent = HelpMessageCard;
        this.emit(":askWithCard", speechOutput, repromptSpeech, cardTitle, cardContent, responseCardImages);
    },
    // Catch everything else
    "Unhandled": function () {
        log("Unhandled Intent", logLevels.info);
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
            log("getUser Error: " + JSON.stringify(err), logLevels.error);
        })
        .then(function(user){
            // then send a mail to the current user
            return sendMail(user);
        })
        // **
        // handle the sendMail results
        .catch(function(err){
            log("sendMail Error: " + JSON.stringify(err), logLevels.error);
            alexaResponse.emit(":tell", "There was an error sending the mail");
        })
        .then(function(mail){
            // then send confirmation back to alexa
            var mailSubject = mail.Message.Subject;
            log("Mail Sent: " + JSON.stringify(mail), logLevels.debug);
            //return the results to Alexa
            return alexaResponse.emit(":tell", "Mail sent to you with a subject of " + mailSubject);
        })
}

function getUser(){
    log("getUser", logLevels.debug)
    //Make a call to the Graph API
    return client
            .api("/me")
            .get();
}

function sendMail(user){
    log("sendMail: " + JSON.stringify(user), logLevels.debug)

    return new Promise(function(resolve, reject){

    var destinationEmailAddress = user.userPrincipalName;
    var displayName = user.displayName;

    log("sendMail: email: " + destinationEmailAddress + " name: " + displayName, logLevels.info);
    var mail = emailHelper.generateMailBody(
        displayName,
        destinationEmailAddress
    );

    //DEBUG: log the user
    log("displayName: " + displayName + 
                " destinationEmailAddress: " + destinationEmailAddress); 

    //Make a call to the Graph API
    client
        .api("/me/sendMail")
        .post({message: mail.Message}, (err, res) => {
            if(err){
                log("sendMail Error: " + JSON.stringify(err));
                reject(err);
            }else{
                // log the sendMail results
                log("sendMail successful: ");
                // return the mail that was sent
                resolve(mail);
            }
    });

    }) //end Promise
}

