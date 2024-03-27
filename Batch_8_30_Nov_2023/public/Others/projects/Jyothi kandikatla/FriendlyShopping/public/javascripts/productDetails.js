var productdetails = {
    "MulProducts": [
        {
            "imgurl": "https://tse4.mm.bing.net/th?id=OIP.OVyp1nRXTnhhZNiLJ5iLrQHaHa&pid=Api&P=0&h=220",
            "name": "Mobile",
            "Price": 15000,
            "disccount": "20",
            "company": "oppo",
            "rating": 3.5
        },
        {
            "imgurl": "https://tse1.mm.bing.net/th?id=OIP.MGpmngAnrgi3TdcEreEnPwHaFj&pid=Api&rs=1&c=1&qlt=95&w=152&h=113",
            "name": "TV",
            "Price": 25000,
            "disccount": "5",
            "company": "LG",
            "rating": 4.5
        },
        {
            "imgurl": "https://tse1.mm.bing.net/th?id=OIP.JD8x3HC2NBB_g6sPG63HuQHaEi&pid=Api&P=0&h=220",
            "name": "Laptop ",
            "Price": 70000,
            "disccount": "10",
            "company": "Apple",
            "rating": 5
        },
        {
            "imgurl": "https://sp.yimg.com/ib/th?id=OIP.CpcMUrOcV9B5ttaB4dfxOAHaI4&pid=Api&w=148&h=148&c=7&dpr=2&rs=1",
            "name": "Shoes",
            "Price": 2000,
            "disccount": "15",
            "company": "LeeCouper",
            "rating": 4
        }
    ]
}
var singleProductTemplate = '';
async function loadProductDetails() {
    await axios.get("templates/singleProductTemplate.htm").then((response) => {
        singleProductTemplate = Handlebars.compile(response.data);
        addProductsToThePage();       
    });
    console.log("done");
}

var addProductsToThePage = () => {
    productdetails.MulProducts.forEach((value, index) => {//add products list to single products template
        value.productId = 'product_' + index;
        value.discountPrice = value.Price - ((value.Price * value.disccount / 100));
        $("#rightsideContent").append(singleProductTemplate(value));
        var selector = '#' + value.productId;
        addstar(selector, value.rating);//add star rating to template
    });
}