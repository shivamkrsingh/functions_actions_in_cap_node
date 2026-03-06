

module.exports = async function(srv) {

    const { Orders } = srv.entities;
//below is generic method to get data 
    const getOrderById = async (ID) => {
        const order = await SELECT.one.from(Orders).where(ID);
        if (!order) throw new Error(`Order ${ID} not found`);
        return order;
    };
//below is unbound function 
    srv.on('getOrderAmount', async req => {
        const { orderId } = req.data;
    // Fetch the order from your Orders entity
        console.log(req.data);
        const ID = orderId;
        const order = await getOrderById({ID: orderId});

        // Return the amount if the order exists
        return order ? order.amount : null;
    });
//below is bound function 
        srv.on('getOrderAmountBOUND', async req => {
        const { ID } = req.params;
        // Fetch the order from your Orders entity
        console.log(req.data);
        const order = await getOrderById(ID);
        // Return the amount if the order exists
        return order ? order.amount : null;
    });
//below is bound action 
    srv.on('upDateOrder', async (req) => { 
    const { ID } = req.params;  
    const { status , amount } = req.data;
    const orderdata = await getOrderById(ID);
    console.log(orderdata);
    if (!orderdata) return req.reject(404, `Order ${ID} not found`);
    await UPDATE(Orders).set({ status: status, amount: (orderdata.amount * amount) }).where(ID);
    return  getOrderById(ID);
});
//below is unbound action 
        srv.on('upDateOrderUnbound', async (req) => {
        const {orderId, status , amountr} = req.data;
        const orderdata = await SELECT.one.from(Orders).where({ID: orderId});
        if (!orderdata) return req.reject(404, `Order ${orderId} not found`);
        await UPDATE(Orders).set({status:status,amount: (orderdata.amount*amountr)}).where({ID:orderId});
        return getOrderById({ID: orderId});
    });

};