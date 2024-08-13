const {HeaderComponent} = require('./../components');

class BasePage {
    constructor(url) {
        this.url = url;
        this.headerComponent = new HeaderComponent();
      }
    
      open() {
        return browser.url(this.url);
      }
}
module.exports = BasePage;