// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
var stripe = require("stripe")("sk_test_BQokikJOvBiI2HlWgH4olfQ2");

// Token is created using Stripe.js or Checkout!
// Get the payment token submitted by the form:
var token = request.body.stripeToken;
var elements = stripe.elements();
let amount = "4500";

// Custom styling can be passed to options when creating an Element.

// Token is created using Stripe.js or Checkout!
// Get the payment token submitted by the form:
var token = request.body.stripeToken.id; // Using Express

// Charge the user's card:
var charge = stripe.charges.create({
  amount,
  currency: "usd",
  description: "Example charge",
  source: stripeToken.id,
}, function(err, charge) {
  // asynchronously called
},
    console.log("charge created")
);

// Custom styling can be passed to options when creating an Element.
var style = {
  base: {
    color: '#32325d',
    lineHeight: '24px',
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4'
    }
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a'
  }
};

// Create an instance of the card Element
var card = elements.create('card', {style: style});

// Add an instance of the card Element into the `card-element` <div>
card.mount('#card-element');

//Tells the user if they made a typing error
card.addEventListener('change', function(event) {
  var displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = "Re-enter your data.";
  }
});


// Create a token or display an error when the form is submitted.
var form = document.getElementById('payment-form');
form.addEventListener('submit', function(event) {
  event.preventDefault();

  stripe.createToken(card).then(function(result) {
    if (result.error) {
      // Inform the user if there was an error
      var errorElement = document.getElementById('card-errors');
      errorElement.textContent = result.error.message;
    } else {
      // Send the token to your server
      stripeTokenHandler(result.token);
    }
  });
});

function stripeTokenHandler(token) {
  // Insert the token ID into the form so it gets submitted to the server
  var form = document.getElementById('payment-form');
  var hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'stripeToken');
  hiddenInput.setAttribute('value', token.id);
  form.appendChild(hiddenInput);

  // Submit the form
  form.submit();
}

stripe.coupons.create({
  amount_off: 500,
  duration: 'forever',
  id: 'ACM'
}, function(err, coupon) {
  // asynchronously called
  console.log(coupon);
});

stripe.coupons.retrieve(
  "ACM",
  function(err, coupon) {
    // asynchronously called
    console.log(coupon);
  }
);