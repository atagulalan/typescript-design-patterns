/**
 * Nesne bazı önemli durumlara sahiptir ve durum değiştiğinde gözlemcilere haber verir
 */
var SomutNesne = /** @class */ (function () {
    function SomutNesne() {
        /**
         * @type {Gozlemci[]} Abonelerin listesi. Gerçek hayatta, abonelerin listesi daha
         * kapsamlı bir şekilde saklanabilir (olay türüne göre vb.)
         */
        this.gozlemciListesi = [];
    }
    /**
     * Abonelik yönetimi metodları
     */
    SomutNesne.prototype.bagla = function (gozlemci) {
        var isExist = this.gozlemciListesi.includes(gozlemci);
        if (isExist) {
            return console.log('Nesne: Zaten gözlemciye bağlanmıştı.');
        }
        var gozlemciAdi = gozlemci.name;
        console.log(gozlemciAdi + " ba\u011Fland\u0131.");
        this.gozlemciListesi.push(gozlemci);
    };
    SomutNesne.prototype.ayir = function (gozlemci) {
        var i = this.gozlemciListesi.indexOf(gozlemci);
        if (i === -1) {
            return console.log('Nesne: Gözlemci bulunamadı.');
        }
        var gozlemciAdi = this.gozlemciListesi[i].name;
        this.gozlemciListesi.splice(i, 1);
        console.log(gozlemciAdi + " ayr\u0131ld\u0131.");
    };
    /**
     * Her aboneyi bilgilendir
     */
    SomutNesne.prototype.bilgilendir = function () {
        console.log('Nesne: Gözlemcileri bilgilendiriyorum');
        for (var _i = 0, _a = this.gozlemciListesi; _i < _a.length; _i++) {
            var gozlemci = _a[_i];
            gozlemci.guncelle(this);
        }
    };
    /**
     * Genellikle, abonelik mantığı bir nesnenin gerçekten yapabileceğinin
     * sadece bir kısmıdır. Konular genellikle önemli bir iş mantığına
     * sahiptir, bu da önemli bir şey olduğunda (veya sonrasında) bir
     * bildirim yöntemini tetikler.
     */
    SomutNesne.prototype.durumDegistir = function () {
        this.durum = Math.floor(Math.random() * (10 + 1));
        console.log("\nNesne: Durumum de\u011Fi\u015Fti: " + this.durum);
        this.bilgilendir();
    };
    return SomutNesne;
}());
/**
 * Somut Gözlemciler, bağlı oldukları nesne tarafından yayınlanan güncellemelere tepki
 * gösterir.
 */
var SomutGözlemciA = /** @class */ (function () {
    function SomutGözlemciA() {
        this.name = "Gözlemci A";
    }
    SomutGözlemciA.prototype.guncelle = function (nesne) {
        if (nesne.durum < 3) {
            console.log(this.name + ": 3'ten k\u00FC\u00E7\u00FCk");
        }
    };
    return SomutGözlemciA;
}());
var SomutGözlemciB = /** @class */ (function () {
    function SomutGözlemciB() {
        this.name = "Gözlemci B";
    }
    SomutGözlemciB.prototype.guncelle = function (nesne) {
        if (nesne.durum === 0 || nesne.durum >= 2) {
            console.log(this.name + ": 1 de\u011Fil");
        }
    };
    return SomutGözlemciB;
}());
/**
 * İstemci kodu
 */
var nesne = new SomutNesne();
var gozlemci1 = new SomutGözlemciA();
nesne.bagla(gozlemci1);
var gozlemci2 = new SomutGözlemciB();
nesne.bagla(gozlemci2);
nesne.durumDegistir();
nesne.durumDegistir();
nesne.ayir(gozlemci2);
nesne.durumDegistir();
