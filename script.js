const popup = document.getElementById("popup");
const closeBtn = document.getElementById("closeBtn");
const openPopup = document.getElementById("openPopup");
const loginBtn = document.getElementById("loginBtn");

// auto show popup after 1.2s if not logged in

window.addEventListener("load", () => {

  const loggedInUser =
    localStorage.getItem("loggedInUser");

  if (popup && !loggedInUser) {

    setTimeout(() => {

      popup.style.display = "flex";

    }, 1200);

  }

  updateNavbar();

});

// close popup

if (closeBtn) {

  closeBtn.addEventListener("click", () => {

    popup.style.display = "none";

  });

}

//open popup

if (openPopup) {

  openPopup.addEventListener("click", () => {

    popup.style.display = "flex";

  });

}

// login / signup logic here

if (loginBtn) {

  loginBtn.addEventListener("click", () => {

    const email =
      document.getElementById("email").value.trim();

    const password =
      document.getElementById("password").value.trim();

    // EMPTY VALIDATION here

    if (email === "" || password === "") {

      alert("Please fill all fields");
      return;

    }

    // EMAIL VALIDATION here

    const emailPattern =
      /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!email.match(emailPattern)) {

      alert("Please enter valid email");
      return;

    }

    // PASSWORD VALIDATION here

    if (password.length <= 6) {

      alert("Password must be minimum 6 characters");
      return;

    }

    // USERS ARRAY

    let users =
      JSON.parse(localStorage.getItem("users")) || [];

    // FIND USER

    const existingUser =
      users.find(user => user.email === email);

    // login logic here

    if (existingUser) {

      if (existingUser.password === password) {

        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(existingUser)
        );

        alert("Login Successful ✔");

        popup.style.display = "none";

        updateNavbar();

      }

      else {

        alert("Incorrect Password");

      }

    }

    // signup logic here

    else {

      const newUser = {

        email: email,
        password: password

      };

      users.push(newUser);

      localStorage.setItem(
        "users",
        JSON.stringify(users)
      );

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(newUser)
      );

      alert("Account Created Successfully ...");

      popup.style.display = "none";

      updateNavbar();

    }

  });

}

//update navbar based on login status

function updateNavbar() {

  const navBtn =
    document.getElementById("openPopup");

  const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser"));

  if (!navBtn) return;

  if (loggedInUser) {

    navBtn.innerHTML = "Logout";

    navBtn.onclick = logout;

  }

  else {

    navBtn.innerHTML = "Login";

    navBtn.onclick = () => {

      popup.style.display = "flex";

    };

  }

}

//logout logic here

function logout() {

  localStorage.removeItem("loggedInUser");

  alert("Logged Out");

  window.location.reload();

}

//ADD TO CART LOGIC HERE

function addToCart(name, price) {

  const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser"));

  if (!loggedInUser) {

    alert("Please login first");

    popup.style.display = "flex";

    return;

  }

  let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({

    name: name,
    price: price

  });

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  alert(name + " added to cart 🛒");

}

// Show the cart items

function displayCart() {

  const cartItems =
    document.getElementById("cartItems");

  const totalPrice =
    document.getElementById("totalPrice");

  if (!cartItems || !totalPrice) return;

  let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  cartItems.innerHTML = "";

  let total = 0;

  if (cart.length === 0) {

    cartItems.innerHTML = `

      <div class="cart-item">

        <h3>Your cart is empty</h3>

      </div>

    `;

    totalPrice.innerText = "Total: $0";

    return;

  }

  cart.forEach((item, index) => {

    total += item.price;

    cartItems.innerHTML += `

      <div class="cart-item">

        <div>

          <h3>${item.name}</h3>

          <p>$${item.price}</p>

        </div>

        <button onclick="removeItem(${index})">

          Remove

        </button>

      </div>

    `;

  });

  totalPrice.innerText =
    `Total: $${total}`;

}

// call CART

displayCart();

// reomeve item

function removeItem(index) {

  let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  cart.splice(index, 1);

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  displayCart();

}

// remove all items from cart

function clearCart() {

  localStorage.removeItem("cart");

  displayCart();

  alert("Cart Cleared");

}

// Buy now logic here

function buyNow(name, price) {

  const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser"));

  if (!loggedInUser) {

    alert("Please login first");

    popup.style.display = "flex";

    return;

  }

  let cart = [];

  cart.push({

    name: name,
    price: price

  });

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  window.location.href = "checkout.html";

}

// order place logic here

const orderForm =
  document.getElementById("orderForm");

if (orderForm) {

  orderForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const loggedInUser =
      JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {

      alert("Please login first");

      return;

    }

    alert("Order Placed Successfully 🎉");

    localStorage.removeItem("cart");

    window.location.href = "index.html";

  });

}
//  contactForm

const contactForm =
  document.getElementById("contactForm");

if (contactForm) {

  contactForm.addEventListener("submit", (e) => {

    e.preventDefault();

    alert("Message Sent Successfully ✔");

    contactForm.reset();

  });


}
// NEWSLETTER SUBSCRIBE LOGIC

const subscribeBtn = document.querySelector(".newsletter-box button");

subscribeBtn.addEventListener("click", () => {

  const emailInput = document.querySelector(".newsletter-box input");

  if(emailInput.value === ""){

    alert("Please enter your email");

  }

  else{

    alert("Subscribed Successfully!");

    emailInput.value = "";

  }

});