import { workflowClient } from "../config/upstash.js";
import Subscription from "../models/subscription.model.js";
import { SERVER_URL } from "../config/env.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id
    });

    const { workflowRunId } = await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription.id,
      },
      header: {
        'content-type': 'application/json',
      },
      retries: 0,
    });

    res.status(201).json({ success: true, data: {subscription, workflowRunId}});
  } catch(error) {
    next(error);
  }
}

export const getUserSubscriptions = async (req, res, next) => {
  try {
    if(req.user.id !== req.params.id) {
      const error = new Error('You are not the owner of this account');
      error.statusCode = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: req.params.id });

    res.status(200).json({
      success: true,
      data: subscriptions
    });
  } catch(error) {
    next(error);
  }
}

export const getSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find();

    res.status(200).json({ success: true, data: subscriptions});
  } catch(error) {
    next(error);
  }
}

export const updateSubscription = async (req, res, next) => {
  try {
    const subscriptionId = req.params.id;

    const subscription = await Subscription.findById(
      subscriptionId, 
    );

    if(!subscription) {
      const error = new Error('Subscription not found');
      error.statusCode(404);
      throw error;
    }
    Object.assign(subscription, req.body);

    const { workflowRunId } = await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription.id,
      },
      header: {
        'content-type': 'application/json',
      },
      retries: 0,
    });

    res.status(201).json({ success: true, data: {subscription, workflowRunId}});

    await subscription.save();
  }catch(error) {
    next(error);
  }
}


export const getSubscriptionDetails = async (req, res, next) => {
  try {
    const subscriptionId = req.params.id;

    const subscription = await Subscription.findById(subscriptionId);

    if(!subscription) {
      const error = new Error('Subscription not found');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: subscription});
  }catch(error) {
    next(error);
  }
}

export const deleteSubscription = async (req, res, next) => {
  try {
    const subscription = Subscription.findById(req.params.id);

    if(!subscription) {
      const error = new Error('Subscription not found');
      error.statusCode = 404;
      throw error;
    }
    const subscriptionId = req.params.id;
    await Subscription.findByIdAndDelete(subscriptionId);
    res.status(200).json({ success: true, message: 'Deleted successfully'});

  } catch(error) {
    next(error);
  }
}