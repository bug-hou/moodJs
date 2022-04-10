# ModJs 一款针对于 JavaScript 日期格式进行转化

## modJs 的优点

- 代码使用 ts 构建
- 丰富的 api 接口，满足大多数应用场景
- 基于原生编写，没有使用额外的库
- 大小只有..kb
- 支持 cjs,msModule,umd,iife

## modJs 使用

1. 安装

   - 通过 CDN 引入:
   - 通过 npm 下载:

2. 使用

## modJs 使用

1. 声明

   - 支持 new 方法创建一个实例(有 4 种构造函数)

   ```javascript
   // 跟普通创建Date参数一样
   var today = new ModJs();
   var birthday = new ModJs("December 17, 1995 03:24:00");
   var birthday = new ModJs("1995-12-17T03:24:00");
   var birthday = new ModJs(1995, 11, 17, 3, 24, 0);
   var birthday = new ModJs(new Date());
   var birthday = new ModJs(Date.now());
   ```

   **在初始化对象时月份范围是:0~11，其他设置地方都是 1~12**

2. 修改

   - set()：支持单独和批量修改，如果要同时修改多个数据，请使用这个方法

   ```javascript
   birthday.set("year", 2021);
   birthday.set({
     year： 2021
   });
   ```

   - year()： 设置年份
   - month()： 设置月份(范围 1~12)
   - date()： 设置日期
   - hours()： 设置小时
   - minutes()
   - seconds()
   - milliseconds()
   - time()

   ```javascript
   birthday.year(2021).year(2019);
   ```
