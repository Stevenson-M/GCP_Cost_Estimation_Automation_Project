const { pages } = require('../../po/pages');

// Requerir los archivos de datos de prueba
const testData = require(`../../test/data/testData.${process.env.ENV}.json`);

describe('Google Cloud Platform Pricing Calculator Regression Test', function () {

    beforeEach(async function () {
        await browser.deleteCookies();
        await browser.maximizeWindow();
    });

    it('should open Google Cloud Platform Pricing Calculator', async function () {
        const calculatorSearch = testData.calculatorSearch;
        await pages('main').open();
        await pages('main').search(calculatorSearch);
    });

    it('should select the calculator from search results', async function () {
        await pages('searchResult').selectCalculator();
    });

    it('should fill out and verify the calculator form', async function () {
        const calculatorTitle = testData.calculatorTitle;
        const numberOfInstances = testData.numberOfInstances;
        const expectedNumberOfInstances = testData.expectedNumberOfInstances;
        const operatingSystem = testData.operatingSystem;
        const provisioningModel = testData.provisioningModel;
        const machineFamily = testData.machineFamily;
        const series = testData.series;
        const machineType = testData.machineType;
        const gpuType = testData.gpuType;
        const gpusNumber = testData.gpusNumber;
        const localSSD = testData.localSSD;
        const datacenterLocation = testData.datacenterLocation;
        const committedUsage = testData.committedUsage;


        await pages('calculator').switchToCalculatorIframe();
        await pages('calculator').verifyCalculatorTitle(calculatorTitle);

        await pages('calculator').selectComputeEngineOption();
        
        await pages('calculator').setNumberOfInstances(numberOfInstances);
        await pages('calculator').verifyNumberOfInstances(expectedNumberOfInstances);
        
        await pages('calculator').verifyInstacesForIsDisplayed();

        await pages('calculator').selectOperatingSystem();
        await pages('calculator').verifyOperatingSystemDropdownText(operatingSystem);

        await pages('calculator').selectProvisioningModel();
        await pages('calculator').verifyProvisioningModelDropdownText(provisioningModel);

        await pages('calculator').selectMachineFamily();
        await pages('calculator').verifyMachineFamilyDropdownText(machineFamily);

        await pages('calculator').selectSeries();
        await pages('calculator').verifySeriesDropdownText(series);

        await pages('calculator').selectMachineType();
        await pages('calculator').verifySelectMachineTypeDropdownText(machineType);

        await pages('calculator').enableGPUs();

        await pages('calculator').selectGpuType();
        await pages('calculator').verifySelectGpuTypeDropdownText(gpuType);

        await pages('calculator').selectNumberOfGpus();
        await pages('calculator').verifyGpusNumberDropdownText(gpusNumber);

        await pages('calculator').selectLocalSSD();
        await pages('calculator').verifySelectSSDDropdownText(localSSD);

        await pages('calculator').selectDatacenterLocation();
        await pages('calculator').verifyDatacenterLocationDropdownText(datacenterLocation);

        await pages('calculator').selectCommittedUsage();
        await pages('calculator').verifyCommittedUsageDropdownText(committedUsage);
    });

    it('should add the estimate and verify the total estimated cost', async function () {
        await pages('calculator').clickAddEstimateButton();
    
        const totalEstimatedCostText = await pages('calculator').getTotalEstimatedCostText();
         // Esta línea de código utiliza una expresión regular para extraer el costo total estimado del texto.
        // La expresión regular busca una secuencia de números que puede tener uno o tres dígitos al principio (\d{1,3}),
        // seguido de grupos de tres dígitos separados por comas (?:,\d{3})*,
        // y una parte decimal opcional (?:\.\d{2})?.
        // El método match() devuelve un array con todas las coincidencias encontradas.
        // Al final, [0] se utiliza para obtener la primera coincidencia del array, que es el costo total estimado.
        const totalEstimatedCost = totalEstimatedCostText.match(/(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/)[0];
        const expectedText = `Total Estimated Cost: USD ${totalEstimatedCost} per 1 month`;
        expect(totalEstimatedCostText).toBe(expectedText);
    });   

    it('should send the estimate by email and verify the email', async function () {

        const totalEstimatedCostText = await pages('calculator').getTotalEstimatedCostText();
        const totalEstimatedCost = totalEstimatedCostText.match(/(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/)[0];

        const randomEmail = await pages('yopmail').createYopmail();
        await pages('yopmail').validateTotalCostInEmail(totalEstimatedCost, randomEmail);
    
    });
   
});
