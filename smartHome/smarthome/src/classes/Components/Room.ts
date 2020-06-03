import Area from './Area'

export default class Room extends Area {
  getChildren(): Array<string> {
    return this.children.map((device) => device.identify())
  }
  identify(): string {
    const devices = this.getChildren()
    const mapped = devices.map((e) => '\n  - ' + e)
    return this.getName() + mapped.join('')
  }
}
