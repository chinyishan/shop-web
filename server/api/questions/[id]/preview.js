export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");
  const question = mockQuestionById(id);
  const categoryId = question?.category_id ?? mockQuestionCategories()[0].key;

  // 預覽頁以問題編號為 key，並需包含指定的那一筆
  const questions = Object.fromEntries(
    mockQuestionList(categoryId).map((item) => [
      item.id,
      { question_header: item.question_header, editor: item.editor },
    ])
  );

  return mockOk({ questions });
});
