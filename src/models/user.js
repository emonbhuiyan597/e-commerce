// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: String,
  phoneNumber: String,
  
});


userSchema.virtual('cartItems', {
    ref: 'CartItem',
    localField: '_id',
    foreignField: 'user',
  });
  
  userSchema.virtual('orders', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'user',
  });
  
  userSchema.pre('remove', async function (next) {
    const user = this;
    await CartItem.deleteMany({ user: user._id });
    await Order.deleteMany({ user: user._id });
    next();
  });
  



const User = mongoose.model('User', userSchema);

module.exports = User;
