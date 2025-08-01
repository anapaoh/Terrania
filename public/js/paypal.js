const paypal = require('@paypal/checkout-server-sdk');

const environment = new paypal.core.LiveEnvironment(
  'AUb78yZ3EBp1DuUHAZgycMoh-KcqLOHHd-r0yo4twUQNWuHYImX1pG4OISXhB5ArpDY1ww1ZVYzd9umA',
  'EA-4bZ6BoDEPK_lCWggXBI0oNvABF8zhIEVUrdST3paMsfvnrLsKHBLxJ1PTx82CQxviZdQA2WOlWvAO'
);
const client = new paypal.core.PayPalHttpClient(environment);

module.exports = client;