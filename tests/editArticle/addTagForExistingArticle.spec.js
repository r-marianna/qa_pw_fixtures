import { test } from "../_fixtures/fixtures";
import { generateNewArticleData } from "../../src/common/testData/generateNewArticleData";

let articleEdit;

test.describe('Edit an existing article with tags', () => {
  test.beforeEach(async ({ signUpUser, articleWithoutTags, logger }) => {
    await signUpUser;
    await articleWithoutTags;
    articleEdit = generateNewArticleData(8, logger)
  });

  test('Add the Tag for the existing article without tags',
    async (
      { signUpUser, articleWithoutTags, createArticlePage, viewArticlePage }
    ) => {
      await signUpUser;
      await articleWithoutTags;
      await viewArticlePage.clickEditArticleButton();
      await createArticlePage.fillTagsField(articleEdit.tags);
      await createArticlePage.clickUpdateArticleButton();
      await viewArticlePage.waitForPageAppear();
      await viewArticlePage.reload();
      await viewArticlePage.assertArticleTagsToContainText(articleEdit.tags);
    });

  test('Add the Tag for the article',
    async (
      { signUpUser, articleWithOneTag, createArticlePage, viewArticlePage }
    ) => {
      await signUpUser;
      await articleWithOneTag;
      await viewArticlePage.clickEditArticleButton();
      await createArticlePage.deleteTags();
      await createArticlePage.fillTagsField(articleEdit.tags);
      await createArticlePage.clickUpdateArticleButton();
      await viewArticlePage.waitForPageAppear();
      await viewArticlePage.reload();
      await viewArticlePage.assertArticleTagsToContainText(articleEdit.tags);
    });

  test('Add two tags to the article',
    async (
      { signUpUser, articleWithTwoTags, createArticlePage, viewArticlePage }
    ) => {
      await signUpUser;
      await articleWithTwoTags;
      await viewArticlePage.clickEditArticleButton();
      await createArticlePage.deleteTags();
      await createArticlePage.fillTagsField(articleEdit.tags);
      await createArticlePage.clickUpdateArticleButton();
      await viewArticlePage.waitForPageAppear();
      await viewArticlePage.reload();
      await viewArticlePage.assertArticleTagsToContainText(articleEdit.tags);
    });

});