export default defineEventHandler(() =>
  mockOk({
    category: mockContactCategories(),
    contact_image: "/mock/contact.svg",
  })
);
