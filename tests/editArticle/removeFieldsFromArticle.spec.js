import { test } from "../_fixtures/fixtures";
import { TITLE_CANNOT_BE_EMPTY, DESCRIPTION_CANNOT_BE_EMPTY, BODY_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages.js'

test.describe('Remove fields from an existing article', () => {

  test.beforeEach(async ({ signUpUser, articleWithTwoTags }) => {
    await signUpUser;
    await articleWithTwoTags;
  });

  test('Remove an article tag for the existing article with tag',
    async ({ createArticlePage, viewArticlePage, articleWithTwoTags }) => {
      await viewArticlePage.clickEditArticleButton();
      await createArticlePage.deleteNTags(2);
      await createArticlePage.waitForPageAppear();
      await createArticlePage.clickUpdateArticleButton();
      await viewArticlePage.waitForPageAppear();
      await viewArticlePage.reload();
      await viewArticlePage.assertArticleTagsDoNotContainText(
        articleWithTwoTags.tags
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