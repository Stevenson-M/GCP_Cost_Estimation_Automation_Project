class EmailEstimateComponent {
  get emailEstimateInput() {
    return $('form[name="emailForm"] md-input-container input[type="email"]');
  }

  get sendEmailButton() {
    return $('md-dialog-actions button:nth-child(2)');
  }
}
module.exports = EmailEstimateComponent;
