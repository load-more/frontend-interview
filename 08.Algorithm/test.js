class Subject {
  constructor() {
    this.state = 0
    this.observers = []
  }
  getState() { // 获取状态
    return this.state
  }
  setState(state) { // 设置状态
    this.state = state
    this.notifyAllObservers()
  }
  attach(observer) { // 将观察者和订阅者绑定
    this.observers.push(observer)
  }
  notifyAllObservers() { // 通知所有的观察者
    this.observers.forEach(observer => {
      observer.update()
    })
  }
}

class Observer {
  constructor(name, subject) {
    this.name = name
    this.subject = subject
    this.subject.attach(this)
  }
  update() {
    console.log(`${this.name} update, state：${this.subject.getState()}`);
  }
}

// 测试
const subject = new Subject()
const o1 = new Observer('o1', subject)
const o2 = new Observer('o2', subject)
const o3 = new Observer('o3', subject)

subject.setState(11)