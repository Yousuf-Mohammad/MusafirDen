export const addDecimal = (num)=>{
    return (Math.round(num*100)/100).toFixed(2)
}
export const updateCart =(state) =>{
    //calculate items price

    state.itemPrice = addDecimal( state.cartItems.reduce((accumilator, item)=> accumilator + item.price *item.qty ,0 ))
    //calculate shipping price

    state.shippingPrice = addDecimal(state.itemPrice>10000?0 :100)
    //calculate total  price
    state.totalPrice = 
    ( Number(state.itemPrice)+Number(state.shippingPrice)).toFixed(2)

    localStorage.setItem('cart',JSON.stringify(state))
    
    return state
}