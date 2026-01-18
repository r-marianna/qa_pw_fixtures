import { test } from "../_fixtures/fixtures";
import { generateNewArticleData } from "../../src/common/testData/generateNewArticleData";
import { generateNewUserData } from "../../src/common/testData/generateNewUserData";
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { TITLE_CANNOT_BE_EMPTY, DESCRIPTION_CANNOT_BE_EMPTY, BODY_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages.js'

test.describe('Edit an existing article without tag', () => {
  let article;
  let user;

  test.beforeEach(async ({ page, logger }) => {
    user = generateNewUserData();
    article = generateNewArticleData(8, logger);

    await signUpUser(page, user);
    await createNewArticle(page, article);
  });

  test('Remove an article tag for the existing article with tag',
    async ({ createArticlePage, viewArticlePage }) => {
      await viewArticlePage.clickEditArticleButton();
      await createArticlePage.deleteNTags(2);
      await createArticlePage.waitForPageAppear();
      await createArticlePage.clickUpdateArticleButton();
      await viewArticlePage.waitForPageAppear();
      await viewArticlePage.reload();
      await viewArticlePage.assertArticleTagsToContainText(
        article.tags.slice(2, -1)
      );

    });

  test('Remove an article title for the existing article',
    async ({ createArticlePage, viewArticlePage }) => {
      await viewArticlePage.clickEditArticleButton();
      await createArticlePage.clearTitleField();
      await createArticlePage.clickUpdateArticleButton();
      await createArticlePage.assertErrorMessageContainsText(
        TITLE_CANNOT_BE_EMPTY
      );
    });

  test('Remove an article description for the existing article',
    async ({ createArticlePage, viewArticlePage }) => {
      await viewArticlePage.clickEditArticleButton();
      await createArticlePage.clearDescriptionField();
      await createArticlePage.clickUpdateArticleButton();
      await createArticlePage.assertErrorMessageContainsText(
        DESCRIPTION_CANNOT_BE_EMPTY
      );
    });

  test('Remove the article text for the existing article',
    async ({ createArticlePage, viewArticlePage }) => {
      await viewArticlePage.clickEditArticleButton();
      await createArticlePage.clearTextField();
      await createArticlePage.clickUpdateArticleButton();
      await createArticlePage.assertErrorMessageContainsText(
        BODY_CANNOT_BE_EMPTY
      );
    });

});