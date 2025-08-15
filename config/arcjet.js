import arcjet, { shield, detectBot, tokenBucket } from '@arcjet/node';
import { ARCJET_IP, ARCJET_KEY } from './env.js';

const aj = arcjet({
  key: ARCJET_KEY,
  ip: process.env.NODE_ENV === "development" ? ARCJET_IP : undefined,
  characteristics: ["ip.src"],
  rules: [
 
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
      ],
    }),
    // Create a token bucket rate limit. Other algorithms are supported.
    tokenBucket({
      mode: "LIVE",
      refillRate: 5, // Refill 5 tokens per interval
      interval: 10, // Refill every 10 seconds
      capacity: 10, // Bucket capacity of 10 tokens
    }),
  ],
});

export default aj;