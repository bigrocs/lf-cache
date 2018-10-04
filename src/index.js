import localForage from 'localforage'

const expiryTime = (minutes) => {
  if (minutes) {
    return new Date().getTime() + minutes*60*1000
  }else{
    return minutes
  }
}

const Cache = {
  get: (key, defaults = false) => {
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
  },
  pull: (key) => {
    let value = Cache.get(key)
    Cache.remove(key)
    return value
  },
  set: async (key, value, minutes = 0) => {
    if (typeof value === 'function') {
        value = await value()
    }
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
  },
  put: (key, value, minutes = 0) => {
    return Cache.set(key, value, minutes)
  },
  add: (key, value, minutes = 0) => {
    return Cache.set(key, value, minutes)
  },
  forever: (key, value) => {
    return Cache.set(key, value, 0)
  },
  has: (key) => {
    return new Promise((resolve, reject) => {
        Cache.get(key).then((value) => {
            let has = value? true: false
            resolve(has)
        }).catch((err) => {
            reject(err)
        })
    })
  },
  remember: async (key, value, minutes = 0) => {
    if (await Cache.has(key)) {
      return Cache.get(key)
    }else{
      return Cache.set(key, value, minutes)
    }
  },
  remove: (key) => {
    return new Promise((resolve, reject) => {
        localForage.removeItem(key).then(() => {
            resolve()
        }).catch((err) => {
            reject(err)
        })
    })
  },
  deleter: (key) => {
    return Cache.remove(key)
  },
  forget: (key) => {
    return Cache.remove(key)
  },
  flush: async () => {
    let index = await Cache.keys()
    index.forEach((value) => {
      return Cache.remove(value)
    });
  },
  keys: () => {
    return new Promise((resolve, reject) =>{
        localForage.keys().then((keys) => {
            resolve(keys)
        }).catch((err) => {
            reject(err)
        })
    })
  },
  key: () => {
    return new Promise((resolve, reject) => {
        localForage.key(keyIndex).then((keyName) => {
            resolve(keyName)
        }).catch((err) => {
            reject(err)
        })
    })
  }
}
export default Cache
