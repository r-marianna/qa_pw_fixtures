import { test } from "../_fixtures/fixtures";
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

test.describe('Edit an existing article without tag', () => {
  let articleEdit;

  test.beforeEach(async ({ signUpUser, articleWithoutTags }) => {
    await signUpUser;
    await articleWithoutTags;
  });

  test('Edit article Title for existing article',
    async ({ createArticlePage, viewArticlePage, articleWithoutTags }) => {
      await viewArticlePage.clickEditArticleButton();
      await createArticlePage.fillTitleField(articleWithoutTags.title);
      await createArticlePage.clickUpdateArticleButton();
      await viewArticlePage.waitForPageAppear();
      await viewArticlePage.reload();
      await viewArticlePage
        .assertArticleTitleIsVisible(articleWithoutTags.title);
    });

  test('Edit the article Description for the existing article',
    async ({ createArticlePage, viewArticlePage, articleWithoutTags }) => {
      await viewArticlePage.clickEditArticleButton();
      await createArticlePage
        .fillDescriptionField(articleWithoutTags.description);
      await createArticlePage.clickUpdateArticleButton();
      await viewArticlePage.waitForPageAppear();
      await viewArticlePage.reload();
      await viewArticlePage.clickEditArticleButton();
      await createArticlePage
        .assertDescriptionHasText(articleWithoutTags.description);
    });

  test('Edit the article Text for the existing article',
    async ({ createArticlePage, viewArticlePage, articleWithoutTags }) => {
      await viewArticlePage.clickEditArticleButton();
      await createArticlePage.fillTextField(articleWithoutTags.body);
      await createArticlePage.clickUpdateArticleButton();
      await viewArticlePage.waitForPageAppear();
      await viewArticlePage.reload();
      await viewArticlePage.assertArticleTextIsVisible(articleWithoutTags.body);
    });
});