# 基于bootstraps框架快速实现开源博客基本样式

## 一、 项目开始之前需要注意的点
- 为了让Bootstrap开发的网站对懂设备友好，确保适当的绘制和触屏缩放，需要在网页的head之中添加viewport meta标签
```
<meta name ="viewport" content="width=device-width ,initial-scale=1.0">
```


## 发现
 ```
 article, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section, summary {
    display: block;
 ```

## 疑惑
 - 1. index.css36行代码，lineheight=4em=56px是根据什么计算得