
import { SignUpPage } from '../../src/ui/pages/auth/SignUpPage';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { test as base } from '@playwright/test';
import { CreateArticlePage } from '../../src/ui/pages/article/CreateArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

export const test = base.extend<{
  createArticlePage: any;
  viewArticlePage: any;
  editArticlePage: any;
  articleWithoutTags: any;
  articleWithOneTag: any;
  articleWithTwoTags: any;
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
  articleWithoutTags: async ({ page }, use) => {
    const article = generateNewArticleData();
    const articleWithoutTags = createNewArticle(page, article);

    await use(articleWithoutTags);
  },
  articleWithOneTag: async ({ page }, use) => {
    const article = generateNewArticleData(1);
    const articleWithOneTag = createNewArticle(page, article);

    await use(articleWithOneTag);
  },
  articleWithTwoTags: async ({ page }, use) => {
    const article = generateNewArticleData(2);
    const articleWithTwoTags = createNewArticle(page, article);

    await use(articleWithTwoTags);
  },
});