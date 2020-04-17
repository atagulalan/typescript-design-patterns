class ServerBuilder {
  private name: string
  private ipAddress: string
  private port: number
  private requests: Array<Object>

  constructor(name: string) {
    this.name = name
    this.requests = []
  }

  get Name() {
    return this.name
  }

  setIpAddress(value: string): ServerBuilder {
    this.ipAddress = value
    return this
  }

  get IpAddress() {
    return this.ipAddress
  }

  setPort(value: number): ServerBuilder {
    this.port = value
    return this
  }

  get Port() {
    return this.port
  }

  post(uri: string, value: Function): ServerBuilder {
    this.requests.push({ type: 'post', uri, function: value })
    return this
  }

  get(uri: string, value: Function): ServerBuilder {
    this.requests.push({ type: 'get', uri, function: value })
    return this
  }

  get Requests() {
    return this.requests
  }

  build(afterCreation: Function): Server {
    let server = new Server(this)
    afterCreation(this.port)
    return server
  }
}

class Server {
  private name: string
  private ipAddress: string
  private port: number
  private requests: Array<Object>

  constructor(builder: ServerBuilder) {
    this.name = builder.Name
    this.ipAddress = builder.IpAddress
    this.port = builder.Port
    this.requests = builder.Requests
  }

  get Name() {
    return this.name
  }
  get IpAddress() {
    return this.ipAddress
  }
  get Port() {
    return this.port
  }
  get Requests() {
    return this.requests
  }
}

let App = new ServerBuilder("Xava's Server")
  .setIpAddress('127.0.0.1')
  .setPort(80)

App.get('/', (req, res) => {
  res.send('Hi universe!')
})

App.post('/login', (req, res) => {
  console.log('Login Credentials:', req.body)
  res.send('Logging in...')
})

App.post('/logout', (req, res) => {
  console.log('Logout Token:', req.body.token)
  res.send('Logging out...')
})

App.build((port) => {
  console.log('\x1b[36m%s\x1b[0m', `Listening on port ${port}`, '\n')
})

console.log(App)
