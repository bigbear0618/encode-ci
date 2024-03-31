import { home } from './home'
import { detail } from './detail'

const a = () => console.log(111)

// a()
var name = 'jiusi'
console.log(name)
// home()
// detail()
const count = 2

// 异步导入的形式
// React.lazy、Vue defineAsyncComponent
if (count > 1) {
  import('./home').then((module) => {
    module.home()
  })
}

if (count < 1) {
  import('./detail').then((module) => {
    module.detail()
  })
}
