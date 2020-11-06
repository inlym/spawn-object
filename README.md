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
