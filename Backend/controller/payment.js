import { Cashfree, CFEnvironment } from "cashfree-pg";

const cashfree = new Cashfree(
  CFEnvironment.SANDBOX,
  "TEST104789643c6ca7ecadb2f1637ba846987401",
  "cfsk_ma_test_ac00b5486fb8476e9c8a3ace1d691608_41004b67"
);

export async function createCashfreeOrder(amount, customerId = "user", customerPhone = "9876543210") {
  const orderId = `order_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
  const request = {
    order_amount: amount,
    order_currency: "INR",
    order_id: orderId,
    customer_details: {
      customer_id: customerId,
      customer_phone: customerPhone
    },
    order_meta: {
      return_url: `https://www.cashfree.com/devstudio/preview/pg/web/checkout?order_id=${orderId}`
    }
  };

  try {
    const response = await cashfree.PGCreateOrder(request);
    return {
      success: true,
      data: response.data,
      order_id: orderId,
      payment_session_id: response.data.payment_session_id
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message
    };
  }
}

// Payment route
export const payment = async (req, res) => {
  const { amount, customerId = "webcodder01", customerPhone = "9999999999" } = req.body;
  try {
    const result = await createCashfreeOrder(amount, customerId, customerPhone);
    if (result.success) {
      res.json({
        order_id: result.order_id,
        payment_session_id: result.payment_session_id,
        ...result.data
      });
      console.log('Order Created successfully:', result.data);
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Verify route
export const verify = async (req, res) => {
  const { orderId } = req.body;
  try {
    const response = await cashfree.PGOrderFetchPayments(orderId);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.response?.data?.message || error.message });
  }
};