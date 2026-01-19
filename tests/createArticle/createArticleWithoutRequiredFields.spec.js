import { test } from '../_fixtures/fixtures';
import { TITLE_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';


test.beforeEach(async ({ signUpUser }) => {
  await signUpUser;
});

test('Create an article without required fields',
  async ({ homePage, createArticlePage }) => {
    await homePage.clickNewArticleLink();
    await createArticlePage;
    await createArticlePage.clickPublishArticleButton();
    await createArticlePage
      .assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
  });
