import SmartHandler from '../SmartHandler'

// <1>
export default class SmartLight extends SmartHandler {
  constructor(name) {
    super(name)
  }
  // <2>
  public handle(request: string): string {
    if (request.startsWith('Dim Lights')) {
      return `Dimming ${this.parent.getName()} Lights`
    }
    return super.handle(request)
  }
}
