require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/test', (req, res) => {
    res.send("MindConnect USSD service is running");
});


app.post('/ussd', async (req, res) => {
    const { sessionId, serviceCode, phoneNumber, text } = req.body;
    let response = '';

    if (!text) {
        
        response = `CON Welcome to MindConnect: AI-Powered Mental Health Support
1. Get Immediate Support
2. Self-Help Resources
3. Talk to a Therapist
4. Exit`;
    } else if (text === '1') {
        
        response = `CON You are not alone. What are you experiencing?
1. Feeling Depressed
2. Anxious & Overwhelmed
3. Mood Interfering with Performance
4. Can’t Find Purpose
5. Grieving
6. Experienced Trauma
7. Gain Self Confidence
8. Improve Myself but Don’t Know Where to Start
9. Go Back`;
    } else if (text.startsWith('1*')) {
       
        const issueOptions = {
            "1": "Feeling Depressed",
            "2": "Anxious & Overwhelmed",
            "3": "Mood Interfering with Performance",
            "4": "Can’t Find Purpose",
            "5n": "Grieving",
            "6": "Experienced Trauma",
            "7": "Gain Self Confidence",
            "8": "Improve Myself but Don’t Know Where to Start"
        };

        const selectedOption = text.split('*')[1];

        if (issueOptions[selectedOption]) {
            
            response = `END You have selected: ${issueOptions[selectedOption]}. We are here to support you.`;
        } else {
            response = `END Invalid selection. Please try again.`;
        }
    } else if (text === '2') {
     
        response = `CON Choose a topic:
1. Coping with Depression
2. Managing Anxiety
3. Dealing with Trauma
4. Self-Confidence Building
5. Finding Life Purpose
6. Go Back`;
    } else if (text === '3') {
        
        response = `CON Would you like to:
1. Request a call from a therapist
2. Get therapist contact details via SMS
3. Go Back`;
    } else {
        response = `END Invalid selection. Please try again.`;
    }

    res.set('Content-Type', 'text/plain');
    res.send(response);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`MindConnect USSD server running on port ${PORT}`);
});
