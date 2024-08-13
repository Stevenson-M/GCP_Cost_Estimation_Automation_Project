class ComputeEngineFormComponent {

    get calculatorTitle() { return $('div[class="md-toolbar-tools"]'); }
    get computeEngineOption() { 
        return $('.hexagon[title="Compute Engine"] .hexagon-in1 .hexagon-in2'); }
    get instancesInput() { return $('[id="input_100"]'); }
    get instancesFor() { return $('[for="input_101"]'); }
    get operatingSystemDropdown() { return $('md-select-value#select_value_label_92'); }
    get operatingSystemFreeOption() { return $('md-option[value="free"]'); }
    get provisioningModelDropdown() { return $('md-select-value#select_value_label_93'); }
    get provisioningModelRegularOption() { return $('md-option[value="regular"]'); }
    get machineFamilyDropdown() { return $('#select_123'); }
    get machineFamilyGeneralPurposeOption() { return $('md-option[value="gp"]'); }
    get seriesDropdown() { return $('md-select-value#select_value_label_95'); }
    get seriesOption() { return $('md-option[value="n1"]'); }
    get machineTypeDropdown() { return $('md-select-value#select_value_label_96'); }
    get machineTypeOption() { return $('md-option[ng-repeat="instance in typeInfo"]:nth-of-type(4)'); }
    get addGPUs() {
        return $('md-input-container md-checkbox[ng-model="listingCtrl.computeServer.addGPUs"]'); }
    get gpuTypeDropdown() { return $('md-input-container md-select[placeholder="GPU type"]'); }
    get gpuTypeTeslaV100Option() { return $('md-option[value="NVIDIA_TESLA_V100"]'); }
    get gpusNumberDropdown() { 
        return $('md-input-container md-select[placeholder="Number of GPUs"]'); }
    get gpusNumberOption() { 
        return $('div[class="md-select-menu-container md-active md-clickable"] md-option:nth-child(2)'); }
    get localSSD() { 
        return $('md-input-container md-select md-select-value[id="select_value_label_468"]'); }
    get localSSDOption() { return $('md-content md-option[id="select_option_495"]'); }    
    get datacenterLocationDropdown() { return $('md-select-value#select_value_label_98'); }
    get datacenterLocationOption() { return $('md-option[value="europe-west3"]'); }
    get committedUsage() { return $('[id="select_value_label_99"]'); }
    get committedUsageOption() { return $('md-option[id="select_option_138"]'); }
    get addEstimate() { return $('button[ng-click="listingCtrl.addComputeServer(ComputeEngineForm);"]'); }

}
module.exports = ComputeEngineFormComponent;