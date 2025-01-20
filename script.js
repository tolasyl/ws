document.getElementById('diamonds').addEventListener('change', updatePrice);
document.getElementById('checkoutButton').addEventListener('click', proceedToCheckout);

function updatePrice() {
    const diamondPrices = {
        '100': 10, // $10 for 100 diamonds
        '500': 45, // $45 for 500 diamonds
        '1000': 85 // $85 for 1000 diamonds
    };

    const selectedDiamonds = document.getElementById('diamonds').value;
    const price = diamondPrices[selectedDiamonds];
    document.getElementById('price').value = `$${price}`;
}

function proceedToCheckout() {
    const userId = document.getElementById('userId').value;
    const serverId = document.getElementById('serverId').value;
    const diamonds = document.getElementById('diamonds').value;
    const price = document.getElementById('price').value;

    // Save user input in session storage (or send to backend)
    sessionStorage.setItem('userId', userId);
    sessionStorage.setItem('serverId', serverId);
    sessionStorage.setItem('diamonds', diamonds);
    sessionStorage.setItem('price', price);

    // Redirect to the payment page
    window.location.href = 'payment.html';
}
