'use strict';

exports.__esModule = true;
exports.key = exports.keys = exports.flush = exports.forget = exports.deleter = exports.remove = exports.rememberForever = exports.remember = exports.has = exports.forever = exports.add = exports.put = exports.set = exports.pull = exports.get = undefined;

var _localforage = require('localforage');

var _localforage2 = _interopRequireDefault(_localforage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var get = exports.get = function get(key) {
  return new Promise(function (resolve, reject) {
    _localforage2.default.getItem(key).then(function (value) {
      var data = false;
      if (value) {
        if (value.minutes > new Date().getTime() || value.minutes === 0) {
          data = value.data;
        }
      }
      resolve(data);
    }).catch(function (err) {
      reject(err);
    });
  });
};

var pull = exports.pull = function pull(key) {
  return get(key);
};

var set = exports.set = function set(key, value) {
  var minutes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  return new Promise(function (resolve, reject) {
    _localforage2.default.setItem(key, {
      data: value,
      minutes: expiryTime(minutes)
    }).then(function (value) {
      resolve(value.data);
    }).catch(function (err) {
      reject(err);
    });
  });
};

var put = exports.put = function put(key, value) {
  var minutes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  return set(key, value, minutes);
};

var add = exports.add = function add(key, value) {
  var minutes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  return set(key, value, minutes);
};

var forever = exports.forever = function forever(key, value) {
  return set(key, value, 0);
};

var has = exports.has = function has(key) {
  return new Promise(function (resolve, reject) {
    get(key).then(function (value) {
      var has = false;
      if (value) {
        has = true;
      }
      resolve(has);
    }).catch(function (err) {
      reject(err);
    });
  });
};

var remember = exports.remember = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(key, value) {
    var minutes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return has(key);

          case 2:
            if (!_context.sent) {
              _context.next = 6;
              break;
            }

            return _context.abrupt('return', get(key));

          case 6:
            return _context.abrupt('return', set(key, value, minutes));

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function remember(_x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();

var rememberForever = exports.rememberForever = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(key, value) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return has(key);

          case 2:
            if (!_context2.sent) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt('return', get(key));

          case 6:
            return _context2.abrupt('return', set(key, value, 0));

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function rememberForever(_x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

var remove = exports.remove = function remove(key) {
  return new Promise(function (resolve, reject) {
    _localforage2.default.removeItem(key).then(function () {
      resolve();
    }).catch(function (err) {
      reject(err);
    });
  });
};

var deleter = exports.deleter = function deleter(key) {
  return remove(key);
};

var forget = exports.forget = function forget(key) {
  return remove(key);
};

var flush = exports.flush = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var index;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return keys();

          case 2:
            index = _context3.sent;

            index.forEach(function (value) {
              return remove(value);
            });

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function flush() {
    return _ref3.apply(this, arguments);
  };
}();

var keys = exports.keys = function keys() {
  return new Promise(function (resolve, reject) {
    _localforage2.default.keys().then(function (keys) {
      resolve(keys);
    }).catch(function (err) {
      reject(err);
    });
  });
};
var key = exports.key = function key(keyIndex) {
  return new Promise(function (resolve, reject) {
    _localforage2.default.key(keyIndex).then(function (keyName) {
      resolve(keyName);
    }).catch(function (err) {
      reject(err);
    });
  });
};

var expiryTime = function expiryTime(minutes) {
  if (minutes) {
    return new Date().getTime() + minutes * 60 * 1000;
  } else {
    return minutes;
  }
};
