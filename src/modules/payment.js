const { Schema, model } = require('mongoose');

const paymentSchema = new Schema({});

export default model('Payment', paymentSchema);
