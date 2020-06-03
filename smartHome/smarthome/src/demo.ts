import { Room, House, SmartTV, SmartLight, SmartFactory } from './classes'

function dashedLog(str) {
  console.log(['-'.repeat(str.length), str, '-'.repeat(str.length)].join('\n'))
}

function createSmartHouse() {
  // <1>
  const smartHouse = new House("Ata's House")

  const livingRoom = new Room('Living Room')
  const kitchen = new Room('Kitchen')
  const bedroom = new Room('Bedroom')

  const smartFactory = new SmartFactory()

  const smartHub = smartFactory.createSmartObject('Hub')
  const smartLight = smartFactory.createSmartObject('SpotLight', SmartLight)
  const smartTV = smartFactory.createSmartObject('Television', SmartTV)
  const smartSoundBar = smartFactory.createSmartObject('Sound Bar')
  const smartFridge = smartFactory.createSmartObject('Fridge')
  const smartLock = smartFactory.createSmartObject('Lock')
  const smartBedsideLamp = smartFactory.createSmartObject('Bedside Lamp')

  livingRoom.add(smartLight, smartTV, smartSoundBar)
  kitchen.add(smartFridge)
  bedroom.add(smartBedsideLamp, smartLock)

  smartHouse.add(livingRoom, kitchen, bedroom, smartHub)

  // <2>
  smartHub
    .setNext(smartLight)
    .setNext(smartTV)
    .setNext(smartSoundBar)
    .setNext(smartFridge)
    .setNext(smartLock)
    .setNext(smartBedsideLamp)

  return { house: smartHouse, hub: smartHub }
}

function listDevices(component) {
  // <3>
  dashedLog('List of the items in a hierarchy')
  console.log(component.identify())
}

function getRandomSmartDevice(component) {
  let searchDevices = ['SmartGeneric', 'SmartTV', 'SmartLight']
  let childrenLength = component.children.length
  let randomNumber = Math.floor(Math.random() * childrenLength)
  let randomComponent = component.children[randomNumber]
  let isDevice = searchDevices.includes(randomComponent.constructor.name)
  return isDevice ? randomComponent : getRandomSmartDevice(randomComponent)
}

// <4>
function getRandom10(component) {
  dashedLog('Getting 10 random items their locations')
  for (let i = 0; i < 10; i++) {
    let smartDevice = getRandomSmartDevice(component)
    whereIs(smartDevice)
  }
}

// <5>
function whereIs(component) {
  console.log(
    `${component.getName()} is located at ${component.parent.getName()}`
  )
}

function initializeMovieMode(hub) {
  dashedLog('Initializing Movie Mode')
  let modeOptions = ['Open TV', 'Dim Lights %30']
  for (const option of modeOptions) {
    console.log(`Human Says: ${option}`)
    const result = hub.handle(option) // <6>
    if (result) {
      console.log(` ${result}`)
    } else {
      console.log(` Couldn't understand command.`)
    }
  }
}

let smartHouse = createSmartHouse()
listDevices(smartHouse.house)
getRandom10(smartHouse.house)
initializeMovieMode(smartHouse.hub)
