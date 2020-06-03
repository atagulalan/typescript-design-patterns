import SmartHandler from '../SmartHandler'

// <1>
export default class SmartGeneric extends SmartHandler {
  constructor(name) {
    super(name)
  }
  // <2>
  public handle(request: string): string {
    if (request === 'Open ' + this.name) {
      return `Opening generic: ${request}.`
    }
    return super.handle(request)
  }
}
