import { NextResponse } from "next/server";
import Razorpay from "razorpay";

let razorpay: Razorpay | null = null;

function getRazorpay() {
  if (!razorpay) {
    const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    if (!key_id || !key_secret) {
      throw new Error("Razorpay API keys are missing");
    }
    razorpay = new Razorpay({ key_id, key_secret });
  }
  return razorpay;
}

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();

    const rzp = getRazorpay();
    const options = {
      amount: amount * 100, // amount in smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await rzp.orders.create(options);
    return NextResponse.json(order);
  } catch (error) {
    console.error("Payment API error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
