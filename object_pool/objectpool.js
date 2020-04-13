var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// <1>
var PoolManager = /** @class */ (function () {
    // <2>
    function PoolManager() {
        this.boyut = 0;
        this.pools = [];
    }
    PoolManager.getInstance = function () {
        if (!PoolManager.instance) {
            PoolManager.instance = new PoolManager();
        }
        return PoolManager.instance;
    };
    PoolManager.prototype.takeObject = function () {
        if (this.boyut > 0) {
            this.boyut = this.boyut - 1;
            return this.pools.pop();
        }
        else {
            console.error('\x1b[31m%s\x1b[0m', 'Şu an tüm eşyalar alındı, lütfen bekleyin.');
        }
    };
    PoolManager.prototype.releaseObject = function (obj) {
        this.boyut = this.boyut + 1;
        this.pools.push(obj);
    };
    return PoolManager;
}());
var Product = /** @class */ (function () {
    function Product(name) {
        this.name = name;
    }
    Product.prototype.getName = function () {
        return this.name;
    };
    return Product;
}());
var Client = /** @class */ (function () {
    function Client(name) {
        this.name = name;
    }
    Client.prototype.getName = function () {
        return this.name;
    };
    Client.prototype.ownProduct = function () {
        var _this = this;
        this.owns = poolManager.takeObject();
        if (this.owns) {
            console.log('\x1b[33m%s\x1b[0m', this.name + ", art\u0131k " + this.owns.getName() + " nesnesine sahip.");
            setTimeout(function () {
                console.log('\x1b[36m%s\x1b[0m', _this.name + ", sahip oldu\u011Fu " + _this.owns.getName() + " nesnesini b\u0131rak\u0131yor.");
                poolManager.releaseObject(_this.owns);
            }, Math.random() * 2000 + 4000, this);
        }
        else {
            setTimeout(function () {
                _this.ownProduct();
            }, 5000, this);
        }
    };
    return Client;
}());
var poolManager = PoolManager.getInstance();
poolManager.releaseObject(new Product('Armut'));
poolManager.releaseObject(new Product('Elma'));
poolManager.releaseObject(new Product('Ayva'));
function createUsers(clientNames) {
    return __awaiter(this, void 0, void 0, function () {
        var clientArray, clients;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    clientArray = clientNames.map(function (clientName) { return __awaiter(_this, void 0, void 0, function () {
                        var client;
                        return __generator(this, function (_a) {
                            client = new Client(clientName);
                            client.ownProduct();
                            return [2 /*return*/, client];
                        });
                    }); });
                    return [4 /*yield*/, Promise.all(clientArray)];
                case 1:
                    clients = _a.sent();
                    return [2 /*return*/, clients];
            }
        });
    });
}
createUsers(['Ahmet', 'Arda', 'Nagihan', 'Mustafa', 'Ömer', 'Alp']);
