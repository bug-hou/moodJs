# ModJs 一款针对于 JavaScript 日期格式进行转化

## modJs 的优点

- 代码使用 ts 构建
- 丰富的 api 接口，满足大多数应用场景
- 基于原生编写，没有使用额外的库
- 支持 cjs,msModule,umd,iife

## modJs 使用

1. 安装

   - 通过 CDN 引入:
   - 通过 npm 下载:

2. 使用

## modJs 使用

1. 声明

   - 支持 new 方法创建一个实例(有 4 种构造函数)

   ```js
   // 跟普通创建Date参数一样
   var today = new ModJs();
   var birthday = new ModJs("December 17, 1995 03:24:00");
   var birthday = new ModJs("1995-12-17T03:24:00");
   var birthday = new ModJs(1995, 11, 17, 3, 24, 0);
   var birthday = new ModJs(new Date());
   var birthday = new ModJs(Date.now());
   ```

   **在初始化对象时月份范围是:1~12**

2. 修改

   - set()：支持单独和批量修改，如果要同时修改多个数据，请使用这个方法

   ```javascript
   birthday.set("year", 2021);
   birthday.set({
     year： 2021
   });
   ```

   - year(number)： 设置年份
   - month(number)： 设置月份(范围 1~12)
   - date(number)： 设置日期
   - hours(number)： 设置小时
   - minutes(number)：设置分钟
   - seconds(number)：设置秒钟
   - milliseconds(number)：设置毫秒
   - time(number)：设置时间戳

   ```javascript
   birthday.year(2021).year(2019);
   birthday.month(2021).hours(2019);
   ```

3. 获取

   - get(string|string[]):可以输入一个字符串或者数组获取一个或者多个，如果为一个数组时，返回数组

   ```js
   var birthday = new ModJs(Date.now());
   birthday.get("fullYear");
   birthday.get(["fullYear", "month"]);
   ```

   - year()： 获取年份
   - month()： 获取月份(范围 1~12)
   - date()： 获取日期
   - hours()： 获取小时
   - minutes()：获取分钟
   - seconds()：获取秒钟
   - milliseconds()：获取毫秒
   - time()：获取时间戳
   - week()：获取星期(0~6)

4. 格式化

   - format(string)

   ```js
   var birthday = new ModJs(Date.now());
   birthday.format("YYYY-MM-DD hh-mm-ss W");
   ```

   | 标识 | 描述                      |  实例  |
   | :--: | :------------------------ | :----: |
   |  YY  | 前两位年份                |   22   |
   | YYYY | 完整年份                  |  2022  |
   |  M   | 月，不会填充 0            |   8    |
   |  MM  | 月，会填充 0              |   08   |
   | MMM  | 月，英语缩写              |  Jan   |
   | MMMM | 月，英语全名              | Janary |
   |  D   | 日，不会填充 0            |   2    |
   |  DD  | 日，会填充 0              |   02   |
   |  W   | 星期                      |   1    |
   |  WW  | 星期,英文缩写             |  Mon   |
   | WWW  | 星期,英文全名             | Monday |
   |  H   | 小时,24 小时制,不会填充 0 |   13   |
   |  HH  | 小时,24 小时制,会填充 0   |   13   |
   |  h   | 小时,12 小时制,不会填充 0 |   1    |
   |  hh  | 小时,12 小时制,会填充 0   |   01   |
   |  m   | 分钟,不会填充 0           |   1    |
   |  mm  | 分钟,会填充 0             |   01   |
   |  s   | 秒钟,不会填充 0           |   1    |
   |  ss  | 秒钟,会填充 0             |   01   |
   |  S   | 毫秒,显示 1 位            |   1    |
   |  SS  | 毫秒,显示 2 位            |   01   |
   | SSS  | 毫秒,显示 3 位            |  001   |

5. 插件使用

   - day
     - dayInMonth():这个月有多少天
     - dayInYear():这年有多少天
     - dayToMonth():今天是这个月的第几天
     - dayToYear():今天是这年的第几天
   - week
     - weekInMonth():这个月有多少周
     - weekInYear():这年有多少周
     - weekToMonth():今天是这个月的第几周
     - weekToYear():今天是这年的第几周

   ```js
   var birthday = new ModJs();
   dayInMonth(birthday);
   ```

6. 时间间隔

   - 使用

   ```js
   var birthday = new ModJs();
   var diff = new Diff(birthday);
   ```

   - 方法
     - processConfig:配置选项
       | 标识 | 描述 | 实例 | 属性|
       | :-- | :------------------------ | :----: | :---|
       | maxTimeStamp | 最大的时间 | 超过该时间，显示标准日期格式|number/infinity|
       | customTime | 最大的时间 | 超过该时间，显示标准日期格式|number/infinity|
       | isUseWeek | 最大的时间 | 超过该时间，显示标准日期格式|number/infinity|
       | exact | 是否精确显示 | 显示精确时间|Boolean|
       | exactValue | 精确到什么日期 | 显示精确时间|TimeUntis|
