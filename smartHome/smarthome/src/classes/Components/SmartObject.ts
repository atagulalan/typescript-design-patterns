import Component from '../Component'

export default abstract class SmartObject extends Component {
  constructor(name) {
    super(name)
  }
  identify(): string {
    return this.getName()
  }
  getName(): string {
    return `\x1b[35m${this.name}\x1b[0m` // <1>
  }
}
