var col3Template;
var col4Template;
var selectedProductId = '';
var singleProductDetails = {};
var selectedDiscountPrice;

document.addEventListener("DOMContentLoaded", () => {
    col3Template = Handlebars.compile($("#detailsPage_col2").html());
    col4Template = Handlebars.compile($("#detailsPage_col3").html());
});

var loadSingleProductData = () => {
    var filter = {productId: selectedProductId};
    axios.get('/get/productDetails', {params: filter}).then((response) => { 
        console.log(response)
        singleProductDetails = response.data.details[0];
        renderSingleDetailsToPage();
    }); 
}

var renderSingleProductDetails = (pid) => {
    selectedProductId = pid;
    loadSelectedTemplate('singleProductDetails', pid);
}
    
var renderSingleDetailsToPage = () => {
    for (var i = 0; i < singleProductDetails.imageList.length; i++) {
        var divTag = document.createElement("div");
        divTag.setAttribute('imageIndex', i);
        divTag.style['background-image'] = "url('" + singleProductDetails.imageList[i] + "')";
        document.querySelector(".productImageThumbnails").append(divTag);
        divTag.addEventListener('mouseover', (event) => {
            var imageIndex = event.target.getAttribute("imageIndex");
            setLargeImage(imageIndex);
        });
    }
    setLargeImage(0);
    renderMoreProductDetails();
    $("#col_3_content").html(col3Template(singleProductDetails));
    $("#col_4_content").html(col4Template(singleProductDetails));
    populateQtyDropDown();
}

var populateQtyDropDown = () => {
    var selectDropQty = document.getElementById("selectQty");
    for (let i = 1; i <= parseInt(singleProductDetails.itemsInStock); i++) {
        var contents;
        contents += "<option>" + i + "</option>";
    }
    selectDropQty.innerHTML = contents;
}

var renderMoreProductDetails = () => {
    selectedDiscountPrice = parseInt(singleProductDetails.price - (singleProductDetails.price * singleProductDetails.discountPercent) / 100);
    singleProductDetails.discountedPrice = selectedDiscountPrice; 
}

var setLargeImage = (index) => {
    document.querySelector(".thumbImageLarge").style['background-image'] = "url('" + singleProductDetails.imageList[index] + "')";
}
