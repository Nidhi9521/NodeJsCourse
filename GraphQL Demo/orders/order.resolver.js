const ordersModel =require('./order.model')

module.exports ={
    Query: {
        orders: () => {
            console.log('getting orders');
            return ordersModel.getAllOrders(); 
        },
    }
}