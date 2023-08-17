const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const port = 3000;

// Twilio configuration
const accountSid = 'AC39d2b8c5965a3ef542a8574869c08a35';
const authToken = 'f2ea7b620d05831d03f4bbdab1dcd80c';
const twilioPhoneNumber = '++18146489445';

const client = new twilio(accountSid, authToken);

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });

app.post('/send-reminder', (req, res) => {
  const { recipient, message } = req.body;

  client.messages
    .create({
      body: message,
      from: twilioPhoneNumber,
      to: recipient,
    })
    .then(message => {
      console.log(`Reminder sent: ${message.sid}`);
      res.sendStatus(200);
    })
    .catch(error => {
      console.error(`Error sending reminder: ${error}`);
      res.status(500).send('Error sending reminder');
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
