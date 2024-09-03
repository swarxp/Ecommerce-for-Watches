document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartCountElement = document.getElementById('cart-count');
    const cartListElement = document.getElementById('cart-list');
    const cartTotalElement = document.getElementById('cart-total');

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });

    function addToCart(event) {
        const productElement = event.target.closest('.product');
        const productId = productElement.dataset.id;
        const productName = productElement.querySelector('h2').textContent;
        const productPrice = parseFloat(productElement.querySelector('p').textContent.replace('$', ''));

        const existingProduct = cart.find(item => item.id === productId);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
        }

        updateCart();
    }

    function updateCart() {
        cartCountElement.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        cartListElement.innerHTML = cart.map(item => `
            <li>
                ${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
            </li>
        `).join('');
        cartTotalElement.textContent = cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    }

    document.getElementById('checkout').addEventListener('click', () => {
        alert('Checkout feature coming soon!');
    });
});
