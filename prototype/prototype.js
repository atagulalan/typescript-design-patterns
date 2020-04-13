var Human = /** @class */ (function () {
    function Human(name) {
        this.name = name;
    }
    return Human;
}());
/**
 * Farklı tipteki alanlara sahip, klonlama yeteneğine sahip örnek sınıf.
 */
var Prototype = /** @class */ (function () {
    function Prototype() {
    }
    //DİKKAT: STATİKLERİ KOPYALAMAZ
    Prototype.prototype.cloneObject = function (what) {
        return Object.assign(Object.create(Object.getPrototypeOf(what)), what);
    };
    Prototype.prototype.deepClone = function () {
        var clone = this.cloneObject(this);
        clone.component = this.cloneObject(this.component);
        clone.circularReference = this.cloneObject(this.circularReference);
        return clone;
    };
    Prototype.prototype.shallowClone = function () {
        var clone = this;
        clone.component = this.component;
        clone.circularReference = this.circularReference;
        return clone;
    };
    return Prototype;
}());
var ComponentWithBackReference = /** @class */ (function () {
    function ComponentWithBackReference(prototype) {
        this.prototype = prototype;
    }
    return ComponentWithBackReference;
}());
function checkClone(type, o1, o2) {
    if (o1.primitive === o2.primitive) {
        console.log(type, 'Primitifler birbirine eşit');
    }
    else {
        console.log(type, 'PRİMİTİFLER EŞİT DEĞİL');
    }
    if (o1.component !== o2.component) {
        console.log(type, 'Bileşen referansları aynı yeri göstermiyor');
    }
    else {
        console.log(type, 'BİLEŞENLER AYNI YERİ GÖSTERİYOR');
    }
    if (o1.circularReference !== o2.circularReference) {
        console.log(type, 'Geri referanslı sınıfın geri referansı da klonlanmış');
    }
    else {
        console.log(type, 'GERİ REFERANS DOĞRU KLONLANMAMIŞ');
    }
    if (o1.circularReference.prototype !== o2.circularReference.prototype) {
        console.log(type, 'Geri referanslı bileşen kendini gösteriyor');
    }
    else {
        console.log(type, 'GERİ REFERANS ESKİYİ GÖSTERİYOR');
    }
    console.log('\n');
}
function printTable(o1, o2) {
    console.table({
        primitive: [o1.primitive, o2.primitive],
        component: [o1.component, o2.component],
        circular: [o1.circularReference, o2.circularReference],
        prototype: [o1.circularReference.prototype, o2.circularReference.prototype]
    });
}
var p1 = new Prototype();
p1.primitive = 1;
p1.component = new Human('Omae Wa');
p1.circularReference = new ComponentWithBackReference(p1);
var p2 = p1.deepClone();
checkClone('Deep Clone:', p1, p2);
var p3 = p1.shallowClone();
checkClone('Shallow Clone:', p1, p3);
// Değiştiriyoruz
p1.primitive = 2;
p1.component = new Human('Mou Shindeiru');
p1.circularReference = new ComponentWithBackReference(p1);
// Bakalım kimler değişmiş
printTable(p1, p2);
printTable(p1, p3);
