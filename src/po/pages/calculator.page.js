const BasePage = require('./base.page');
const {CalculatorIframeComponent, ComputeEngineFormComponent,
     EstimateComponent, EmailEstimateComponent} = require('./../components');

class CalculatorPage extends BasePage {
    constructor() {
        super();
        this.iframe = new CalculatorIframeComponent();
        this.computeEngineForm = new ComputeEngineFormComponent();
        this.estimate = new EstimateComponent();
        this.emailEstimate = new EmailEstimateComponent();
    }

    async openWithUrl(url) {
        this.url = url;
        return this.open();
    }
    async switchToCalculatorIframe() {
        const parentIFrameLocator = await this.iframe.parentIFrameLocator;
        
        // Espera hasta que el iframe padre esté presente
        await browser.waitUntil(async () => {
          return (await browser.$(parentIFrameLocator)).isExisting();
        }, {timeout: 5000, timeoutMsg: 'expected iframe to be existing after 5s'});
        
        const parentIframe = await browser.$(parentIFrameLocator);
        await browser.switchToFrame(parentIframe);
        
        const childIFrameLocator = await this.iframe.childIFrameLocator;
        
        // Espera hasta que el iframe hijo esté presente
        await browser.waitUntil(async () => {
          return (await browser.$(childIFrameLocator)).isExisting();
        }, {timeout: 5000, timeoutMsg: 'expected iframe to be existing after 5s'});
        
        const childIframe = await browser.$(childIFrameLocator);
        await browser.switchToFrame(childIframe);
      }
      

    async selectOption(dropdown, option) {
        await dropdown.scrollIntoView({ block: 'center' });
        await dropdown.click();
        await option.waitForDisplayed({ timeout: 5000 });
        await option.click();
    }

    async selectComputeEngineOption() {
        await this.computeEngineForm.computeEngineOption.waitForDisplayed();
        await this.computeEngineForm.computeEngineOption.click();
    }

    async setNumberOfInstances(value) {
        await this.computeEngineForm.instancesInput.waitForDisplayed();
        await this.computeEngineForm.instancesInput.setValue(value);
    }
    
    async selectOperatingSystem() {
        await this.selectOption(
            this.computeEngineForm.operatingSystemDropdown, 
            this.computeEngineForm.operatingSystemFreeOption);
    }

    async selectProvisioningModel() {
        await this.selectOption(
            this.computeEngineForm.provisioningModelDropdown, 
            this.computeEngineForm.provisioningModelRegularOption);
    }

    async selectMachineFamily() {
        await this.selectOption(
            this.computeEngineForm.machineFamilyDropdown, 
            this.computeEngineForm.machineFamilyGeneralPurposeOption);
    }

    async selectSeries() {
        await this.selectOption(
            this.computeEngineForm.seriesDropdown, 
            this.computeEngineForm.seriesOption);
    }

    async selectMachineType() {
        await this.selectOption(
            this.computeEngineForm.machineTypeDropdown, 
            this.computeEngineForm.machineTypeOption);
    }

    async enableGPUs() {
        await this.computeEngineForm.addGPUs.waitForExist();
        await this.computeEngineForm.addGPUs.click();
    }

    async selectGpuType() {
        await this.selectOption(
            this.computeEngineForm.gpuTypeDropdown,
            this.computeEngineForm.gpuTypeTeslaV100Option);
    }

    async selectNumberOfGpus() {
        await this.selectOption(
            this.computeEngineForm.gpusNumberDropdown, 
            this.computeEngineForm.gpusNumberOption);
    }

    async selectLocalSSD() {
        await this.selectOption(
            this.computeEngineForm.localSSD, 
            this.computeEngineForm.localSSDOption);
    }

    async selectDatacenterLocation() {
        await this.selectOption(
            this.computeEngineForm.datacenterLocationDropdown, 
            this.computeEngineForm.datacenterLocationOption);
    }

    async selectCommittedUsage() {
        await this.selectOption(
            this.computeEngineForm.committedUsage,
            this.computeEngineForm.committedUsageOption);
    }

    async clickAddEstimateButton() {
        await this.computeEngineForm.addEstimate.click();
    }

    //--- Verifications of the selected options --- //
    async verifyCalculatorTitle(expectedTitle) {
        await expect(this.computeEngineForm.calculatorTitle).toHaveText(expectedTitle);
    }

    async verifyNumberOfInstances(value) {
        await expect(this.computeEngineForm.instancesInput).toHaveValue(value);
    }

    async verifyInstacesForIsDisplayed() {
        await expect(this.computeEngineForm.instancesFor).toBeDisplayed();
    }

    async verifyOperatingSystemDropdownText(expectedText) {
        const actualText = await this.computeEngineForm.operatingSystemDropdown.getText();
        expect(actualText).toBe(expectedText);
    }

    async verifyProvisioningModelDropdownText(expectedText) {
        const actualText = await this.computeEngineForm.provisioningModelDropdown.getText();
        expect(actualText).toBe(expectedText);
    }

    async verifyMachineFamilyDropdownText(expectedText) {
        const actualText = await this.computeEngineForm.machineFamilyDropdown.getText();
        expect(actualText).toBe(expectedText);
    }

    async verifySeriesDropdownText(expectedText) {
        const actualText = await this.computeEngineForm.seriesDropdown.getText();
        expect(actualText).toBe(expectedText);
    }

    async verifySelectMachineTypeDropdownText(expectedText) {
        const actualText = await this.computeEngineForm.machineTypeDropdown.getText();
        expect(actualText).toBe(expectedText);
    }

    async verifySelectGpuTypeDropdownText(expectedText) {
        const actualText = await this.computeEngineForm.gpuTypeDropdown.getText();
        expect(actualText).toBe(expectedText);
    }

    async verifyGpusNumberDropdownText(expectedText) {
        const actualText = await this.computeEngineForm.gpusNumberDropdown.getText();
        expect(actualText).toBe(expectedText);
    }

    async verifySelectSSDDropdownText(expectedText) {
        const actualText = await this.computeEngineForm.localSSD.getText();
        expect(actualText).toBe(expectedText);
    }

    async verifyDatacenterLocationDropdownText(expectedText) {
        const actualText = await this.computeEngineForm.datacenterLocationDropdown.getText();
        expect(actualText).toBe(expectedText);
    }

    async verifyCommittedUsageDropdownText(expectedText) {
        const actualText = await this.computeEngineForm.committedUsage.getText();
        expect(actualText).toBe(expectedText);
    }
    //--- End of verifications of the selected options --- //

    async getTotalEstimatedCostText() {
        return await this.estimate.totalEstimated.getText();
    }

    async fillAndSendEmailEstimate(randomEmail) {
        await this.switchToCalculatorIframe();
        await this.estimate.emailShareButton.waitForClickable();
        await this.estimate.emailShareButton.click();
        await this.emailEstimate.emailEstimateInput.waitForClickable();
        await this.emailEstimate.emailEstimateInput.setValue(randomEmail);
        await this.emailEstimate.sendEmailButton.waitForClickable();
        await this.emailEstimate.sendEmailButton.click();
    }

    //--- Métodos para las pruebas de sanity ---//
    async numberOfInstancesFieldExists() {
        await this.computeEngineForm.instancesInput.scrollIntoView({ block: 'center' });
        return await this.computeEngineForm.instancesInput.isExisting();
    }
    
    async operatingSystemFieldExists() {
        await this.computeEngineForm.operatingSystemDropdown.scrollIntoView({ block: 'center' });
        return await this.computeEngineForm.operatingSystemDropdown.isExisting();
    }
    
    async provisioningModelFieldExists() {
        await this.computeEngineForm.provisioningModelDropdown.scrollIntoView({ block: 'center' });
        return await this.computeEngineForm.provisioningModelDropdown.isExisting();
    }
    
    async machineFamilyFieldExists() {
        await this.computeEngineForm.machineFamilyDropdown.scrollIntoView({ block: 'center' });
        return await this.computeEngineForm.machineFamilyDropdown.isExisting();
    }
    
    async seriesFieldExists() {
        
        await this.computeEngineForm.seriesDropdown.scrollIntoView({ block: 'center' });
        return await this.computeEngineForm.seriesDropdown.isExisting();
    }
    
    async machineTypeFieldExists() {
        await this.computeEngineForm.machineTypeDropdown.scrollIntoView({ block: 'center' });
        return await this.computeEngineForm.machineTypeDropdown.isExisting();
    }
    
    async gpuTypeFieldExists() {
        await this.computeEngineForm.gpuTypeDropdown.scrollIntoView({ block: 'center' });
        return await this.computeEngineForm.gpuTypeDropdown.isExisting();
    }
    
    async gpusNumberFieldExists() {
        await this.computeEngineForm.gpusNumberDropdown.scrollIntoView({ block: 'center' });
        return await this.computeEngineForm.gpusNumberDropdown.isExisting();
    }
    
    async localSSDFieldExists() {
        await this.computeEngineForm.localSSD.scrollIntoView({ block: 'center' });
        return await this.computeEngineForm.localSSD.isExisting();
    }
    
    async datacenterLocationFieldExists() {
        await this.computeEngineForm.datacenterLocationDropdown.scrollIntoView({ block: 'center' });
        return await this.computeEngineForm.datacenterLocationDropdown.isExisting();
    }
    
    async committedUsageFieldExists() {
        await this.computeEngineForm.committedUsage.scrollIntoView({ block: 'center' });
        return await this.computeEngineForm.committedUsage.isExisting();
    }
//--- Fin de los métodos para las pruebas de sanity ---//
}

module.exports = CalculatorPage;
