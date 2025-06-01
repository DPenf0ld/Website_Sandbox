
    const form = document.getElementById('chatForm');
    const messagesDiv = document.getElementById('messages');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const input = document.getElementById('userMessage');
      const userMsg = input.value;
      input.value = '';

      addMessage(userMsg, 'user');

      try {
        const res = await fetch('https://dmpaiautomation.app.n8n.cloud/webhook/4d2d711c-f911-41ef-9da9-0ca81c37c9ae', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userMsg })
        });

        const data = await res.json();
        addMessage(data.reply || 'No response received.', 'bot');
      } catch (err) {
        addMessage('Error contacting AI agent.', 'bot');
        console.error(err);
      }
    });

    function addMessage(text, sender) {
      const msg = document.createElement('div');
      msg.className = `message ${sender}`;
      msg.textContent = text;
      messagesDiv.appendChild(msg);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

