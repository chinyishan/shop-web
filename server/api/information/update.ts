export default defineEventHandler(async (event) => {
  if (event.node.req.method !== "POST") {
    throw createError({ statusCode: 405, message: "Method Not Allowed" });
  }

  const body = await readBody(event);

  // 純前端專案不寄出資料，僅回傳送出成功
  return mockOk({ ...body, created_at: new Date().toISOString() });
});
