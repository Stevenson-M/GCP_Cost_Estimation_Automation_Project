const { pages } = require('../../po/pages');

describe('Google Cloud Platform Pricing Calculator Sanity Test', function () {

    beforeEach(async function () {
        await browser.deleteCookies();
        await browser.maximizeWindow();
    });

    it('should verify that form fields exist', async function () {
        await pages('calculator').openWithUrl('https://cloud.google.com/products/calculator-legacy');
        await pages('calculator').switchToCalculatorIframe();
        
        // Verificar que los campos del formulario existen
        await pages('calculator').selectComputeEngineOption();
        expect(await pages('calculator').numberOfInstancesFieldExists()).toBe(true);
        await pages('calculator').verifyInstacesForIsDisplayed();
        expect(await pages('calculator').operatingSystemFieldExists()).toBe(true);
        expect(await pages('calculator').provisioningModelFieldExists()).toBe(true);
        expect(await pages('calculator').machineFamilyFieldExists()).toBe(true);
        expect(await pages('calculator').seriesFieldExists()).toBe(true);
        await pages('calculator').selectSeries();
        expect(await pages('calculator').machineTypeFieldExists()).toBe(true);
        await pages('calculator').enableGPUs();
        expect(await pages('calculator').gpuTypeFieldExists()).toBe(true);
        expect(await pages('calculator').gpusNumberFieldExists()).toBe(true);
        expect(await pages('calculator').localSSDFieldExists()).toBe(true);
        expect(await pages('calculator').datacenterLocationFieldExists()).toBe(true);
        expect(await pages('calculator').committedUsageFieldExists()).toBe(true);
        
    });
});
