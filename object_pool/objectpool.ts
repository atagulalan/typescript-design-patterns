class PoolManager {
  private static instance: PoolManager
  private pools: Array<Product>
  private boyut: number

  private constructor() {
    this.boyut = 0
    this.pools = []
  }

  public static getInstance(): PoolManager {
    if (!PoolManager.instance) {
      PoolManager.instance = new PoolManager()
    }

    return PoolManager.instance
  }

  public takeObject(): Product {
    if (this.boyut > 0) {
      this.boyut = this.boyut - 1
      return this.pools.pop()
    } else {
      console.error(
        '\x1b[31m%s\x1b[0m',
        'Şu an tüm eşyalar alındı, lütfen bekleyin.'
      )
    }
  }

  public releaseObject(obj: Product) {
    this.boyut = this.boyut + 1
    this.pools.push(obj)
  }
}

class Product {
  private name: string
  constructor(name: string) {
    this.name = name
  }
  getName() {
    return this.name
  }
}

class Client {
  private name: string
  private owns: Product
  constructor(name: string) {
    this.name = name
  }
  getName() {
    return this.name
  }
  ownProduct() {
    this.owns = poolManager.takeObject()
    if (this.owns) {
      console.log(
        '\x1b[33m%s\x1b[0m',
        `${this.name}, artık ${this.owns.getName()} nesnesine sahip.`
      )
      setTimeout(
        () => {
          console.log(
            '\x1b[36m%s\x1b[0m',
            `${
              this.name
            }, sahip olduğu ${this.owns.getName()} nesnesini bırakıyor.`
          )
          poolManager.releaseObject(this.owns)
        },
        Math.random() * 2000 + 4000,
        this
      )
    } else {
      setTimeout(
        () => {
          this.ownProduct()
        },
        5000,
        this
      )
    }
  }
}

let poolManager = PoolManager.getInstance()
poolManager.releaseObject(new Product('Armut'))
poolManager.releaseObject(new Product('Elma'))
poolManager.releaseObject(new Product('Ayva'))

async function createUsers(clientNames) {
  const clientArray = clientNames.map(async (clientName) => {
    let client = new Client(clientName)
    client.ownProduct()
    return client
  })
  const clients = await Promise.all(clientArray)
  return clients
}

createUsers(['Ahmet', 'Arda', 'Nagihan', 'Mustafa', 'Ömer', 'Alp'])
