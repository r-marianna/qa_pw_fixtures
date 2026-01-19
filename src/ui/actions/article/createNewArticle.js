import { test } from "@playwright/test";

export async function createNewArticle(
  article,
  homePage,
  createArticlePage,
  viewArticlePage,
) {
  await test.step(`Create new article`, async () => {
    await homePage.clickNewArticleLink();

    await createArticlePage.fillAndPublishNewArticle(article);

    await viewArticlePage.assertArticleTitleIsVisible(article.title);
    await viewArticlePage.assertArticleTextIsVisible(article.body);
  });
}