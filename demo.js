class Product {
  constructor(name) {
    this.name = name
  }

  say() {
    console.log(`I am a ${this.name}`);
  }
}

class Factory {
  create(name) {
    return new Product(name)
  }
}

let factory = new Factory()
let p = factory.create('面包')
p.say()