class Asi {
  private name: string
  private procedure: string
  private isVaccinated: boolean
  constructor(name: string, procedure: string) {
    this.name = name
    this.procedure = procedure
  }

  getInfo() {
    console.log(
      `\nAşı durumu: ${this.isVaccinated ? 'Olunmuş' : 'Olunmamış'}`,
      `\nAşı adı: ${this.name}`,
      `\nAşı yöntemi: ${this.procedure}`
    )
  }

  vaccinate() {
    this.isVaccinated = true
  }
}

class Maske {
  private name: string
  private percentage: number
  private isWeared: boolean
  constructor(name: string, percentage: number) {
    this.name = name
    this.percentage = percentage
  }

  getInfo() {
    console.log(
      `\nMaske kullanımı: ${this.isWeared ? 'Kullanılmış' : 'Kullanılmamış'}`,
      `\nMaske adı: ${this.name}`,
      `\nMaske filtreleme yüzdesi: ${this.percentage}%`
    )
  }

  wear() {
    this.isWeared = true
  }
}

// <1>
class CovidFactory {
  produceProduct(type: Object)
  produceProduct(type: 'asi'): Asi
  produceProduct(type: 'maske'): Maske

  public produceProduct(urun): Asi | Maske {
    // <2>
    if (urun.type === 'asi') {
      const asi = new Asi(urun.name, urun.procedure)
      return asi
      // <3>
    } else if (urun.type === 'maske') {
      const maske = new Maske(urun.name, urun.percentage)
      return maske
    } else {
      // <4>
      throw new Error('Aşı veya Maske seçin!')
    }
  }
}

const covidFactory = new CovidFactory()
const fcd11 = covidFactory.produceProduct({
  name: 'FCD-11',
  type: 'asi',
  procedure: 'Koldan',
})
const n95 = covidFactory.produceProduct({
  name: 'N95',
  type: 'maske',
  percentage: 99.97,
})

fcd11.vaccinate()
n95.wear()

fcd11.getInfo()
n95.getInfo()
