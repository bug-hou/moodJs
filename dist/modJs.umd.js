!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).moodJs={})}(this,(function(e){"use strict";const t=e=>"string"==typeof e,s=e=>"object"==typeof e&&null!==e,n=(e,t,s)=>String(e).slice(t,s),i=(e,t,s)=>String(e).padStart(t,s),o=e=>String(e),r=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|w{1}|S{1,3}|t{1}/g,a=e=>e%4==0&&(e%100!=0||e%400==0);function u(e,...t){return t.forEach((t=>{e=c(e,t)})),e}function c(e,n){for(const i in n)i in e?t(e[i])?t(n[i])&&(e[i]=n[i]):s(e[i])&&s(n[i])&&c(e[i],n[i]):e[i]=n[i];return e}const h=(e,t,s,n,i,o,r)=>t?new Date(e,t-1,null!=s?s:0,null!=n?n:0,null!=i?i:0,null!=o?o:0,null!=r?r:0):new Date(e),l={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m={name:"zn",minutes:"分钟",seconds:"秒",hours:"小时",date:"天",month:"月",year:"年"};var d={en:l};class f{constructor(e,n,i,o,r,a,u){if(this.language="en",this.parse=Date.parse,void 0===e)this.$Date=new Date;else if(t(e)){const t=this.parse(e);if(!(e=>"number"==typeof e&&!isNaN(e))(t))throw new TypeError("当前格式不能转化为日期格式");this.$Date=h(t)}else if((e=>e instanceof Date)(e))this.$Date=(e=>new Date(e))(e);else if(s(e)){let{year:t,month:s,date:n,hours:i,minutes:o,seconds:r,milliseconds:a}=e;this.$Date=h(null!=t?t:1970,s,n,i,o,r,a)}else this.$Date=h(e,n,i,o,r,a,u);this.$local=d[this.language],this.init()}init(){const{$Date:e}=this;this.$year=e.getFullYear(),this.$month=e.getMonth()+1,this.$date=e.getDate(),this.$week=e.getDay(),this.$hours=e.getHours(),this.$minutes=e.getMinutes(),this.$seconds=e.getSeconds(),this.$milliseconds=e.getMilliseconds(),this.$time=e.getTime()}create(e={}){const[t,s,n,i,o,r,a]=this.get(["fullYear","month","date","hours","minutes","seconds","milliseconds"]);return new f(u(e,{year:t,month:s,date:n,hours:i,minutes:o,seconds:r,milliseconds:a}))}format(e="YYYY-MM-DD HH-mm-ss"){const{$year:t,$month:s,$date:a,$week:u,$hours:c,$minutes:h,$seconds:l,$milliseconds:m,$time:d,$local:f}=this,y={YY:n(t,-2),YYY:n(t,-3),YYYY:o(t),M:o(s+1),MM:i(s,2,"0"),MMM:n(f.months[s-1],0,3),MMMM:f.months[s-1],D:o(a),DD:i(a,2,"0"),w:o(u),H:o(c),HH:i(c,2,"0"),h:i(c%12||12,1,"0"),hh:i(c%12||12,2,"0"),m:o(h),mm:i(h,2,"0"),s:o(l),ss:i(l,2,"0"),S:o(m),SSS:i(m,3,"0"),t:o(d)};return e.replace(r,((e,t)=>t||y[e]))}set(e,s){t(e)&&(e={[e]:s});for(const t in e)this.processDate(t,e[t],!1);return this.init(),this}get(e){if(t(e))return this[e]();const s=[];return e.forEach((e=>{"fullYear"===e?s.push(this.$year):s.push(this["$"+e])})),s}year(e){return this.processDate("fullYear",e)}month(e){return this.processDate("month",e)}date(e){return this.processDate("date",e)}hours(e){return this.processDate("hours",e)}minutes(e){return this.processDate("minutes",e)}seconds(e){return this.processDate("seconds",e)}milliseconds(e){return this.processDate("milliseconds",e)}time(e){return this.processDate("time",e)}isBefore(e){return!!(this.time()>e.time())}isAfter(e){return!!(this.time()<e.time())}week(){return this.$week}processDate(e,t,s=!0){let n=(i=e).slice(0,1).toUpperCase()+i.slice(1);var i;return t?("month"===e&&(t-=1),this.$Date["set"+n](t),s&&this.init(),this):"fullYear"===e?this.$year:this["$"+e]}static use(e,t){e.call(f,t)}}const y=["seconds","minutes","hours","date","month","year"];class p{constructor(e){this.maxTime=2592e6,this.config={},this.time=e.time()}format(e,t="前"){e instanceof f||(e=new f(e));const s=["seconds","minutes","hours","date","month","year"].reverse();let n=Math.abs(this.time-e.time());if(this.maxTime<n)return e.format("YYYY-MM-DD hh-mm-ss");const i=this.calculator(n);if(this.config.exact){let e="";for(const t of s)i[t]&&(e+=i[t]+m[t]);return e+t}return i.endValue+m[i.endName]+t}calculator(e){var t;const s={endValue:0,endName:"milliseconds"},n=y,i=[1e3,60,60,24,30,12];if(this.config.exact){const o=n.indexOf(null!==(t=this.config.exactValue)&&void 0!==t?t:"minutes");i.forEach(((t,r)=>{var a;const u=Math.floor(e/t)%(null!==(a=i[r+1])&&void 0!==a?a:Number.MAX_SAFE_INTEGER);u>0&&r>=o&&(s[n[r]]=u),e/=t}))}else i.forEach(((t,o)=>{var r;const a=Math.floor(e/t)%(null!==(r=i[o+1])&&void 0!==r?r:Number.MAX_SAFE_INTEGER);a>0&&(s[n[o]]=a,s.endValue=a,s.endName=n[o]),e/=t}));return s}processConfig(e){this.config=e,e.maxTimeStamp?this.maxTime=t(e.maxTimeStamp)?Number.MAX_SAFE_INTEGER:e.maxTimeStamp:e.customTime&&(this.maxTime=new f(e.customTime).time())}}const g=[31,28,31,30,31,30,31,31,30,31,30,31];function M(e){const[t,s]=e.get(["fullYear","month"]);return a(t)&&2===s?29:g[s-1]}function D(e){const[t]=e.get(["fullYear"]);return a(t)?366:365}function Y(e){return e.date()}function $(e){let t=0;const[s,n]=e.get(["month","date"]);for(let e=1;e<s;e++)t+=g[e-1];return t+n}const w=(e,t,s=!1)=>s?Math.ceil((e-t)/7):0===t?Math.ceil(e/7):Math.ceil((e-(8-t))/7);function _(e,t,s,n,i,o,r){return e?new f(e):t?new f(e,t,s,n,i,r):new f}_.prototype.use=f.use,e.Diff=p,e.ModJs=f,e.dayInMonth=M,e.dayInYear=D,e.dayToMonth=Y,e.dayToYear=$,e.days=function(e,t){const s=e.prototype;s.dayInMonth=M,s.dayInYear=D,s.dayToMonth=Y,s.dayToYear=$},e.diff=function(e){return new p(e)},e.modJs=_,e.weekInMonth=function(e){const[t,s]=e.get(["month","fullYear"]),n=e.create({year:s,month:t,date:1}).get("week"),i=M(e);return w(i,n)},e.weekInYear=function(e){const[t]=e.get(["fullYear"]),[s]=e.create({year:t,month:1,date:1}).get(["week"]),n=D(e);return w(n,s)},e.weekToMonth=function(e){const[t,s]=e.get(["date","week"]);return w(t,s,!0)},e.weekToYear=function(e){const[t]=e.get(["week"]),s=$(e);return w(s,t,!0)},Object.defineProperty(e,"__esModule",{value:!0})}));
