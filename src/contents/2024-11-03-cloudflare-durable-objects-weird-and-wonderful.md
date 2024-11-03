---
title: "Cloudflare Durable Objects - Weird and Wonderful"
datetime: 2024-11-03
tags: ["adyen", "nextjs", "typescript", "frontend"]
draft: true
---

Let's start with some background. If you're already familiar with Cloudflare and Cloudflare workers, you can skip directly to the [Durable objects](#durable-objects) section.

## Durable objects

# Summary

We have created a payment page with the Drop-in component and made a test payment. I did not cover any advanced
authorization methods (Klarna, PayPal, etc) or how to handle the payment result. I hope this post has given you a good
starting point for integrating Adyen.

All and all. I think Adyen is a great payment provider. The documentation is good, and the Drop-in component is easy to
use. Their test environment is excellent, and their web UI is great as well.

# Recommended reading

- Cloudflare: [Durable Objects: Easy, Fast, Correct - choose three](https://blog.cloudflare.com/durable-objects-easy-fast-correct-choose-three/)
- Cloudflare: [Workers Tutorials](https://developers.cloudflare.com/workers/tutorials/)
