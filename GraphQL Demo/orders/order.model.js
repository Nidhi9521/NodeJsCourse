const orders=[
    {
        date: "2022-05-06",
        subtotal: 80.8,
        items: [
            {
                product:{
                    id:2,
                    description: 'apple',
                    price: 40.02,
                    review:[
                        {
                            rating:4,
                            comment:"Comment Review"
                        }
                    ]
                },
                qty:2
            }
        ]
    }
   ]

   function getAllOrders() {
    console.log('order');
    return orders;
   }

   module.exports={
    getAllOrders,
   }