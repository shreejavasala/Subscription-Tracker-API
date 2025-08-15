import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Subscription name is required'],
    trim: true,
    minLength: 2, 
    maxLength: 100,
  },
  price: {
    type: Number,
    required: [true, 'Subscription price is required'],
    min: [0, 'Price must be greater than 0'],
  },
  currency: {
    type: String,
    enum: ['USD', 'INR', 'EUR'],
    default: 'USD',
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'yearly'],
  },
  category: {
    type: String,
    enum: ['sports', 'news', 'entertainment', 'lifestyle', 'technology', 'finance', 'politics', 'other','education'],
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['active', 'cancelled', 'expired'],
    default: 'active',
  },
  startDate: {
    type: Date,
    required: true,
    validate: {
      validator: (value) => value <= new Date(),
      message: 'Start Date must be in the past',
    }
  },
  renewalDate: {
    type: Date,
    validate: {
      validator: function (value) { value > this.startDate; },
      message: 'Renewal Date must be after the Start Date',
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
    index: true,
  }

}, { timestamps: true });


const setRenewalDateandStatus = (doc) => {
  if(!doc.startDate || !doc.frequency) return;

    const renewalPeriods = {
      daily: 1, 
      weekly: 7, 
      monthly: 30,
      yearly: 365,
    };

    doc.renewalDate = new Date(doc.startDate);
    doc.renewalDate.setDate(doc.renewalDate.getDate() + renewalPeriods[doc.frequency]);

    doc.status = doc.renewalDate < new Date() ? 'expired' : 'active';
}

  //Auto-update the status if renewal date has passed
//Auto-calculate the renewal date, if missing
subscriptionSchema.pre('save', function(next) {
  setRenewalDateandStatus(this);
  next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;