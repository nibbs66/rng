import dbConnect from "../../../lib/mongo";
import Cart from "../../../models/Cart";

export default async function handler(req, res) {
    const {
        method,
        query: {id},

    } = req;


    await dbConnect()

    if (method === "GET") {

        try {
            const cart = await Cart.findById(id);

            res.status(200).json(cart);
        } catch (err) {
            res.status(500).json(err)
        }

    }
    if(method === 'PUT'){
        const{quant, productId, addToTotal, selected, shippingCost}=req.body

        if(!selected){
            try{
                await Cart.findOneAndUpdate(
                    {_id: id},
                    {$set: {[`items.$[outer].quantity`]: quant}},
                    { "arrayFilters": [{ "outer.productId": productId}]}
                )
                const updatedCart = await Cart.findOneAndUpdate(
                    {_id: id},
                    {$inc: {total: addToTotal},  new: true}
                )


                res.status(200).json(updatedCart)
            }catch(err){
                res.status(500).json(err);
            }
        }else{
            try{
        const shippingUpdate = await Cart.findOneAndUpdate(
             {_id: id},
            {$set: {shipping:
                       {
                           method: selected,
                           price: shippingCost
                       },
                    new: true
            }
            },
          )
                res.status(200).json(shippingUpdate)
            }catch(err){
                res.status(500).json(err);
                        }
}


}
}
