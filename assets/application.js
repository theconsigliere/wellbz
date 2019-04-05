// Put your application javascript here

$(document).ready(function() {
  $(document).on("click", ".js-quantity-button", function(event) {
    let $button = $(this),
      $form = $button.closest("form"),
      $quantity = $form.find(".js-quantity-field"),
      quantityValue = parseInt($quantity.val()),
      max = $quantity.attr("max") ? parseInt($quantity.attr("max")) : null;
    // if button has class of plus & we havent exceded the max or if the quantity we are increasing to is less than or equal to the max
    if (
      $button.hasClass("plus") &&
      (max === null || quantityValue + 1 <= max)
    ) {
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

  //change on radio select

  $(document).on("change", ".js-variant-radio", function(event) {
    let $radio = $(this),
      $form = $radio.closest("form"),
      max = $radio.attr("data-inventory-quantity"),
      $quantity = $form.find(".js-quantity-field");

    //whenever our radio is changed we want to set the max of the quantity field to whatever the value of the data quantity is
    $quantity.attr("max", max);
    // if quantity value is  greater than the max, set the quantity value to the max and trigger a change event
    if (parseInt($quantity.val()) > max) {
      $quantity.val(max).change();
    }
  });
});
