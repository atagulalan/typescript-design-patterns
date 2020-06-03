import SmartHandler from '../SmartHandler'

// <1>
export default class SmartTV extends SmartHandler {
  constructor(name) {
    super(name)
  }
  // <2>
  public handle(request: string): string {
    if (request === 'Open TV') {
      return `Opening ${this.getName()}. Logging into Netflix.`
    }
    return super.handle(request)
  }
}
