
## 项目概述

* 产品名称：Lf-cache
* 项目代号：Lf-cache
* 官方地址：

Lf-cache 是一个简洁的通过 localForage 实现前端缓存的 js 扩展包。

## 功能如下

- 定时前端缓存；
- 永久前端缓存；
- 删除指定缓存；
- 删除全部缓存；

## 基础安装

### 1. 扩展包安装

```shell
npm install lf-cache
```

### 2. 扩展包使用

```
import Cache from 'lf-cache'

Cache.get('key')
```

### 3. 功能说明

#### 从缓存中获取数据

get 方法是用来从缓存中获取数据的方法。如果该数据不存在于缓存中，则该方法返回 null。
你也可以向 get 方法传递第二个参数，用来指定如果查找的数据不存在时，你希望返回的默认值：

```
Cache.get('key')
Cache.get('key','default')
```

#### 确认项目是否存在

has 方法可用于确定缓存中是否存在项目。如果值为 null 或 false，则此方法将返回 false：

```
Cache.has('key')
```

#### 获取和存储

有时你可能想从缓存中找出一个数据，而当在请求的数据不存在时，程序能为你存储默认值。例如，你可能会想从缓存中取出所有用户，如果缓存中不存在用户数据时，就从数据库中将这些用户取出并放入缓存中。你可以使用 Cache.remember 方法来做到这一点：

```
Cache.remember('key', 'value' ,minutes)
```

缓存时间为 minutes 默认0分钟，表示永久缓存。
如果缓存中不存在你想找的数据，则传递给 set 方法 value 值放置在缓存中。

你还可以使用 rememberForever 方法从缓存中查找数据或永久存储它：

```
Cache.rememberForever('key', 'value')
```

#### 获取和删除

如果你需要从缓存中获取到数据之后再删除它，你可以使用 pull 方法。和 get 方法一样，如果缓存中不存在该数据， 则返回 null :

```
Cache.pull('key')
```

#### 在缓存中存储数据

你可以使用 Cache 的 put 方法来将数据存储到缓存中。当你在缓存中存放数据时，你需要使用第三个参数来设定缓存的过期时间：
别名： set add

```
Cache.pull('key', 'value', minutes)
```

#### 数据永久存储

forever 方法可以用来将数据永久存入缓存中。因为这些缓存数据不会过期，所以必须通过 forget 方法从缓存中手动删除它们：

```
Cache.forever('key', 'value')
```

#### 删除缓存中的数据

你可以使用 forget 方法从缓存中删除数据：

```
Cache.forget('key')
```

你也可以使用 flush 方法清空所有缓存：

```
Cache.flush()
```
