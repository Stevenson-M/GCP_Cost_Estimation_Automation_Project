class CalculatorIframeComponent {
  get parentIFrameLocator() {
    return ('iframe[name^="goog"]');
  }

  get childIFrameLocator() {
    return ('iframe[id="myFrame"]');
  }
}
module.exports = CalculatorIframeComponent;
