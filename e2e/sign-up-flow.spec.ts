import { test, expect } from "@playwright/test";
import { login, setupE2eTest, signUp } from "./utils";

test.describe("User auth", () => {
  const userEmail = "test@test.io";
  const userPassword = "test123";
  const userName = "testname";
  test.beforeEach(setupE2eTest);
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:1337");
  });

  test("new user can signup", async ({ page }) => {
    await signUp(page, userEmail, userPassword, userName);
  });

  test("after signing up, user can login from another machine", async ({
    browser,
    page,
  }) => {
    await signUp(page, userEmail, userPassword, userName);
    const newMachine = await browser.newPage();
    await newMachine.goto("http://localhost:1337");
    await login(newMachine, userEmail, userPassword, userName);
  });
});
