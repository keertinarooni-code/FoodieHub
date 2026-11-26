
// Restaurant Data
const restaurants = [
    {
        name: "Pizza Paradise",
        category: "Pizza",
        price: 299,
        rating: "4.5",
        time: "25-30 min",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600"
    },
    {
        name: "Burger House",
        category: "Burger",
        price: 199,
        rating: "4.3",
        time: "20-25 min",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600"
    },
    {
        name: "Royal Biryani",
        category: "Biryani",
        price: 249,
        rating: "4.7",
        time: "30-35 min",
        image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=600"
    },
    {
        name: "Chinese Wok",
        category: "Chinese",
        price: 179,
        rating: "4.2",
        time: "20-30 min",
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600"
    },
    {
        name: "Sweet Treats",
        category: "Dessert",
        price: 149,
        rating: "4.6",
        time: "15-20 min",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600"
    },
    {
        name: "Italian Kitchen",
        category: "Pizza",
        price: 349,
        rating: "4.4",
        time: "25-30 min",
        image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600"
    }
];

// Cart Array
let cart = [];

// Display Restaurants
function displayRestaurants(data) {
    const container = document.getElementById("restaurantContainer");

    container.innerHTML = "";

    if (data.length === 0) {
        container.innerHTML = "<p>No restaurants found!</p>";
        return;
    }

    data.forEach((restaurant) => {
        const originalIndex = restaurants.indexOf(restaurant);

        const card = document.createElement("div");
        card.className = "restaurant-card";

        card.innerHTML = `
            <img src="${restaurant.image}" alt="${restaurant.name}">
            <div class="card-details">
                <h3>${restaurant.name}</h3>
                <span class="rating">★ ${restaurant.rating}</span>

                <div class="card-info">
                    <span>${restaurant.category}</span>
                    <span>${restaurant.time}</span>
                </div>

                <p class="price">₹${restaurant.price} for one</p>

                <br>

                <button class="add-btn"
                onclick="addToCart(${originalIndex})">
                    Add to Cart
                </button>
            </div>
        `;

        container.appendChild(card);
    });
}

// Search Food
function searchFood() {
    const searchValue = document
        .getElementById("searchInput")
        .value.toLowerCase().trim();

    const filtered = restaurants.filter(item =>
        item.name.toLowerCase().includes(searchValue) ||
        item.category.toLowerCase().includes(searchValue)
    );

    displayRestaurants(filtered);
}

// Category Filter
function filterFood(category) {
    if (category === "All") {
        displayRestaurants(restaurants);
    } else {
        const filtered = restaurants.filter(item =>
            item.category === category
        );

        displayRestaurants(filtered);
    }

    document.getElementById("restaurants")
        .scrollIntoView({ behavior: "smooth" });
}

// Add to Cart
function addToCart(index) {
    const restaurant = restaurants[index];

    const existingItem = cart.find(
        item => item.name === restaurant.name
    );

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...restaurant,
            quantity: 1
        });
    }

    updateCart();

    alert(restaurant.name + " added to cart!");
}

// Update Cart
function updateCart() {
    const count = cart.reduce(
        (total, item) => total + item.quantity, 0
    );

    document.getElementById("cartCount").innerText = count;

    const cartItems = document.getElementById("cartItems");

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty!</p>";
    }

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItems.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong>
                    <p>₹${item.price} × ${item.quantity}</p>
                </div>

                <div>
                    <strong>₹${itemTotal}</strong>
                    <br>
                    <button class="remove-btn"
                    onclick="removeItem(${index})">
                        Remove
                    </button>
                </div>
            </div>
        `;
    });

    document.getElementById("cartTotal").innerText =
        "Total: ₹" + total;
}

// Remove Cart Item
function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

// Show Cart
function showCart() {
    updateCart();

    document.getElementById("cartModal").style.display = "flex";
}

// Close Cart
function closeCart() {
    document.getElementById("cartModal").style.display = "none";
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Thank you for ordering with FoodieHub! Your order has been placed.");

    cart = [];

    updateCart();
    closeCart();
}

// Search when Enter is pressed
document.getElementById("searchInput")
    .addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            searchFood();
        }
    });

// Initial Display
displayRestaurants(restaurants);
