import { Page } from '@playwright/test';

export class HomePage {
    constructor(private page: Page) {}

    async goto(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async clickSignIn(): Promise<void> {
        await this.page.getByRole('button', { name: 'Sign In' }).click();
    }

    async clickRegister(): Promise<void> {
        await this.page.getByRole('button', { name: 'Registration' }).click();
    }
}