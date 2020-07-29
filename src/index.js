let cache = [] //缓存初始化

function deepClone(source) {
  //先判断是否是Object类型
  if (source instanceof Object) {
    //判断source是否在缓存里
    let cacheDist = findCache(source)
    if (cacheDist) {
      return cacheDist
    } else {
      let dist
      if (source instanceof Array) {
        dist = new Array()
      } else if (source instanceof Function) {
        dist = function () {
          return source.apply(this, arguments)
        }
      } else if (source instanceof Date) {
        dist = new Date(source)
      } else if (source instanceof RegExp) {
        dist = new RegExp(source.source, source.flags)
      } else {
        dist = new Object()
      }
      cache.push([source, dist])
      //遍历每个属性克隆
      for (let key in source) {
        if (source.hasOwnProperty(key)) {
          dist[key] = deepClone(source[key])
        }
      }
      return dist
    }
  }
  return source
}

//查找缓存
function findCache(source) {
  for (let i = 0; i < cache.length; i++) {
    if (cache[i][0] === source) {
      return cache[i][1]
    }
  }
  return undefined
}

module.exports = deepClone