var productData = {
    "details": [
        {
            "name": "Laptop",
            "actualPrice": 30000,
            "discountedPrice": 12000,
            "manu": "Dell",
            "sellerName": "Abc Elec",
            "rating": 4.5,
            "imageUrl":
                "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400"
        },
        {
            "name": "TV",
            "actualPrice": 32000,
            "discountedPrice": 15000,
            "manu": "Sony",
            "sellerName": "Abc Elec",
            "rating": 3.5,
            "imageUrl":
                "https://res.cloudinary.com/sharp-consumer-eu/image/fetch/w_1100,f_auto,q_auto/https://s3.infra.brandquad.io/accounts-media/SHRP/DAM/origin/b3460ec0-6a8a-11ea-9a43-8a541dae4315.jpg"
        },
        {
            "name": "Mobile",
            "actualPrice": 45000,
            "discountedPrice": 25000,
            "manu": "Apple",
            "sellerName": "Indian Elec",
            "rating": 5,
            "imageUrl":
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1ycwAVbGQmB6zlAugD6gh9YIMSJeUMPZFSg&usqp=CAU"
        },
        {
            "name": "Hardisk",
            "actualPrice": 1000,
            "discountedPrice": 700,
            "manu": "Sacndisk",
            "sellerName": "Test Elec",
            "rating": 2.5,
            "imageUrl":
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQiLHrDqRrJ_THVYv9UqOiwdVjo0G8o6IVLw&usqp=CAU"
        }
    ]
}

async function loadSingleProductDetailsTemplate() {
    await axios.get('Templates/SignleProductTemplate.htm')
        .then((response) => {
            console.log('data:::', response.data);
            combineTemplateWithProductData(response.data);
        }).catch((err) => {
            console.log('error while getting single product details page!!');
        });
}

var combineTemplateWithProductData = (singleProductTemplate) => {
    var compile = Handlebars.compile(singleProductTemplate);

    productData.details.forEach((product, index) => {
        productData.details[index].productId = index;
        var rightSideProductsBlock = document.querySelector('#rightBlockProducts');
        rightSideProductsBlock.insertAdjacentHTML('afterbegin', compile(product));
    });
}