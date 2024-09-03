
document.addEventListener("DOMContentLoaded", function() {
    let cart = [];
    let total = 0;

    
    const newsletterForm = document.querySelector('.newsletter form');
    newsletterForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (validateEmail(email)) {
            alert("Thank you for subscribing with " + email + "!");
            emailInput.value = ''; 
        } else {
            alert("Please enter a valid email address.");
        }
    });


    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }


    const products = document.querySelectorAll('.product');
    products.forEach(function(product) {
        const productName = product.querySelector('h2').textContent;
        const productPrice = parseFloat(product.querySelector('p').textContent.replace('$', ''));

   
        const addToCartBtn = document.createElement('button');
        addToCartBtn.textContent = "Add to Cart";
        addToCartBtn.classList.add('add-to-cart-btn');
        product.appendChild(addToCartBtn);


        addToCartBtn.addEventListener('click', function() {
            addToCart(productName, productPrice);
            alert(productName + " has been added to your cart at $" + productPrice.toFixed(2));
            updateCartDisplay();
        });
    });


    function addToCart(name, price) {
        let existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name: name, price: price, quantity: 1 });
        }
        total += price;
    }


    function formatCartContents() {
        let cartContents = "Your Cart:\n\n";
        cart.forEach(item => {
            cartContents += `${item.name} - Quantity: ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
        });
        cartContents += `\nTotal: $${total.toFixed(2)}`;
        return cartContents;
    }


    function updateCartDisplay() {
        const cartContents = document.getElementById('cartContents');
        if (cart.length === 0) {
            cartContents.innerHTML = "<p>Your cart is empty.</p>";
        } else {
            let cartHTML = "<ul>";
            cart.forEach(item => {
                cartHTML += `<li>${item.name} - Quantity: ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</li>`;
            });
            cartHTML += "</ul>";
            cartHTML += `<p><strong>Total: $${total.toFixed(2)}</strong></p>`;
            cartContents.innerHTML = cartHTML;
        }
    }

   
    const viewTotalBtn = document.getElementById('viewTotalBtn');
    viewTotalBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            alert("Your cart is empty.");
        } else {
            alert(formatCartContents());
        }
    });


    updateCartDisplay();
});
