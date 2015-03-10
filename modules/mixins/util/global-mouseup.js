var _listeningComponents = [];
var _mouseUpListenerIsActive = false;

var _includes = function (arr, item) {
  return arr.indexOf(item) !== -1;
};

var _handleMouseUp = function (ev) {
  _listeningComponents.forEach(function (component) {
    component.handleGlobalMouseUp(ev);
  });
};

var subscribeToGlobalMouseUp = function (component) {
  if (!_includes(_listeningComponents, component)) {
    _listeningComponents.push(component);
  }

  if (_listeningComponents.length > 0 && !_mouseUpListenerIsActive) {
    window.addEventListener("mouseup", _handleMouseUp);
    _mouseUpListenerIsActive = true;
  }
};

var unsubscribeFromGlobalMouseUp = function (component) {
  var index = _listeningComponents.indexOf(component);
  _listeningComponents.splice(index, 1);

  if (_listeningComponents.length === 0 && _mouseUpListenerIsActive) {
    window.removeEventListener("mouseup", _handleMouseUp);
    _mouseUpListenerIsActive = false;
  }
};

module.exports = {
  subscribeToGlobalMouseUp: subscribeToGlobalMouseUp,
  unsubscribeFromGlobalMouseUp: unsubscribeFromGlobalMouseUp
};
