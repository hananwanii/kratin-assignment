const form = document.getElementById('reminderForm');
const responseMsg = document.getElementById('response');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const recipient = form.recipient.value;
  const message = form.message.value;

  try {
    const response = await fetch('/send-reminder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipient, message }),
    });

    if (response.ok) {
      responseMsg.textContent = 'Reminder sent successfully!';
    } else {
      responseMsg.textContent = 'Error sending reminder.';
    }
  } catch (error) {
    responseMsg.textContent = 'An error occurred while sending the reminder.';
  }
});
