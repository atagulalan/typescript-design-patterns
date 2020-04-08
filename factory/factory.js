var Asi = /** @class */ (function () {
    function Asi(name, procedure) {
        this.name = name;
        this.procedure = procedure;
    }
    Asi.prototype.getInfo = function () {
        console.log("\nA\u015F\u0131 durumu: " + (this.isVaccinated ? 'Olunmuş' : 'Olunmamış'), "\nA\u015F\u0131 ad\u0131: " + this.name, "\nA\u015F\u0131 y\u00F6ntemi: " + this.procedure);
    };
    Asi.prototype.vaccinate = function () {
        this.isVaccinated = true;
    };
    return Asi;
}());
var Maske = /** @class */ (function () {
    function Maske(name, percentage) {
        this.name = name;
        this.percentage = percentage;
    }
    Maske.prototype.getInfo = function () {
        console.log("\nMaske kullan\u0131m\u0131: " + (this.isWeared ? 'Kullanılmış' : 'Kullanılmamış'), "\nMaske ad\u0131: " + this.name, "\nMaske filtreleme y\u00FCzdesi: " + this.percentage + "%");
    };
    Maske.prototype.wear = function () {
        this.isWeared = true;
    };
    return Maske;
}());
// <1>
var CovidFactory = /** @class */ (function () {
    function CovidFactory() {
    }
    CovidFactory.prototype.produceProduct = function (urun) {
        // <2>
        if (urun.type === 'asi') {
            var asi = new Asi(urun.name, urun.procedure);
            return asi;
            // <3>
        }
        else if (urun.type === 'maske') {
            var maske = new Maske(urun.name, urun.percentage);
            return maske;
        }
        else {
            // <4>
            throw new Error('Aşı veya Maske seçin!');
        }
    };
    return CovidFactory;
}());
var covidFactory = new CovidFactory();
var fcd11 = covidFactory.produceProduct({
    name: 'FCD-11',
    type: 'asi',
    procedure: 'Koldan'
});
var n95 = covidFactory.produceProduct({
    name: 'N95',
    type: 'maske',
    percentage: 99.97
});
fcd11.vaccinate();
n95.wear();
fcd11.getInfo();
n95.getInfo();
