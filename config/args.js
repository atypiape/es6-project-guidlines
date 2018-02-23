import yargs from 'yargs';

const args = yargs

   // 是否为生产环境
   .option('production', {
       boolean:true,  // 该参数为布尔型
       default:false, // 默认为非生产环境
       describe:'production'
   })

   // 是否自动监视代码变动
   .option('watch', {
       boolean:true,
       default:true,
       describe:'watch all files',
   })

   // 服务器端口号
   .option('port', {
       string:true,
       default:80,
       describe:'server port'
   })

   .argv // 对参数进行解析
;

export default args;