interface OrderItem {
  price?: number | string;
  qty?: number | string;
  [key: string]: unknown;
}

export default defineEventHandler(async (event) => {
  if (event.node.req.method !== "POST") {
    throw createError({ statusCode: 405, message: "Method Not Allowed" });
  }

  const body = await readBody(event);
  const items: OrderItem[] = Array.isArray(body?.items) ? body.items : [];

  const subtotal = items.reduce(
    (total, item) => total + Number(item.price || 0) * Number(item.qty || 0),
    0
  );
  const shippingFee = Number(body?.shipping_fee ?? 0);

  const now = new Date();
  const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(
    now.getDate()
  ).padStart(2, "0")}`;
  const serial = String(Math.floor(Math.random() * 9000) + 1000);

  // 純前端專案不會真的建立訂單，只回傳模擬的訂單資料
  return mockOk({
    order_no: `HL${stamp}${serial}`,
    created_at: now.toISOString(),
    status: "pending",
    items,
    subtotal,
    shipping_fee: shippingFee,
    total: subtotal + shippingFee,
    contact: {
      name: body?.name ?? "",
      mobile: body?.mobile ?? "",
      email: body?.email ?? "",
    },
    delivery: {
      method: body?.delivery ?? "",
      address: body?.address ?? "",
    },
    payment: body?.payment ?? "",
    memo: body?.memo ?? "",
  });
});
