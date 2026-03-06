using { sales.order as db } from '../db/schema';

service OrderService @(path:'/order')  {

 entity Orders as projection on db.Orders 
    actions  {
//below is bound action and function
        action upDateOrder(status: String, amount: Decimal(10,2)) returns Orders;
        function getOrderAmountBOUND() returns Decimal(10,2);
    };
//below is unbound action and function
   function getOrderAmount(orderId: UUID) returns Decimal(10,2);
    action upDateOrderUnbound(orderId: UUID, status: String, amountr: Decimal(10,2)) returns Orders;

}