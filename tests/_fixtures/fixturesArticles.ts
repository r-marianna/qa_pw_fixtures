
import { test as base } from '@playwright/test';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

export const test = base.extend<{
  createArticlePage;
  viewArticlePage;
  editArticlePage;
  articleWithoutTags;
  articleWithOneTag;
  articleWithTwoTags;
}>({
  createArticlePage: async ({ page }, use) => {
    const createArticlePage = new CreateArticlePage(page);

    await use(createArticlePage);
  },
  viewArticlePage: async ({ page }, use) => {
    const viewArticlePage = new ViewArticlePage(page);

    await use(viewArticlePage);
  },
  editArticlePage: async ({ page }, use) => {
    const editArticlePage = new EditArticlePage(page);

    await use(editArticlePage);
  },
articleWithoutTags: async (
  { homePage, createArticlePage, viewArticlePage, logger },
  use
) => {
  const article = generateNewArticleData(0, logger);

  await createNewArticle(
    article,
    homePage,
    createArticlePage,
    viewArticlePage
  );

  await use(article);
},

 articleWithOneTag: async (
  { homePage, createArticlePage, viewArticlePage, logger },
  use
) => {
  const article = generateNewArticleData(1, logger);

  await createNewArticle(
    article,
    homePage,
    createArticlePage,
    viewArticlePage
  );

  await use(article);
},

articleWithTwoTags: async (
  { homePage, createArticlePage, viewArticlePage, logger },
  use
) => {
  const article = generateNewArticleData(2, logger);

  await createNewArticle(
    article,
    homePage,
    createArticlePage,
    viewArticlePage
  );

  await use(article);
},

});