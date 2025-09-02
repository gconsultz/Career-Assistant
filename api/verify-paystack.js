export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { reference } = req.body;
  if (!reference) {
    return res.status(400).json({ error: "Missing reference" });
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    return res.status(500).json({ error: "Paystack secret key not set" });
  }

  try {
    const paystackRes = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await paystackRes.json();
    if (data.status && data.data.status === "success") {
      return res.status(200).json({ verified: true, data: data.data });
    } else {
      return res.status(400).json({ verified: false, data: data.data });
    }
  } catch (err) {
    return res.status(500).json({ error: "Verification failed" });
  }
}