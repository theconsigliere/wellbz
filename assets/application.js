// Put your applicaiton javascript here

$(document).ready(function() {
  $(document).on("click", ".js-quantity-button", function(event) {
    let $button = $(this),
      $form = $button.closest("form"),
      $quantity = $form.find(".js-quantity-field"),
      quantityValue = parseInt($quantity.val()),
      max = $quantity.attr("max") ? parseInt($quantity.attr("max")) : null;

    if ($button.hasClass("plus")) {
      // do something for the plus click
      $quantity.val(quantityValue + 1).change();
    } else if ($button.hasClass("minus")) {
      // do something for minus click
      $quantity.val(quantityValue - 1).change();
    }
  });

  $(document).on("change", ".js-quantity-field", function(event) {
    let $field = $(this),
      $form = $field.closest("form"),
      $quantityText = $form.find(".js-quantity-text"),
      shouldDisableMinus = parseInt(this.value) === 1,
      $minusButton = $form.find(".js-quantity-button.minus");

    $quantityText.text(this.value);

    if (shouldDisableMinus) {
      $minusButton.prop("disabled", true);
    } else if ($minusButton.prop("disabled") === true) {
      $minusButton.prop("disabled", false);
    }
  });
});

// window.onload = function() {
//   var jsButton = document.querySelectorAll(".js-quantity-button");
//   var form = document.getElementById("AddToCartForm");
//   var quantity = form.querySelector("js-quantity-field");
//   var quantityValue = parseInt(quantity.val());
//   var max = quantity.attr("max") ? parseInt(quantity.attr("max")) : null;

//   jsButton.forEach(button => {
//     button.addEventListener("click", () => {
//       // alert("button clicked");
//       if (jsButton.classList.contains(".plus")) {
//         quantity.val(quantityValue + 1);
//       } else if (jsButton.classList.contains(".minus")) {
//       }
//     });
//   });
// };
