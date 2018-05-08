'use strict';

var BaseView = require('./base-view');
var addSelectionEventHandler = require('../lib/add-selection-event-handler');
var paymentMethodTypes = require('../constants').paymentMethodTypes;

function DeleteConfirmationView() {
  BaseView.apply(this, arguments);

  this._initialize();
}

DeleteConfirmationView.prototype = Object.create(BaseView.prototype);
DeleteConfirmationView.prototype.constructor = DeleteConfirmationView;
DeleteConfirmationView.ID = DeleteConfirmationView.prototype.ID = 'delete-confirmation';

DeleteConfirmationView.prototype._initialize = function () {
  this._yesButton = this.getElementById('delete-confirmation__yes');
  this._noButton = this.getElementById('delete-confirmation__no');
  this._messageBox = this.getElementById('delete-confirmation__message');

  addSelectionEventHandler(this._yesButton, this._selectYes.bind(this));
  addSelectionEventHandler(this._noButton, this._selectNo.bind(this));
};

DeleteConfirmationView.prototype.applyPaymentMethod = function (paymentMethod) {
  var identifier;
  var messageText = this.strings[paymentMethod.type + 'DeleteConfirmationMessage'];

  if (messageText) {
    switch (paymentMethod.type) {
      case paymentMethodTypes.card:
        identifier = paymentMethod.details.lastFour;
        break;
      case paymentMethodTypes.paypal:
        identifier = paymentMethod.details.email;
        break;
      case paymentMethodTypes.venmo:
        identifier = paymentMethod.details.username;
        break;
      default:
        break;
    }

    messageText = messageText.replace('{{identifier}}', identifier);
  } else {
    messageText = this.strings.genericDeleteConfirmationMessage;
  }
  this._messageBox.innerText = messageText;
};

DeleteConfirmationView.prototype._selectYes = function () {
};

DeleteConfirmationView.prototype._selectNo = function () {
};

module.exports = DeleteConfirmationView;