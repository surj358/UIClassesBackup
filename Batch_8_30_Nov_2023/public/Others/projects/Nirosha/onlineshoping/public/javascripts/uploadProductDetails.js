
var hideSuccessBox = () => {
    document.querySelector(".overlayPageOnSubmit").style.display = 'none';
    document.querySelector(".successBox").style.display = 'none';
}

var showSuccessBox = () => {
    document.querySelector(".overlayPageOnSubmit").style.display = 'block';
    document.querySelector(".successBox").style.display = 'block';
}

var clearProductDetails = () => {
    document.getElementById("addNewProductForm").reset();
    hideSuccessBox();
}

var productData = {};


var readProductDetails = () => {
    
    productData.productId = $("#productId").val();
    productData.category = $("#category").val();
    productData.name = $("#name").val();
    productData.name_lrg = $("#name_lrg").val();
    productData.price = $("#price").val();
    productData.discountPercent = $("#discountPercent").val();
    productData.manu = $("#manu").val();
    
    productData.imageList = [];
    productData.rating = $("#rating").val();
    productData.description = $("#description").val();
    productData.productDetails = {};
    productData.maxDeliveryDays = $("#maxDeliveryDays").val();
    productData.inStock = $("#inStock").val();
    productData.itemsInStock = $("#itemsInStock").val();
    console.log(productData);


    axios.post("/addNewProduct", productData).then((response) => {
        console.log("response is :::");
        console.log(response);
        if (response.data.msg == 'Success') {
            showSuccessBox();
        }
    }).catch((error) => {

    })
}

var uploadImage = () => {
    console.log($("input[name=prodImage]"));
    let uploadfile = $("input[name=prodImage]")[0].files[0] // file from input

  

    let formData = new FormData();
    formData.append("prodImage", uploadfile);

    axios.post('/upload/productImage', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
    }).then((response) => {
        console.log("Response");
        console.log(response);
        productData.image = response.data.file_path
    })
}