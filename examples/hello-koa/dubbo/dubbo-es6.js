const {Dubbo, setting} = require('dubbo2.js');
const service = require('./service');

const dubboSetting = setting
  .match(
    [
      'com.alibaba.dubbo.demo.DemoProvider',
      'com.alibaba.dubbo.demo.ErrorProvider',
    ],
    {
      version: '1.0.0',
    },
  )
  .match('com.alibaba.dubbo.demo.BasicTypeProvider', {version: '2.0.0'});

const dubbo = (module.exports = new Dubbo({
  application: {name: 'dubbo-node-consumer1'},
  register: 'localhost:2181',
  service,
  dubboSetting,
}));

//middleware
// dubbo.use(async function costTime(ctx, next) {
//   console.log('before dubbo cost middleware');
//   const startTime = Date.now();
//   await next();
//   const endTime = Date.now();
//   console.log('end makecostTime->', endTime - startTime);
// });
