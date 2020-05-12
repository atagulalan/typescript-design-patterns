/**
 * Nesne interface'i, aboneleri yönetmek için bir dizi method tanımlar.
 */
interface Nesne {
    durum: number;

    // Nesneye bir gözlemci bağla
    bagla(gozlemci: Gozlemci): void;

    // Nesneyi gözlemciden ayır
    ayir(gozlemci: Gozlemci): void;

    // Bir olay hakkında tüm gözlemcileri bilgilendir
    bilgilendir(): void;
}

/**
 * Nesne bazı önemli durumlara sahiptir ve durum değiştiğinde gözlemcilere haber verir
 */
class SomutNesne implements Nesne {
    /**
     * @type {number} Kolaylık olması açısından, tüm aboneler için gerekli olan konunun
     * durumu bu değişkende saklanır
     */
    public durum: number;

    /**
     * @type {Gozlemci[]} Abonelerin listesi. Gerçek hayatta, abonelerin listesi daha
     * kapsamlı bir şekilde saklanabilir (olay türüne göre vb.)
     */
    private gozlemciListesi: Gozlemci[] = [];

    /**
     * Abonelik yönetimi metodları
     */
    public bagla(gozlemci: Gozlemci): void {
        const isExist = this.gozlemciListesi.includes(gozlemci);
        if (isExist) {
            return console.log('Nesne: Zaten gözlemciye bağlanmıştı.');
        }

        let gozlemciAdi = gozlemci.name
        console.log(`${gozlemciAdi} bağlandı.`);
        this.gozlemciListesi.push(gozlemci);
    }

    public ayir(gozlemci: Gozlemci): void {
        const i = this.gozlemciListesi.indexOf(gozlemci);
        if (i === -1) {
            return console.log('Nesne: Gözlemci bulunamadı.');
        }

        let gozlemciAdi = this.gozlemciListesi[i].name
        this.gozlemciListesi.splice(i, 1);
        console.log(`${gozlemciAdi} ayrıldı.`);
    }

    /**
     * Her aboneyi bilgilendir
     */
    public bilgilendir(): void {
        console.log('Nesne: Gözlemcileri bilgilendiriyorum');
        for (const gozlemci of this.gozlemciListesi) {
            gozlemci.guncelle(this);
        }
    }

    /**
     * Durum değiştir ve aboneyi bilgilendir
     */
    public durumDegistir(): void {
        this.durum = Math.floor(Math.random() * (10 + 1));
        console.log(`\nNesne: Durumum değişti: ${this.durum}`);
        this.bilgilendir();
    }
}

/**
 * Gözlemci arabirimi, nesneler tarafından kullanılan güncelleme yöntemini bildirir.
 */
interface Gozlemci {
    name: string
    // Nesneden güncelemeyi al
    guncelle(nesne: Nesne): void;
}

/**
 * Somut Gözlemciler, bağlı oldukları nesne tarafından yayınlanan güncellemelere tepki
 * gösterir.
 */
class SomutGözlemciA implements Gozlemci {
    name = "Gözlemci A"
    public guncelle(nesne: Nesne): void {
        if (nesne.durum < 3) {
            console.log(`${this.name}: 3'ten küçük`);
        }
    }
}

class SomutGözlemciB implements Gozlemci {
    name = "Gözlemci B"
    public guncelle(nesne: Nesne): void {
        if (nesne.durum === 0 || nesne.durum >= 2) {
            console.log(`${this.name}: 1 değil`);
        }
    }
}

/**
 * İstemci kodu
 */

const nesne = new SomutNesne();

const gozlemci1 = new SomutGözlemciA();
nesne.bagla(gozlemci1);

const gozlemci2 = new SomutGözlemciB();
nesne.bagla(gozlemci2);

nesne.durumDegistir();
nesne.durumDegistir();

nesne.ayir(gozlemci2);

nesne.durumDegistir();