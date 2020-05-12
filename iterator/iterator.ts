/**
 * Amaç: Bir koleksiyonun öğelerini, temel temsilini (liste, yığın,
 * ağaç vb.) Ortaya çıkarmadan geçirmenizi sağlar.
 */

interface Yineleyici<T> {
    // Şu anki elemanı döndür
    mevcut(): T;

    // Şu anki elemanı döndür ve bir sonraki elemana geç
    sonraki(): T;

    // Şu anki elemanın anahtarını döndür
    anahtar(): number;

    // Mevcut konumun geçerli olup olmadığını kontrol et
    gecerli(): boolean;

    // Yenileyiciyi ilk öğeye geri sar
    geriSar(): void;
}

interface Koleksiyoncu {
    // Harici bir yineleyiciyi döndür
    alYineleyici(): Yineleyici<string>;
}

/**
 * Bu sınıflar her zaman geçerli geçiş konumunu saklar.
 */

class AlfabetikYineleyici implements Yineleyici<string> {
    private koleksiyon: KelimeKoleksiyonu;

    /**
     * Geçerli geçiş konumunu saklar. Bir yineleyici, özellikle
     * belirli bir koleksiyonla çalışması gerekiyorsa, yineleme
     * durumunu depolamak için birçok başka alana sahip olabilir.
     */
    private pozisyon: number = 0;

    /**
     * Bu değişken geçiş yönünü gösterir
     */
    private tersine: boolean = false;

    constructor(koleksiyon: KelimeKoleksiyonu, tersine: boolean = false) {
        this.koleksiyon = koleksiyon;
        this.tersine = tersine;

        if (tersine) {
            this.pozisyon = koleksiyon.alVeriBoyutu() - 1;
        }
    }

    public geriSar() {
        this.pozisyon = this.tersine ?
            this.koleksiyon.alVeriBoyutu() - 1 :
            0;
    }

    public mevcut(): string {
        return this.koleksiyon.alVeriler()[this.pozisyon];
    }

    public anahtar(): number {
        return this.pozisyon;
    }

    public sonraki(): string {
        const veri = this.koleksiyon.alVeriler()[this.pozisyon];
        this.pozisyon += this.tersine ? -1 : 1;
        return veri;
    }

    public gecerli(): boolean {
        if (this.tersine) {
            return this.pozisyon >= 0;
        }

        return this.pozisyon < this.koleksiyon.alVeriBoyutu();
    }
}

/**
 * Somut Koleksiyonlar, koleksiyon sınıfıyla uyumlu yeni yineleyici
 * örneklerini almak için bir veya birkaç yöntem sağlar.
 */
class KelimeKoleksiyonu implements Koleksiyoncu {
    private veriler: string[] = [];

    public alVeriler(): string[] {
        return this.veriler;
    }

    public alVeriBoyutu(): number {
        return this.veriler.length;
    }

    public ekleVeri(veri: string): void {
        this.veriler.push(veri);
    }

    public alYineleyici(): Yineleyici<string> {
        return new AlfabetikYineleyici(this);
    }

    public alTersineYineleyici(): Yineleyici<string> {
        return new AlfabetikYineleyici(this, true);
    }
}

/**
 * İstemci kodu, programınızda tutmak istediğiniz dolaylılık
 * düzeyine bağlı olarak Somut Yineleyici veya Koleksiyon
 * sınıfları hakkında bilgi sahibi olabilir veya olmayabilir.
 */
const koleksiyon = new KelimeKoleksiyonu();
koleksiyon.ekleVeri('Bir');
koleksiyon.ekleVeri('İki');
koleksiyon.ekleVeri('Üç');

const yineleyici = koleksiyon.alYineleyici();

console.log('\nDüz dolaşım:');
while (yineleyici.gecerli()) {
    console.log(yineleyici.sonraki());
}

console.log('\nTers dolaşım:');
const tersYineleyici = koleksiyon.alTersineYineleyici();
while (tersYineleyici.gecerli()) {
    console.log(tersYineleyici.sonraki());
}