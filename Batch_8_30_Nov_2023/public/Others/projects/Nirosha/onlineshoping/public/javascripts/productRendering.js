var productDetails = [];

var productTemplate;

document.addEventListener("DOMContentLoaded", () => {
    productTemplate = Handlebars.compile(document.querySelector("#snglProductTemplate").innerHTML);
})



var renderProductDetails = (productData, index) => {
    productData.discountPrice = productData.price - (productData.price * productData.discountPercent) / 100;
    productData.discountPrice = parseInt(productData.discountPrice);
    productData.elementId = 'ratingStars_' + index;

    $(".productDetails").append(productTemplate(productData));
    renderRatingStars('#ratingStars_' + index, productData.rating);
}

var loadProductDataToPage = (filter) => {
    if (!filter) {
        filter = {};
    }
    axios.get('/get/productDetails', {params: filter}).then((response) => {
        $(".productDetails").html('');
        productDetails = response.data.details;
        if (productDetails.length) {
            for (var i = 0 ; i < productDetails.length; i++) {
                productDetails[i].description = productDetails[i].description.substr(0, 80) + '...';
                renderProductDetails(productDetails[i], i);
            }
        } else {
            // sho no records found error
            var divTag = $("<div/>").addClass("noRecordsFound");
            divTag.text("No Records found");
            $(".productDetails").append(divTag);
        }
    });
}

var setPriceValue = () => {
    var priceValue = $("#priceRangeBar").val();
    $(".priceRange").text(priceValue);
}

var filterProducts = () => {
    var selectedCategoryList = [];

    // category filters:
    var categoryList = document.querySelectorAll(".categoryList input:checked");
    for (var i = 0; i < categoryList.length; i++) {
        selectedCategoryList.push(categoryList[i].value);
    }

    var priceValue = $("#priceRangeBar").val();
    loadProductDataToPage({priceRange: priceValue, categoryList: selectedCategoryList});
}