const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
const port = 3000;

// Twilio configuration
const accountSid = 'AC39d2b8c5965a3ef542a8574869c08a35';
const authToken = '29902490ccdbff7da4cd07e984119786';
const client = new twilio(accountSid, authToken);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.send('Customized Reminders System');
});

app.post('/send-reminder', (req, res) => {
  const { recipient, message } = req.body;

  client.messages
    .create({
      body: message,
      from: '+18146489445',
      to: recipient,
    })
    .then(message => {
      console.log(`Reminder sent: ${message.sid}`);
      res.send('Reminder sent successfully');
    })
    .catch(error => {
      console.error(`Error sending reminder: ${error}`);
      res.status(500).send('Error sending reminder');
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
