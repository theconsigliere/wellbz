// Put your applicaiton javascript here

window.onload = function() {
  var jsButton = document.querySelectorAll(".js-quantity-button");
  var form = document.getElementById("AddToCartForm");
  var quantity = form.querySelector("js-quantity-field");
  var quantityValue = parseInt(quantity.val());
  var max = quantity.attr("max") ? parseInt(quantity.attr("max")) : null;

  jsButton.forEach(button => {
    button.addEventListener("click", () => {
      // alert("button clicked");
      if (jsButton.classList.contains(".plus")) {
        quantity.val(quantityValue + 1);
      } else if (jsButton.classList.contains(".minus")) {
      }
    });
  });
};
