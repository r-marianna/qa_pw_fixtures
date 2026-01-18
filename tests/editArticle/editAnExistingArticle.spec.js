import { test } from "../_fixtures/fixtures";
import { generateNewArticleData } from "../../src/common/testData/generateNewArticleData";
import { generateNewUserData } from "../../src/common/testData/generateNewUserData";
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

test.describe('Edit an existing article without tag', () => {
  let article;
  let articleEdit;
  let user;

  test.beforeEach(async ({ page, logger }) => {
    user = generateNewUserData();
    article = generateNewArticleData(0, logger);
    articleEdit = generateNewArticleData();

    await signUpUser(page, user);
    await createNewArticle(page, article);
  });

  test('Edit article Title for existing article',
    async ({ createArticlePage, viewArticlePage }) => {
      await viewArticlePage.clickEditArticleButton();
      await createArticlePage.fillTitleField(articleEdit.title);
      await createArticlePage.clickUpdateArticleButton();
      await viewArticlePage.waitForPageAppear();
      await viewArticlePage.reload();
      await viewArticlePage.assertArticleTitleIsVisible(articleEdit.title);
    });

  test('Edit the article Description for the existing article',
    async ({ createArticlePage, viewArticlePage }) => {
      await viewArticlePage.clickEditArticleButton();
      await createArticlePage.fillDescriptionField(articleEdit.description);
      await createArticlePage.clickUpdateArticleButton();
      await viewArticlePage.waitForPageAppear();
      await viewArticlePage.reload();
      await viewArticlePage.clickEditArticleButton();
      await createArticlePage.assertDescriptionHasText(articleEdit.description);
    });

  test('Edit the article Text for the existing article',
    async ({ createArticlePage, viewArticlePage }) => {
      await viewArticlePage.clickEditArticleButton();
      await createArticlePage.fillTextField(articleEdit.body);
      await createArticlePage.clickUpdateArticleButton();
      await viewArticlePage.waitForPageAppear();
      await viewArticlePage.reload();
      await viewArticlePage.assertArticleTextIsVisible(articleEdit.body);
    });
});