const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const mongoose = require('mongoose');

router.post('/placeOrder', (req, res) => {
    let newOrder = new Order({
        dishId: req.body.dishId,
        quantity: req.body.quantity || 0,
        dishName: req.body.dishName,
        prepared: req.body.prepared || 0,
        predicted: req.body.predicted
    });
    Order.find({ dishId: req.body.dishId }, (err, orders) => {
        if (err) throw err;
        if (orders.length) {
            orders.forEach(order => {
                let quantity = order['quantity'] + req.body.quantity;
                let prepared = order['prepared'] + req.body.prepared;
                Order.findOneAndUpdate({ dishId: req.body.dishId }, { $set: { quantity: quantity, predicted: req.body.predicted, prepared: prepared } }, (err, rslt) => {
                    if (err) throw err;
                    if (rslt) {
                        res.json({ 'msg': 'Updated quantity' });
                    }
                })
            })
        } else {
            newOrder.save((err, result) => {
                if (err) throw err;
                if (result) {
                    res.json({ 'msg': 'Order placed successfully.' });
                }
            })
        }

    })
});

router.post('/updatePrepared', (req, res) => {
    Order.find({ dishId: req.body.dishId }, (err, result) => {
        if (err) throw err;
        result.forEach(order => {
            let quantity = req.body.quantity;
            let prepared = req.body.prepared;
            Order.findOneAndUpdate({ dishId: req.body.dishId }, { $set: { quantity: quantity, prepared: prepared } }, (err, rslt) => {
                if (err) throw err;
                if (rslt) {
                    res.json({ 'msg': 'Created till now updated successfully !!!' });
                } else {
                    res.json({ 'msg': 'No entry found !!!' });
                }
            })
        })
    })
})

router.get('/getOrder', (req, res) => {
    Order.find((err, result) => {
        if (err) throw err;
        if (result) {
            res.send(result);
        } else {
            res.json({ 'msg': 'No order found' });
        }
    });
});

module.exports = router;