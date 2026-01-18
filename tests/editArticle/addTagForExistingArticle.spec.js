import { test } from "../_fixtures/fixtures";
import { generateNewArticleData } from "../../src/common/testData/generateNewArticleData";
import { generateNewUserData } from "../../src/common/testData/generateNewUserData";
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

test.describe('Edit an existing article with tags', () => {
  let article;
  let articleEdit;
  let user;

  let randomNumber = Math.floor(Math.random() * 10);

  test.beforeEach(async ({ page, logger }) => {
    user = generateNewUserData();
    articleEdit = generateNewArticleData(randomNumber, logger);

    await signUpUser(page, user);
  });

  test('Add the Tag for the existing article without tags',
    async ({ page, createArticlePage, viewArticlePage }) => {
      article = generateNewArticleData();
      await createNewArticle(page, article);

      await viewArticlePage.clickEditArticleButton();
      await createArticlePage.fillTagsField(articleEdit.tags);
      await createArticlePage.clickUpdateArticleButton();
      await viewArticlePage.waitForPageAppear();
      await viewArticlePage.reload();
      await viewArticlePage.assertArticleTagsToContainText(articleEdit.tags);
    });

  test('Add the Tag for the existing article with tags',
    async ({ page, createArticlePage, viewArticlePage, logger }) => {
      article = generateNewArticleData(randomNumber, logger);
      await createNewArticle(page, article);

      await viewArticlePage.clickEditArticleButton();
      await createArticlePage.deleteTags();
      await createArticlePage.fillTagsField(articleEdit.tags);
      await createArticlePage.clickUpdateArticleButton();
      await viewArticlePage.waitForPageAppear();
      await viewArticlePage.reload();
      await viewArticlePage.assertArticleTagsToContainText(articleEdit.tags);
      await viewArticlePage.assertArticleTagsDoNotContainText(article.tags);
    });

});