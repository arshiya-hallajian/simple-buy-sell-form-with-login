const mongoose = require('mongoose');

const valorant_Schema = new mongoose.Schema({
    product_id: {
        type: String,
    },
    // seller_acc: {
    //     type: String,
    //     required: true,
    // },
    region: {
        type: String,
        required: true,
    },
    rank: {
        type: String,
        required: true,
    },
    level: {
        type: Number,
        required: true,
    },
    account_name: {
        type: String,
        required: true,
    },
    valorant_point: {
        type: Number,
        required: true,
    },
    radient_point: {
        type: Number,
        required: true,
    },
    email_status: {
        type: Boolean,
        required: true,
    },
    email: {
        type: String,
    },
    // battle_passes: {
    //     type: String,
    //     required: true,
    // },
    agents: {
        type: Number,
        required: true,
    },
    skins: {
        type: String
    },
    // price: {
    //     type: Number,
    //     required: true,
    // },
    photos_number:{
      type: Number
    },
    images:{
      type: Array
    },
    description: {
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Valorant', valorant_Schema);
