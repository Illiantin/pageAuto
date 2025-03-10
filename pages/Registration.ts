import { Page, Locator } from '@playwright/test';

export class Registration {
    constructor(private page: Page) {}

    get firstNameInput(): Locator { return this.page.locator('input[name="name"]'); }
    get lastNameInput(): Locator { return this.page.locator('input[name="lastName"]'); }
    get emailInput(): Locator { return this.page.locator('#signupEmail'); }
    get passwordInput(): Locator { return this.page.locator('#signupPassword'); }
    get repeatPasswordInput(): Locator { return this.page.locator('input[name="repeatPassword"]'); }
    get registerButton(): Locator { return this.page.getByRole('button', { name: 'Register' }); }

    get emailError(): Locator { return this.page.locator('text=Email is incorrect'); }
    get passwordError(): Locator { return this.page.locator('text=Password has to be from 8 to 15 characters long'); }
    get passwordMismatchError(): Locator { return this.page.locator('text=Passwords do not match'); }

    async registerUser(firstName: string, lastName: string, email: string, password: string, repeatPassword: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.repeatPasswordInput.fill(repeatPassword);
        await this.registerButton.click();
    }
}
