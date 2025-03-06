import { storageService } from './async-storage.service.js'
import { saveToStorage, loadFromStorage } from './util.service.js'

const TOY_KEY = 'toyDB'
_createToys()

export const toyService = {
  query,
  get,
  remove,
  save,
  getDefaultFilter,
}

// For Debug (easy access from console):
window.ts = toyService


function query(filterBy = {}) {
  return storageService.query(TOY_KEY)
    .then(toys => {
      if (filterBy.name) {
        const regExp = new RegExp(filterBy.name, 'i')
        toys = toys.filter(toy => regExp.test(toy.name))
      }
      if (filterBy.minPrice) {
        toys = toys.filter(toy => toy.price >= filterBy.minPrice)
      }
      if (filterBy.maxPrice) {
        toys = toys.filter(toy => toy.price <= filterBy.maxPrice)
      }
      return toys
    })
}

function get(toyId) {
  return storageService.get(TOY_KEY, toyId)
    .then(toy => {
      toy = _setNextPrevToyId(toy)
      return toy
    })
}

function remove(toyId) {
  return storageService.remove(TOY_KEY, toyId)
}

function save(toy) {
  if (toy.id) {
    return storageService.put(TOY_KEY, toy)
  } else {
    return storageService.post(TOY_KEY, toy)
  }
}

function getDefaultFilter() {
  return { name: '', maxPrice: '' }
}

function _createToys() {
  let toys = loadFromStorage(TOY_KEY)
  if (!toys || !toys.length) {
    toys = [
      {
        "_id": 1,
        "name": "ZoomRacer 3000",
        "price": 199,
        "labels": ["toy", "fast", "remote control", "battery-powered"],
        "inStock": true,
        "imgUrl":  "https://picsum.photos/200/300",
        "createdAt": 0
      },
      {
        "_id": 2,
        "name": "Fluffo the Cuddly Bear",
        "price": 49,
        "labels": ["plush", "soft", "cuddly", "stuffed animal"],
        "inStock": false,
        "imgUrl":  "https://picsum.photos/200/300",
        "createdAt": 0
      },
      {
        "_id": 3,
        "name": "RoboZap",
        "price": 350,
        "labels": ["robot", "interactive", "lights", "sound effects", "AI"],
        "inStock": true,
        "imgUrl":  "https://picsum.photos/200/300",
        "createdAt": 0
      },
      {
        "_id": 4,
        "name": "GiggleBlocks",
        "price": 89,
        "labels": ["building", "colorful", "educational", "stacking"],
        "inStock": true,
        "imgUrl":  "https://picsum.photos/200/300",
        "createdAt": 0
      },
      {
        "_id": 5,
        "name": "SkyGlider Drone",
        "price": 599,
        "labels": ["drone", "aerial", "camera", "remote control", "flying"],
        "inStock": false,
        "imgUrl":  "https://picsum.photos/200/300",
        "createdAt": 0
      },
      {
        "_id": 6,
        "name": "MagicDoodle Pad",
        "price": 35,
        "labels": ["drawing", "kids", "educational", "creative", "fun"],
        "inStock": true,
        "imgUrl":  "https://picsum.photos/200/300",
        "createdAt": 0
      },
      {
        "_id": 7,
        "name": "BattleBots Arena",
        "price": 275,
        "labels": ["robots", "battle", "remote control", "strategy"],
        "inStock": true,
        "imgUrl":  "https://picsum.photos/200/300",
        "createdAt": 0
      },
      {
        "_id": 8,
        "name": "Superhero Action Set",
        "price": 120,
        "labels": ["action figure", "heroes", "collectible", "poseable"],
        "inStock": false,
        "imgUrl":  "https://picsum.photos/200/300",
        "createdAt": 0
      },
      {
        "_id": 9,
        "name": "Fantasy Castle Playset",
        "price": 450,
        "labels": ["castle", "figures", "fantasy", "roleplay"],
        "inStock": true,
        "imgUrl":  "https://picsum.photos/200/300",
        "createdAt": 0
      },
      {
        "_id": 10,
        "name": "SpeedBoat Racer",
        "price": 375,
        "labels": ["boat", "waterproof", "remote control", "fast", "racing"],
        "inStock": false,
        "imgUrl":  "https://picsum.photos/200/300",
        "createdAt": 0
      }
    ]

    saveToStorage(TOY_KEY, toys)
  }
}

function _setNextPrevToyId(toy) {
  return storageService.query(TOY_KEY)
    .then((toys) => {
      const toyIdx = toys.findIndex((currToy) => currToy.id === toy.id)
      const nextToy = toys[toyIdx + 1] ? toys[toyIdx + 1] : toys[0]
      const prevToy = toys[toyIdx - 1] ? toys[toyIdx - 1] : toys[toys.length - 1]
      toy.nextToyId = nextToy.id
      toy.prevToyId = prevToy.id
      return toy
    })
}

