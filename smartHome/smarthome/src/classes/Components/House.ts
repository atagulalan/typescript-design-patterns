import Area from './Area'

export default class House extends Area {
  getChildren(): Array<string> {
    return this.children.map((room) => room.identify())
  }
  identify(): string {
    const rooms = this.getChildren()
    const mapped = rooms.map((e) => '\n- ' + e)
    return this.getName() + mapped.join('')
  }
}
