// <1>
class Singleton {
  private static instance: Singleton
  private sayi: Number

  // <2>
  private constructor(sayi) {
    this.sayi = sayi
  }

  public static getInstance(sayi): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton(sayi)
    }

    return Singleton.instance
  }

  public getSayi() {
    return this.sayi
  }
}

function compareInstances(s1, s2) {
  if (s1 === s2) {
    console.log(
      'Singleton çalışıyor! Her iki değişken de aynı objeyi gösteriyor.'
    )
  } else {
    console.log('Singleton çalışmıyor. Üzücü.')
  }
}

function createSerial() {
  console.log('Seri çalıştırılıyor...')
  const s1 = Singleton.getInstance(1)
  const s2 = Singleton.getInstance(2)
  compareInstances(s1, s2)
}

// <3>
async function createParallel() {
  console.log('Paralel çalıştırılıyor...')
  let s1 = await (async () => Singleton.getInstance(1))()
  let s2 = await (async () => Singleton.getInstance(2))()
  compareInstances(s1, s2)
}

// <4>
Math.random() > 0.5 ? createSerial() : createParallel()
