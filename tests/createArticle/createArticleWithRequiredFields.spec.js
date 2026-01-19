import { test } from '../_fixtures/fixtures';

test.beforeEach(async ({ signUpUser, articleWithOneTag }) => {
  await signUpUser;
  await articleWithOneTag;
});

test('Create an article with required fields', async (
  { homePage, createArticlePage, viewArticlePage, articleWithOneTag }) => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillTitleField(articleWithOneTag.title);
  await createArticlePage.fillDescriptionField(articleWithOneTag.description);
  await createArticlePage.fillTextField(articleWithOneTag.body);
  await createArticlePage.clickPublishArticleButton();

  await viewArticlePage.assertArticleTitleIsVisible(articleWithOneTag.title);
  await viewArticlePage.assertArticleTextIsVisible(articleWithOneTag.body);
});
