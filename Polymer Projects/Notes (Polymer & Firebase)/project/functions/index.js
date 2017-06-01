var functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
admin.initializeApp(functions.config().firebase);


//Trigger that displays a welcome message on user creation
exports.addWelcomeMessages = functions.auth.user().onCreate(event => {
    const user = event.data;
    console.log('A new user signed in for the first time.');
    const fullName = user.displayName || 'Anonymous';
    console.log(fullName);
    return admin.database().ref('messages').push({
        name: 'Firebase Bot',
        photoUrl: '/images/firebase-logo.png', // Firebase logo
        text: "${fullName} signed in for the first time! Welcome!"
    });
    console.log('made it this far');
});



//Trigger that opens a webpage with a message on request
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from firebase backend");
});



const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);

console.log(gmailEmail);
console.log(gmailPassword);

const mailTransport = nodemailer.createTransport("smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com");

const APP_NAME = 'Journal';



//Trigger that sends a welcome email on user creation
exports.sendWelcomeEmail = functions.auth.user().onCreate(event => {
        const user = event.data;

        const email = user.email;
        const displayName = user.displayName;

        return sendWelcomeEmail(email, displayName);
});



//Trigger that sends a goodbye email on user deletion
exports.sendByeEmail = functions.auth.user().onDelete(event => {
    const user = event.data;
    const email = user.email;
    const displayName = user.displayName;

    return sendGoodbyEmail(email, displayName);
});

function sendWelcomeEmail(email, displayName) {
    const mailOptions = {
        from: '"MyCompany" <jdbender64@gmail.com>',
        to: email
    };

    mailOptions.subject = "Welcome to ${APP_NAME}!";
    mailOptions.text = "Hey ${displayName}!, Welcome to ${APP_NAME}. I hope you will enjoy our service.";
    return mailTransport.sendMail(mailOptions).then(() => {
            console.log('New welcome email sent to:', email);
    });
}

function sendGoodbyEmail(email, displayName) {
    const mailOptions = {
        from: '"MyCompany" <jdbender64@gmail.com>',
        to: email
    };

    mailOptions.subject = "Bye!";
    mailOptions.text = "Hey ${displayName}!, We confirm that we have deleted your ${APP_NAME} account.";
    return mailTransport.sendMail(mailOptions).then(() => {
            console.log('Account deletion confirmation email sent to:', email);
    });
}


//Trigger that erases specific user data from journal after account deletion
exports.cleanupUserData = functions.auth.user().onDelete(event => {
    const uid = event.data.uid;
    return admin.database().ref('/notes/{uid}').remove();
});