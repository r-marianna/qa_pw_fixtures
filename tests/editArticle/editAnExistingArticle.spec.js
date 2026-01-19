import { test } from "../_fixtures/fixtures";

test.describe('Edit an existing article without tag', () => {

  test.beforeEach(async (
    { signUpUser, articleWithoutTags, articleWithTwoTags }) => {
    await signUpUser;
    await articleWithoutTags;
    await articleWithTwoTags;
  });

  test('Edit article Title for existing article',
    async ({ createArticlePage, viewArticlePage, articleWithTwoTags }) => {
      await viewArticlePage.clickEditArticleButton();
      await createArticlePage.fillTitleField(articleWithTwoTags.title);
      await createArticlePage.clickUpdateArticleButton();
      await viewArticlePage.waitForPageAppear();
      await viewArticlePage.reload();
      await viewArticlePage
        .assertArticleTitleIsVisible(articleWithTwoTags.title);
    });

  test('Edit the article Description for the existing article',
    async ({ createArticlePage, viewArticlePage, articleWithTwoTags }) => {
      await viewArticlePage.clickEditArticleButton();
      await createArticlePage
        .fillDescriptionField(articleWithTwoTags.description);
      await createArticlePage.clickUpdateArticleButton();
      await viewArticlePage.waitForPageAppear();
      await viewArticlePage.reload();
      await viewArticlePage.clickEditArticleButton();
      await createArticlePage
        .assertDescriptionHasText(articleWithTwoTags.description);
    });

  test('Edit the article Text for the existing article',
    async ({ createArticlePage, viewArticlePage, articleWithTwoTags }) => {
      await viewArticlePage.clickEditArticleButton();
      await createArticlePage.fillTextField(articleWithTwoTags.body);
      await createArticlePage.clickUpdateArticleButton();
      await viewArticlePage.waitForPageAppear();
      await viewArticlePage.reload();
      await viewArticlePage.assertArticleTextIsVisible(articleWithTwoTags.body);
    });
});