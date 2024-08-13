const BasePage = require("./base.page");
const { HeaderComponent } = require('./../components');

class MainPage extends BasePage {
    constructor() {
        super(''); // Llamada al constructor de la clase padre (BasePage)
        this.headerComponent = new HeaderComponent(); // Creación de una nueva instancia de HeaderComponent y asignación a la propiedad 'headerComponent' de la instancia de MainPage
    }

    async search(searchText) {
        await this.headerComponent.searchInput.waitForDisplayed();
        await this.headerComponent.searchInput.click();
        await this.headerComponent.searchInput.setValue(searchText);
        await browser.keys('Enter');
    }
}
module.exports = MainPage;