const products=[
    {
        id:1,
        description: 'apple',
        price: 40.02,
        review:[
            {
                rating:4,
                comment:"Comment Review"
            }
        ]
    },{
        id:2,
        description: 'KIWI',
        price: 90.02,
        review:[
            {
                rating:4,
                comment:"Comment Review"
            }
        ]
    }
   ]

   function getAllProduct(){
    console.log('product');
    return products;
   }

   function getProductByPrice(min,max) {
    console.log(`min ${min}`);
    console.log(`max ${max}`);
    return products.filter((p)=>{
        return p.price>=min && p.price<=max
    })
   }
   function productById(id) {
        console.log(`id ${id}`);
        var product;
        products.forEach(element => {
            if(id==element.id){
                product=element
            }
        });
        return product
   }

   function addNewProduct(id,price,description) {
    const newProduct={
        id,
        description,
        price,
        review:[]
    }
    products.push(newProduct)
    return products;
   }

   function addProductReview(id,rating,comment) {
    var review={
        rating,
        comment
    }
    products.forEach((e)=>{
        if(e.id==id){
           e.review.push(review)
        }

    })
    return products
    
   }

   module.exports={
    getAllProduct,
    getProductByPrice,
    productById,
    addNewProduct,
    addProductReview
   }