// Put your application javascript here

$(document).ready(function() {
  //
  //
  //
  let onQuantityButtonClick = function(event) {
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
  };
  //
  //
  //

  let onQuantityFieldChange = function(event) {
    let $field = $(this),
      $form = $field.closest("form"),
      $quantityText = $form.find(".js-quantity-text"),
      // if the quantity number is equal to 1
      shouldDisableMinus = parseInt(this.value) === 1,
      shouldDisablePlus = parseInt(this.value) === parseInt($field.attr("max")),
      $minusButton = $form.find(".js-quantity-button.minus");
    $plusButton = $form.find(".js-quantity-button.plus");
    // change the text to the same as the js quantity field
    $quantityText.text(this.value);

    if (shouldDisableMinus) {
      // find prop & intiate conditional statment in add-to-cart liquid
      $minusButton.prop("disabled", true);
    } else if ($minusButton.prop("disabled") === true) {
      $minusButton.prop("disabled", false);
    }

    if (shouldDisablePlus) {
      $plusButton.prop("disabled", true);
    } else if ($plusButton.prop("disabled") === true) {
      $plusButton.prop("disabled", false);
    }
  };
  //
  //
  //

  let onVariantRadioChange = function(event) {
      let $radio = $(this),
        $form = $radio.closest("form"),
        max = $radio.attr("data-inventory-quantity"),
        $quantity = $form.find(".js-quantity-field");
      $addToCartButton = $form.find("#add-to-cart-button");

      // on change to radio button if addtocartbutton equals true, we do have  we turn on the add to cart button
      if ($addToCartButton.prop("disabled") === true) {
        $addToCartButton.prop("disabled", false);
      }

      //whenever our radio is changed we want to set the max of the quantity field to whatever the value of the data quantity is
      $quantity.attr("max", max);
      // if quantity value is  greater than the max, set the quantity value to the max and trigger a change event
      // if we change value to 20 when we choose an option this will then become the highest value of the inventory ie 10
      if (parseInt($quantity.val()) > max) {
        $quantity.val(max).change();
      }
    },
    onAddToCart = function(event) {
      event.preventDefault();

      $.ajax({
        type: "POST",
        url: "/cart/add.js",
        data: $(this).serialize(),
        dataType: "json",
        success: onCartUpdated,
        error: onError
      });
    },
    onLineRemoved = function(event) {
      event.preventDefault();
      let $removeLink = $(this),
        removeQuery = $removeLink.attr("href").split("change?")[1];

      $.post("/cart/change.js", removeQuery, onCartUpdated, "json");
    };
  onCartUpdated = function() {
    // alert("cart is updated");
    //
    //
    //
    $.ajax({
      type: "GET",
      url: "/cart",
      context: document.body,
      success: function(context) {
        let $dataCartContents = $(context).find(".js-cart-page-contents"),
          dataCartHtml = $dataCartContents.html(),
          dataCartItemCount = $dataCartContents.attr("data-cart-item-count"),
          $miniCartContents = $(".js-mini-cart-contents"),
          $cartItemCount = $(".js-cart-item-count");

        $cartItemCount.text(dataCartItemCount);
        $miniCartContents.html(dataCartHtml);

        // open mini cart when we add item
        if (parseInt(dataCartItemCount) > 0) {
          openCart();
        } else {
          closeCart();
        }
      }
    });
  };
  onError = function(XMLHttpRequest, textStatus) {
    let data = XMLHttpRequest.responseJSON;
    alert(data.status + " - " + data.message + ":" + data.description);
  };

  openCart = function() {
    $("html").addClass("mini-cart-open");
  };
  closeCart = function() {
    $("html").removeClass("mini-cart-open");
  };
  onCartButtonClick = function(event) {
    event.preventDefault();

    let isCartOpen = $("html").hasClass("mini-cart-open");

    if (!isCartOpen) {
      openCart();
    } else {
      closeCart();
    }
  };

  //
  //
  //

  $(document).on("click", ".js-quantity-button", onQuantityButtonClick);

  $(document).on("change", ".js-quantity-field", onQuantityFieldChange);

  $(document).on("change", ".js-variant-radio", onVariantRadioChange);

  $(document).on("submit", "#add-to-cart-form", onAddToCart);

  $(document).on("click", "#mini-cart .js-remove-line", onLineRemoved);

  $(document).on(
    "click",
    ".js-cart-link, #mini-cart .js-keep-shopping",
    onCartButtonClick
  );
});
