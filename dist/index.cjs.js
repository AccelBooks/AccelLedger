'use strict';

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
      t && (r = t);
      var n = 0,
        F = function () {};
      return {
        s: F,
        n: function () {
          return n >= r.length ? {
            done: !0
          } : {
            done: !1,
            value: r[n++]
          };
        },
        e: function (r) {
          throw r;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o,
    a = !0,
    u = !1;
  return {
    s: function () {
      t = t.call(r);
    },
    n: function () {
      var r = t.next();
      return a = r.done, r;
    },
    e: function (r) {
      u = !0, o = r;
    },
    f: function () {
      try {
        a || null == t.return || t.return();
      } finally {
        if (u) throw o;
      }
    }
  };
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

var Account = /*#__PURE__*/function () {
  function Account(name, fullName) {
    _classCallCheck(this, Account);
    this.parent = null;
    this.balance = {};
    this.name = name;
    this.fullName = fullName;
  }
  return _createClass(Account, [{
    key: "setParent",
    value: function setParent(parent) {
      this.parent = parent;
    }
  }]);
}();
var AccelLedger = /*#__PURE__*/function () {
  function AccelLedger(transactions) {
    _classCallCheck(this, AccelLedger);
    this.accounts = {};
    this.transactions = transactions;
    this.processTransactions();
  }
  return _createClass(AccelLedger, [{
    key: "processTransactions",
    value: function processTransactions() {
      var _iterator = _createForOfIteratorHelper(this.transactions),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var transaction = _step.value;
          if (transaction.postings.length >= 2) {
            var _transaction$postings = _slicedToArray(transaction.postings, 2),
              firstPosting = _transaction$postings[0],
              secondPosting = _transaction$postings[1];
            if (firstPosting.amount && !secondPosting.amount) {
              secondPosting.amount = Object.assign(Object.assign({}, firstPosting.amount), {
                sign: firstPosting.amount.sign === "-" ? "+" : "-",
                value: firstPosting.amount.number
              });
            }
          }
          var _iterator2 = _createForOfIteratorHelper(transaction.postings),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var posting = _step2.value;
              this.ensureAccount(posting.account.fullName);
              if (posting.amount) {
                this.updateAccountBalance(posting.account.fullName, posting.amount);
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "updateAccountBalance",
    value: function updateAccountBalance(accountPath, amount) {
      var currentPath = [];
      var _iterator3 = _createForOfIteratorHelper(accountPath),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var segment = _step3.value;
          currentPath.push(segment);
          var fullName = currentPath.join(":");
          var account = this.accounts[fullName];
          if (account) {
            var commodity = amount.commodity || "DEFAULT";
            if (!account.balance[commodity]) {
              account.balance[commodity] = Object.assign(Object.assign({}, amount), {
                value: "0"
              });
            }
            var currentValue = parseFloat(account.balance[commodity].number) || 0;
            var amountValue = parseFloat(amount.number) || 0;
            console.log("Current value: ".concat(currentValue, ", Amount value: ").concat(amountValue, ", Current sign: ").concat(account.balance[commodity].sign, ", Amount sign: ").concat(amount.sign));
            var newValue = (account.balance[commodity].sign === "-" ? -currentValue : currentValue) + (amount.sign === "-" ? -amountValue : amountValue);
            account.balance[commodity] = Object.assign(Object.assign({}, account.balance[commodity]), {
              value: Math.abs(newValue).toFixed(2),
              sign: newValue < 0 ? "-" : "+"
            });
            console.log("Updated balance for ".concat(fullName, " - ").concat(commodity, ": ").concat(account.balance[commodity].sign || "").concat(account.balance[commodity].number));
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  }, {
    key: "ensureAccount",
    value: function ensureAccount(accountPath) {
      var currentAccount = null;
      for (var i = 0; i < accountPath.length; i++) {
        var fullPath = accountPath.slice(0, i + 1);
        var fullName = fullPath.join(":");
        if (!this.accounts[fullName]) {
          var newAccount = new Account(accountPath[i], fullPath);
          this.accounts[fullName] = newAccount;
          if (currentAccount) {
            newAccount.setParent(currentAccount);
          }
        }
        currentAccount = this.accounts[fullName];
      }
    }
  }, {
    key: "getLedgerByMonth",
    value: function getLedgerByMonth(year, month) {
      return this.transactions.filter(function (t) {
        return t.date.year.toString() === year && t.date.month.toString() === month;
      });
    }
  }, {
    key: "getLedgerByYear",
    value: function getLedgerByYear(year) {
      return this.transactions.filter(function (t) {
        return t.date.year.toString() === year;
      });
    }
  }, {
    key: "getBalances",
    value: function getBalances() {
      var _this = this;
      var balances = {};
      var _aggregateBalances = function aggregateBalances(account) {
        var aggregatedBalance = {};
        for (var _i = 0, _Object$entries = Object.entries(account.balance); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            commodity = _Object$entries$_i[0],
            amount = _Object$entries$_i[1];
          aggregatedBalance[commodity] = parseFloat(amount.number) * (amount.sign === "-" ? -1 : 1);
        }
        for (var _i2 = 0, _Object$values = Object.values(_this.accounts); _i2 < _Object$values.length; _i2++) {
          var childAccount = _Object$values[_i2];
          if (childAccount.parent === account) {
            var childBalance = _aggregateBalances(childAccount);
            for (var _i3 = 0, _Object$entries2 = Object.entries(childBalance); _i3 < _Object$entries2.length; _i3++) {
              var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i3], 2),
                _commodity = _Object$entries2$_i[0],
                _amount = _Object$entries2$_i[1];
              aggregatedBalance[_commodity] = (aggregatedBalance[_commodity] || 0) + _amount;
            }
          }
        }
        balances[account.fullName.join(":")] = aggregatedBalance;
        return aggregatedBalance;
      };
      for (var _i4 = 0, _Object$values2 = Object.values(this.accounts); _i4 < _Object$values2.length; _i4++) {
        var account = _Object$values2[_i4];
        if (!account.parent) {
          _aggregateBalances(account);
        }
      }
      return balances;
    }
  }, {
    key: "getAccountHierarchy",
    value: function getAccountHierarchy() {
      var rootAccounts = {};
      for (var _i5 = 0, _Object$values3 = Object.values(this.accounts); _i5 < _Object$values3.length; _i5++) {
        var account = _Object$values3[_i5];
        if (!account.parent) {
          rootAccounts[account.name] = this.buildHierarchy(account);
        }
      }
      return rootAccounts;
    }
  }, {
    key: "buildHierarchy",
    value: function buildHierarchy(account) {
      var result = {
        name: account.name,
        fullName: account.fullName,
        balance: account.balance,
        children: {}
      };
      for (var _i6 = 0, _Object$values4 = Object.values(this.accounts); _i6 < _Object$values4.length; _i6++) {
        var childAccount = _Object$values4[_i6];
        if (childAccount.parent === account) {
          result.children[childAccount.name] = this.buildHierarchy(childAccount);
        }
      }
      return result;
    }
  }]);
}();

exports.AccelLedger = AccelLedger;
//# sourceMappingURL=index.cjs.js.map
