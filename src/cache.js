import localForage from 'localforage'

//从缓存中获取数据
export const get = (key, defaults = false) => {
  return new Promise((resolve, reject) => {
      localForage.getItem(key).then((value) => {
        let data = defaults
        if (value) {
          if (value.minutes > new Date().getTime() || value.minutes == 0) {
            data = value.data
          }
        }
        resolve(data)
      }).catch((err) => {
          reject(err)
      })
  })
}

// 获取和删除
export const pull = (key) => {
  let value = get(key)
  remove(key)
  return value
}

// 设置缓存
export const set = (key, value, minutes = 0) => {
  return new Promise((resolve, reject) => {
      localForage.setItem(key, {
        data: value,
        minutes: expiryTime(minutes)
      }).then((value) => {
          resolve(value.data)
      }).catch((err) => {
          reject(err)
      })
  })
}
// set 别名
export const put = (key, value, minutes = 0) => {
  return set(key, value, minutes)
}
// set 别名
export const add = (key, value, minutes = 0) => {
  return set(key, value, minutes)
}
// set 数据永久存储
export const forever = (key, value) => {
  return set(key, value, 0)
}

//确认项目是否存在
export const has = (key) => {
  return new Promise((resolve, reject) => {
      get(key).then((value) => {
          let has = value? true: false
          resolve(has)
      }).catch((err) => {
          reject(err)
      })
  })
}

//请求的数据不存在时，程序能为你存储默认值
export const remember = async (key, value, minutes = 0) => {
  if (await has(key)) {
    return get(key)
  }else{
    return set(key, value, minutes)
  }
}
// 永久存储
export const rememberForever = async (key, value) => {
  if (await has(key)) {
    return get(key)
  }else{
    return set(key, value, 0)
  }
}
// 移除缓存
export const remove = (key) => {
  return new Promise((resolve, reject) => {
      localForage.removeItem(key).then(() => {
          resolve()
      }).catch((err) => {
          reject(err)
      })
  })
}
// remove别名
export const deleter = (key) => {
  return remove(key)
}
// remove别名
export const forget = (key) => {
  return remove(key)
}
// 清空缓存
export const flush = async() => {
  let index = await keys()
  index.forEach((value) => {
    return remove(value)
  });
}

export const keys = () => {
  return new Promise((resolve, reject) =>{
      localForage.keys().then((keys) => {
          resolve(keys)
      }).catch((err) => {
          reject(err)
      })
  })
}
export const key = () => {
  return new Promise((resolve, reject) => {
      localForage.key(keyIndex).then((keyName) => {
          resolve(keyName)
      }).catch((err) => {
          reject(err)
      })
  })
}


// 过期时间
const expiryTime = (minutes) => {
  if (minutes) {
    return new Date().getTime() + minutes*60*1000
  }else{
    return minutes
  }

}
