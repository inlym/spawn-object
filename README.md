# spawn-object

专用于 TableStore 列操作的工具函数，能够将大对象拆分为仅包含单个属性对象的列表

## 介绍

非常轻量的的一个工具函数，将以下形式的对象：

```js
{
  name: 'mark',
  age: 19,
  isGood: true,
}
```

转化为以下形式：

```js
[
  {
    name: 'mark',
  },

  {
    age: 19,
  },

  {
    isGood: true,
  },
]
```


## 使用说明

除了将大对象拆分为小对象数组外，本工具还提供了以下异常处理：
- 如果属性值为对象（object）和数组（array），那么进行一次 JSON.stringify 转化。
- 如果属性值为整数（integer），那么将其转化为 TableStore 能够识别的整数类型。
- 如果属性值为空或其他 TableStore 不能处理的数据类型，自动过滤。


我们来模拟一个常见需求，用户编辑个人资料，提交后，需要将信息存起来，有些项目必填，有些选填，因此服务端需要判断是否为空（undefined 存入 TableStore 会报错）。

假设需要存入的对象属性如下：

```js
const userInfo = {
  name: 'mark',
  age: 19,
  height: 170.5,
  idGood: true,
  tag: ['one', 'two', 'three'],
  extInfo: {
    nickname: 'good mark',
  },
}
```

如果不使用本工具，那么 `attributeColumns` 属性需要这么写：

```js
attributeColumns: [
  {
    name: userInfo.name,
  },

  {
     age: TableStore.Long.fromNumber(userInfo.age),
  },

  {
     height: userInfo.height,
  },

  {
     idGood: userInfo.idGood,
  },

  {
     tag: JSON.stringify(userInfo.tag),
  },

  {
     extInfo: JSON.stringify(userInfo.extInfo),
  },
    ],
```

以上这种写法还是在不考虑值可能为空的情况下，实际上，TableStore 不允许存入 undefined，你需要过滤掉异常值，正常情况下，使用原生的写法，将会异常麻烦，以下是使用了本工具之后的写法：

首先引入

```js
const spa = require('spawn-object')
```

属性列的写法：

```js
attributeColumns: spa(userInfo)
```

## 使用场景

当前工具库仅用于阿里云（Aliyun）的表格存储（TableStore）的列（column）操作（可同时用于主键列和属性列），提供了一个更便捷的操作方式，在其他场景下可能并不适用。
