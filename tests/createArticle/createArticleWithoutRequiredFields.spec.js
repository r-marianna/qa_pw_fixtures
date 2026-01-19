import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { TITLE_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';


test.beforeEach(async ({ page, user }) => {
  await signUpUser(page, user);
});

test('Create an article without required fields',
  async ({ homePage, articleWithoutTags, createArticlePage }) => {
    await homePage.clickNewArticleLink();
    await articleWithoutTags;
    await createArticlePage.clickPublishArticleButton();
    await createArticlePage
      .assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
  });
