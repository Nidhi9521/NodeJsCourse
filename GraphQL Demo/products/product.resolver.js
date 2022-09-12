const productModel = require('./product.model')

module.exports = {
    Query: {
        product: () => {
            console.log('Getting the product');
            return productModel.getAllProduct();
        },
        productByPrice:(parent,args)=>{
            console.log(`arg min ${args.minPrice}`);
            console.log(`arg max ${args.maxPrice}`);
            return productModel.getProductByPrice(args.minPrice,args.maxPrice)
        },
        productById:(parent,args)=>{
            console.log(`args product id ${args.id}`);
            return productModel.productById(args.id)
        }

    },
    Mutation:{
        addNewProduct:(parent,args)=>{
            return productModel.addNewProduct(args.id,args.price,args.description)
        },
        addProductReview:(_,args)=>{
            return productModel.addProductReview(args.id,args.rating,args.comment)
        }
    }
}