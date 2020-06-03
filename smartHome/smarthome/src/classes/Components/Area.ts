import Component from '../Component'

export default abstract class Area extends Component {
  children: Array<Component> = []
  // <1>
  add(...children) {
    children.forEach((child) => {
      this.children.push(child)
      child.setParent(this)
    })
  }
  abstract getChildren(): Array<string>
  getName(): string {
    return `\x1b[36m${this.name}\x1b[0m` // <2>
  }
}
