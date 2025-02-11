class PopupManager {
  _defaultPopup: any = null
  register(_ref: any) {
    this._defaultPopup = _ref
  }

  unregister(_ref: any) {
    if (!!this._defaultPopup && this._defaultPopup._id && this._defaultPopup._id === _ref._id) {
      this._defaultPopup = null
    }
  }

  getDefault() {
    return this._defaultPopup
  }
}

export default new PopupManager()
