const {SearchComponent} = require('./../components');

class SearchResultPage {
    constructor() {
        this.searchResult = new SearchComponent();
    }

    async selectCalculator() {
        await this.searchResult.searchResult.click();    
    }
}

module.exports = SearchResultPage;