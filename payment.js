document.addEventListener('DOMContentLoaded', () => {
    // Get stored data
    const userId = sessionStorage.getItem('userId');
    const serverId = sessionStorage.getItem('serverId');
    const diamonds = sessionStorage.getItem('diamonds');
    const price = sessionStorage.getItem('price');

    // Display stored data
    document.getElementById('userId').textContent = userId;
    document.getElementById('serverId').textContent = serverId;
    document.getElementById('items').textContent = diamonds;
    document.getElementById('price').textContent = price;

    document.getElementById('submitOrderButton').addEventListener('click', submitOrder);
});

async function submitOrder() {
    const userId = sessionStorage.getItem('userId');
    const serverId = sessionStorage.getItem('serverId');
    const diamonds = sessionStorage.getItem('diamonds');
    const price = sessionStorage.getItem('price');
    const receipt = document.getElementById('receipt').files[0];

    if (receipt) {
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('serverId', serverId);
        formData.append('diamonds', diamonds);
        formData.append('price', price);
        formData.append('receipt', receipt);

        // Send data to the backend (assume you have an API endpoint '/submitOrder')
        const response = await fetch('/submitOrder', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            // Send data to Telegram bot
            sendToTelegram(userId, serverId, diamonds, price, receipt);
        } else {
            alert('Failed to submit the order. Please try again.');
        }
    } else {
        alert('Please upload a receipt.');
    }
}

function sendToTelegram(userId, serverId, diamonds, price, receipt) {
    const telegramBotToken = '7558508004:AAEPzQlwjMMHqZD7K0ADj4ykRpLqUPkIhqw';
    const chatId = '7944725138';
    const message = `
        New Order
        User ID: ${userId}
        Server ID: ${serverId}
        Items: ${diamonds}
        Price: ${price}
    `;

    // Send message to Telegram bot
    fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    });

    // Send receipt photo to Telegram bot
    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('photo', receipt);

    fetch(`https://api.telegram.org/bot${telegramBotToken}/sendPhoto`, {
        method: 'POST',
        body: formData
    });
}
