## 轮子工厂

"dev-test": "parcel watch test/* --no-cache & karma start"
这个脚本一开始karma会运行两遍，因为开始的时候parcel还没打包完karma就已经开始工作，打完包后又会运行 一次
