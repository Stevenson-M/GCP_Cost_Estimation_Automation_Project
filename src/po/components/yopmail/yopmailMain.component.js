class YopmailHomeComponent {

  get emailInput() {
    return $('input[id="login"]');
  }

  get refreshButton() {
    return $('button[id="refresh"]');
  }

  get emailCount() {
    return $('div[id="nbmail"]');
  }
  
}
module.exports = YopmailHomeComponent;
