export default abstract class Component {
  parent: Component
  name: string
  constructor(name) {
    this.name = name
  }
  // <1>
  setParent(parent: Component) {
    this.parent = parent
  }
  add(...children): void {}
  abstract getName(): string
  abstract identify(): string
}
