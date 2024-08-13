const { YopmailMainComponent, YopmailIframeComponent } = require('../../po/components');
const CalculatorPage = require('./calculator.page');
const {faker} = require('@faker-js/faker');

class YopmailPage {
    constructor() {
      this.main = new YopmailMainComponent();
      this.yopmailIframe = new YopmailIframeComponent();
      this.calculator = new CalculatorPage();
    }

    async createYopmail() {
        await browser.newWindow('https://yopmail.com/es/');
        const handles = await browser.getWindowHandles();
        const randomEmail = faker.internet.email({firstName: 'Stevenson96', provider: 'yopmail.com'});
        await this.main.emailInput.waitForClickable();
        await this.main.emailInput.setValue(randomEmail);
        await browser.keys('Enter');
        await browser.switchToWindow(handles[0]);
        return randomEmail;
      }

// Método para validar el costo total en el correo electrónico
async validateTotalCostInEmail(totalCost, randomEmail) {

    // Llena el formulario de estimación de correo electrónico y lo envía
    await this.calculator.fillAndSendEmailEstimate(randomEmail);

    // Abre una nueva ventana del navegador con la URL de Yopmail y el correo electrónico aleatorio
    await browser.newWindow(`http://www.yopmail.com?${randomEmail}`);

    // Espera hasta que el botón de refresco sea clickeable
    await this.main.refreshButton.waitForClickable();

    // Espera hasta que el contador de correo exista
    await this.main.emailCount.waitForExist();

    // Hace clic en el botón de refresco
    await this.main.refreshButton.click();

    // Obtiene el texto del contador de correo
    let emailCount = await this.main.emailCount.getText();

    // Entra en un bucle hasta que el contador de correo no sea '0 mail'
    do {
      // Espera hasta que el botón de refresco sea clickeable
      await this.main.refreshButton.waitForClickable();

      // Hace clic en el botón de refresco
      await this.main.refreshButton.click();

      // Espera hasta que el contador de correo exista
      await this.main.emailCount.waitForExist();

      // Obtiene el texto del contador de correo
      emailCount = await this.main.emailCount.getText();
    } while (emailCount == '0 mail');

    // Espera hasta que el iframe de Yopmail exista
    await this.yopmailIframe.yopmailIframe.waitForExist();

    // Define una función para obtener el texto del documento
    const getDocumentText = () => browser.executeScript(
        'return document.documentElement.outerText',
        [],
    );

    // Obtiene el localizador del iframe de Yopmail
    const yopmailIFrameLocator = this.yopmailIframe.yopmailIframeId;

    // Encuentra el iframe usando el localizador
    const iframe = await browser.findElement('css selector', yopmailIFrameLocator);

    // Cambia el contexto del navegador al iframe
    await browser.switchToFrame(iframe);

    // Espera y verifica que el texto del documento contenga el costo mensual estimado
    await expect(await getDocumentText()).toContain(`Estimated Monthly Cost: USD ${totalCost}`);
 }
}

module.exports = YopmailPage;