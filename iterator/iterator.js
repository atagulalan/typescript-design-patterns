/**
 * Amaç: Bir koleksiyonun öğelerini, temel temsilini (liste, yığın,
 * ağaç vb.) Ortaya çıkarmadan geçirmenizi sağlar.
 */
/**
 * Bu sınıflar her zaman geçerli geçiş konumunu saklar.
 */
var AlfabetikYineleyici = /** @class */ (function () {
    function AlfabetikYineleyici(koleksiyon, tersine) {
        if (tersine === void 0) { tersine = false; }
        /**
         * Geçerli geçiş konumunu saklar. Bir yineleyici, özellikle
         * belirli bir koleksiyonla çalışması gerekiyorsa, yineleme
         * durumunu depolamak için birçok başka alana sahip olabilir.
         */
        this.pozisyon = 0;
        /**
         * Bu değişken geçiş yönünü gösterir
         */
        this.tersine = false;
        this.koleksiyon = koleksiyon;
        this.tersine = tersine;
        if (tersine) {
            this.pozisyon = koleksiyon.alVeriBoyutu() - 1;
        }
    }
    AlfabetikYineleyici.prototype.geriSar = function () {
        this.pozisyon = this.tersine ?
            this.koleksiyon.alVeriBoyutu() - 1 :
            0;
    };
    AlfabetikYineleyici.prototype.mevcut = function () {
        return this.koleksiyon.alVeriler()[this.pozisyon];
    };
    AlfabetikYineleyici.prototype.anahtar = function () {
        return this.pozisyon;
    };
    AlfabetikYineleyici.prototype.sonraki = function () {
        var veri = this.koleksiyon.alVeriler()[this.pozisyon];
        this.pozisyon += this.tersine ? -1 : 1;
        return veri;
    };
    AlfabetikYineleyici.prototype.gecerli = function () {
        if (this.tersine) {
            return this.pozisyon >= 0;
        }
        return this.pozisyon < this.koleksiyon.alVeriBoyutu();
    };
    return AlfabetikYineleyici;
}());
/**
 * Somut Koleksiyonlar, koleksiyon sınıfıyla uyumlu yeni yineleyici
 * örneklerini almak için bir veya birkaç yöntem sağlar.
 */
var KelimeKoleksiyonu = /** @class */ (function () {
    function KelimeKoleksiyonu() {
        this.veriler = [];
    }
    KelimeKoleksiyonu.prototype.alVeriler = function () {
        return this.veriler;
    };
    KelimeKoleksiyonu.prototype.alVeriBoyutu = function () {
        return this.veriler.length;
    };
    KelimeKoleksiyonu.prototype.ekleVeri = function (veri) {
        this.veriler.push(veri);
    };
    KelimeKoleksiyonu.prototype.alYineleyici = function () {
        return new AlfabetikYineleyici(this);
    };
    KelimeKoleksiyonu.prototype.alTersineYineleyici = function () {
        return new AlfabetikYineleyici(this, true);
    };
    return KelimeKoleksiyonu;
}());
/**
 * İstemci kodu, programınızda tutmak istediğiniz dolaylılık
 * düzeyine bağlı olarak Somut Yineleyici veya Koleksiyon
 * sınıfları hakkında bilgi sahibi olabilir veya olmayabilir.
 */
var koleksiyon = new KelimeKoleksiyonu();
koleksiyon.ekleVeri('Bir');
koleksiyon.ekleVeri('İki');
koleksiyon.ekleVeri('Üç');
var yineleyici = koleksiyon.alYineleyici();
console.log('\nDüz dolaşım:');
while (yineleyici.gecerli()) {
    console.log(yineleyici.sonraki());
}
console.log('\nTers dolaşım:');
var tersYineleyici = koleksiyon.alTersineYineleyici();
while (tersYineleyici.gecerli()) {
    console.log(tersYineleyici.sonraki());
}
