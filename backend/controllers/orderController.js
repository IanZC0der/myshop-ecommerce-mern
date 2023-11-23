import Order from '../models/orderModel.js'
import asyncHandler from '../middleware/asyncHandler.js'
import Product from '../models/productModel.js'
import { calcPrices } from '../utils/calcPrices.js'

const addOrderItems = asyncHandler(async (req, res) => {
    // res.send("add order items")
    const {orderItems, shippingAddress, paymentMethod} = req.body

    if(orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error("No order items")
    } else {

        const itemsFromDB = await Product.find({_id: {$in: orderItems.map(item => item._id)}})

        const dbOrderItems = orderItems.map((itemFromClient) => {
            const matchingItemFromDB = itemsFromDB.find(
                (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
                )
                return {
                    ...itemFromClient,
                    product: itemFromClient._id,
                    price: matchingItemFromDB.price,
                    _id: undefined,
                }
        })

        const {itemsPrice, shippingPrice, taxPrice, totalPrice} = calcPrices(dbOrderItems)


        const order = new Order({
            orderItems: dbOrderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

        const createdOrder = await order.save()

        res.status(201).json(createdOrder)
    }
})

const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error("Order not found")
    }
})

const updateOrderToPaid = asyncHandler(async (req, res) => {
    res.send("update order to paid")
})

const updateOrderToDelivered = asyncHandler(async (req, res) => {
    res.send("update order to delivered")
})

const getMyOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find({user: req.user._id})

    res.status(200).json(orders)
})

const getOrders = asyncHandler(async (req, res) => {
    res.send("get orders")
})

export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getMyOrders,
    getOrders
}