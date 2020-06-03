import SmartObject from './Components/SmartObject'

interface IHandler {
  setNext(handler: IHandler): IHandler
  handle(request: string): string
}

export default abstract class SmartHandler extends SmartObject
  implements IHandler {
  private nextHandler: IHandler

  // <1>
  public setNext(handler: IHandler): IHandler {
    this.nextHandler = handler
    return handler
  }

  public handle(request: string): string {
    // <2>
    if (this.nextHandler) {
      return this.nextHandler.handle(request)
    }

    return null
  }
}
