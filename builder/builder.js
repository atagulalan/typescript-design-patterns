var ServerBuilder = /** @class */ (function () {
    function ServerBuilder(name) {
        this.name = name;
        this.requests = [];
    }
    Object.defineProperty(ServerBuilder.prototype, "Name", {
        get: function () {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    ServerBuilder.prototype.setIpAddress = function (value) {
        this.ipAddress = value;
        return this;
    };
    Object.defineProperty(ServerBuilder.prototype, "IpAddress", {
        get: function () {
            return this.ipAddress;
        },
        enumerable: true,
        configurable: true
    });
    ServerBuilder.prototype.setPort = function (value) {
        this.port = value;
        return this;
    };
    Object.defineProperty(ServerBuilder.prototype, "Port", {
        get: function () {
            return this.port;
        },
        enumerable: true,
        configurable: true
    });
    ServerBuilder.prototype.post = function (uri, value) {
        this.requests.push({ type: 'post', uri: uri, function: value });
        return this;
    };
    ServerBuilder.prototype.get = function (uri, value) {
        this.requests.push({ type: 'get', uri: uri, function: value });
        return this;
    };
    Object.defineProperty(ServerBuilder.prototype, "Requests", {
        get: function () {
            return this.requests;
        },
        enumerable: true,
        configurable: true
    });
    ServerBuilder.prototype.build = function (afterCreation) {
        var server = new Server(this);
        afterCreation(this.port);
        return server;
    };
    return ServerBuilder;
}());
var Server = /** @class */ (function () {
    function Server(builder) {
        this.name = builder.Name;
        this.ipAddress = builder.IpAddress;
        this.port = builder.Port;
        this.requests = builder.Requests;
    }
    Object.defineProperty(Server.prototype, "Name", {
        get: function () {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Server.prototype, "IpAddress", {
        get: function () {
            return this.ipAddress;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Server.prototype, "Port", {
        get: function () {
            return this.port;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Server.prototype, "Requests", {
        get: function () {
            return this.requests;
        },
        enumerable: true,
        configurable: true
    });
    return Server;
}());
var App = new ServerBuilder("Xava's Server")
    .setIpAddress('127.0.0.1')
    .setPort(80);
App.get('/', function (req, res) {
    res.send('Hi universe!');
});
App.post('/login', function (req, res) {
    console.log('Login Credentials:', req.body);
    res.send('Logging in...');
});
App.post('/logout', function (req, res) {
    console.log('Logout Token:', req.body.token);
    res.send('Logging out...');
});
App.build(function (port) {
    console.log('\x1b[36m%s\x1b[0m', "Listening on port " + port, '\n');
});
console.log(App);
