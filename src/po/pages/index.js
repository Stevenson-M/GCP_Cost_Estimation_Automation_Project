const BasePage = require('./base.page');
const MainPage = require('./main.page');
const SearchResultPage = require('./searchResult.page');
const CalculatorPage = require('./calculator.page');
const YopmailPage = require('./yopmail.page');

function pages(name){
    const items = {
        base: new BasePage(),
        main: new MainPage(),
        searchResult: new SearchResultPage(),
        calculator: new CalculatorPage(),
        yopmail: new YopmailPage()
    }
    return items[name];
}

module.exports = {
    BasePage,
    MainPage,
    SearchResultPage,
    CalculatorPage,
    YopmailPage,
    pages,
}
