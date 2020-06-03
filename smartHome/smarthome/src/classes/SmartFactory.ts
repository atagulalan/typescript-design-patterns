import SmartGeneric from './SmartDevices/SmartGeneric'

export default class SmartFactory {
  // <1>
  createSmartObject(name, type?) {
    if (type) return new type(name)
    return new SmartGeneric(name)
  }
}
