class YopmailIframeComponent {

  get yopmailIframe() {
    return $('div[id="wmmailmain"] iframe');
  }

  get yopmailIframeId() {
    return ('iframe[id="ifmail"]');
  }

}
module.exports = YopmailIframeComponent;
