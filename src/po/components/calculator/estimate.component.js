class EstimateComponent {
  get totalEstimated() {
    return $('h2[class="md-title"] b[class="ng-binding"]');
  }

  get totalEstimatedAmount() {
    return $('//b[contains(text(), "Total Estimated Cost:")]/text()[2]');
  }

  get emailShareButton() {
    return $('//span[text()="email"]');
  }

}
module.exports = EstimateComponent;
