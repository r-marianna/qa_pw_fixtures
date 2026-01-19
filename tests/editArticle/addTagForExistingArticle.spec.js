import { test } from "../_fixtures/fixtures";
import { generateNewArticleData } from "../../src/common/testData/generateNewArticleData";

let articleEdit;

test.describe('Edit an existing article with tags', () => {
  test.beforeEach(async ({ signUpUser, articleWithoutTags, logger }) => {
    await signUpUser;
    articleEdit = generateNewArticleData(8, logger)
  });

  test('Add the Tag for the existing article without tags',
    async (
      { articleWithoutTags, createArticlePage, viewArticlePage }
    ) => {
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
      { articleWithOneTag, createArticlePage, viewArticlePage }
    ) => {
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
      { articleWithTwoTags, createArticlePage, viewArticlePage }
    ) => {
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