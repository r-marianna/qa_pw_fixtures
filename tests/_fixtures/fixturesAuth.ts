import { test as base } from '@playwright/test';
import { SignUpPage } from '../../src/ui/pages/auth/SignUpPage';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { HomePage } from '../../src/ui/pages/HomePage';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';

export const test = base.extend<{
  signUpPage;
  signInPage;
  homePage;
  signUpUser;  
}>({
  signUpPage: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page);

    await use(signUpPage);
  },
  signInPage: async ({ page }, use) => {
    const signInPage = new SignInPage(page);

    await use(signInPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);

    await use(homePage);
  },
  signUpUser: async ({ page, logger }, use) => {
    const user = generateNewUserData(logger);

    await signUpUser(page, user);
    await use(user);
  },
});
