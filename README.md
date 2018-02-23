# 项目规范

- [文档](#documents)
- [依赖](#dependencies)
- [目录结构](#directory-structure)
- [初始化项目](#initialize)

<a name="documents"></a>
## 文档

- 可以使用这个 [模板](./README.sample.md) 作为 README.md （的一个参考）, 随时欢迎添加里面没有的内容。
- 对于具有多个存储库的项目，请在各自的 README.md 文件中提供它们的链接。
- 随项目的进展，持续地更新 README.md 。
- 给您的代码添加详细的注释，这样就可以清楚每个主要部分的含义。
- 如果您正在使用的某些代码和方法，在github或stackoverflow上已经有公开讨论，请在您的注释中包含这些链接，
- 不要把注释作为坏代码的借口。保持您的代码干净整洁。
- 也不要把那些清晰的代码作为不写注释的借口。
- 当代码更新，也请确保注释的同步更新。

<a name="dependencies"></a>
## 依赖



<a name="directory-structure"></a>
## 目录结构

### 根目录
    .
    ├──browser/
    ├──client/
    ├──config/
    ├──dist/
    ├──docs/
    ├──node_modules/ (自动生成)
    ├──server/
    ├──tasks/
    ├──.babelrc
    ├──.eslintignore
    ├──.eslintrc.js  (自动生成)
    ├──.gitignore
    ├──.gulpfile.babel.json
    ├──.nvmrc
    ├──package.json  (自动生成)
    ├──package-lock.json
    ├──README.md
    └──yarn.lock     (自动生成)
    
### ./browser 目录

将前端工程放在 ./browser 目录中，包括脚本、样式和页面模版等。

    ./browser/
      ├──images
      ├──javascripts
      ├──stylesheets
      └──pages
      
### ./client 目录

将 PC 客户端工程放在 ./client 目录下，可采用 Electron 构建跨平台客户端。
      
### ./config 目录

当为不同的目的分解不同的配置文件，须将它们放在 ./config 目录中，配置文件中使用的值应通过环境变量提供。不要为不同的环境制作不同的配置文件。
      
### ./dist 目录

将构建输出结果放在 ./dist 目录中。将其添加到 .gitignore 文件中以便忽略此目录。

### ./docs 目录

将项目文档相关文件存放在 ./docs 目录中。

### ./node_modules 目录

当添加 Node.js 依赖包时，会自动生成 ./node_modules 目录，将其添加到 .gitignore 文件中以便忽略此目录。

### ./server 目录
将服务端工程放在 ./server 目录中：

    ./server/
      ├──public/
      ├──routes/
      ├──services/
      └──views/
      
- 将编译好的前端程序放在 public 目录中。
- 负责路由的脚本放在 routes 目录中。
- views 目录存放页面模版。
- 独立的功能服务程序存放在 services 目录中，如一个 Node.js 编写程序。

### ./tasks 目录

将 gulp 自动化构建的脚本存放在 ./tasks 目录中。 

<a name="initialize"></a>
## 初始化项目

### 使用 yarn 代替 npm 管理包

macOS 下安装：

```
brew update
brew install yarn
```

具体如何使用，可查看 yarn 官网：<https://yarnpkg.com/zh-Hans/>

### 初始化

- 按照目录结构创建各文件夹；
- 在根目录执行命令，对项目进行初始化，自动生成 package.json 配置文件。

```
yarn init
```

### 忽略目录

```
echo "dist/" >> .gitignore
echo "node_modules/" >> .gitignore
```

### 支持 ES6/ES7

安装 babel ES6 支持包：

```
yarn add --dev babel-core babel-preset-env babel-register
yarn add babel-preset-es2015
```

安装 React 的 ES6 支持：

```
yarn add --dev babel-preset-react
```

安装 ES7 补丁包：

```
yarn add babel-polyfill
```

创建 babel 编译配置文件：

```
touch .babelrc
```

内容如下：

```
{
  "presets": ["es2015", "react"]
}
```

安装插件 es2015-modules-commonjs 以支持 ES6 的 import / export

```
yarn add --dev babel-plugin-transform-es2015-modules-commonjs
```

配置 .babelrc

```

// without options
{
  "plugins": ["transform-es2015-modules-commonjs"]
}

// with options
{
  "plugins": [
    ["transform-es2015-modules-commonjs", {
      "allowTopLevelThis": true
    }]
  ]
}
```

### 强制代码风格检查

为了确保代码编写风格一致，需安装 ESLint：

```
yarn add --dev eslint
./node_modules/.bin/eslint --init
```
在给出的提示中，切换方向键，并按回车键进行选择，依照下文进行选择：

> ? How would you like to configure ESLint? Use a popular style guide
> 
> ? Which style guide do you want to follow? Airbnb
> 
> ? Do you use React? Yes
> 
> ? What format do you want your config file to be in? JavaScript

之后开始安装依赖包，并自动生成配置文件 eslintrc.js，无需手动创建。

还需要添加自定义检查规则：

```
"rules": {
    "no-console": "off"
}
```

接着创建文件 .eslintignore，将要忽略检查的目录添加进去：

```
echo "docs/" >> .eslintignore
echo "dist/" >> .eslintignore
echo "temp/" >> .eslintignore
echo "node_modules/" >> .eslintignore
echo "server/app.js" >> .eslintignore
echo "server/node_modules/" >> .eslintignore
echo "server/public/" >> .eslintignore
```

### 项目配置

在 ./config 目录下创建 args.js 文件，导入 yargs 包，实现命令行处理能力。

```
touch ./config/args.js
yarn add yargs
```

使用 option 方法引入一些参数。

```
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
```

## 前端框架

安装前端框架 React：

```
yarn add react react-dom
```

## 服务端框架

安装服务端框架 express：

```
cd server
yarn init
yarn add --dev express express-generator
./node_modules/.bin/express -e .
```

> -e 参数表示要使用 ejs 模版

要让浏览器接受热更新，需在 server/app.js 中引入 `connect-livereload`，

在

 `app.use(express.static(path.join(__dirname, 'public')));`

 后面添加一句 

`app.use(require('connect-livereload')());`

像这样：

```

app.use(express.static(path.join(__dirname, 'public')));

app.use(require('connect-livereload')());

```

## 自动构建

创建 ./gulpfile.babel.js 文件，用于配置 gulp（文件名带 "babel" 表示支持 ES6）：

```
touch gulpfile.babel.js
```

内容如下：

```
import requireDir from 'require-dir';

// 加载 tasks 目录下的所有脚本
requireDir('tasks');
``` 

添加 require-dir 包：

```
yarn add require-dir
```
    
在 ./task 目录中，创建任务脚本：

    ./tasks/
      ├──build-browser.js  (构建前端代码)
      ├──build-server.js   (构建服务端代码)
      ├──deploy-browser.js (打包部署前端代码)
      ├──deploy-server.js  (打包部署服务端代码)
      ├──watch-browser.js  (监听前端变化)
      └──watch-server.js   (监听服务端变化)

添加自动化构建所需要的包：

```
yarn add gulp gulp-concat gulp-if gulp-plumber gulp-rename gulp-sequence vinyl-named del
```

添加编译压缩 ES6 和 React 脚本所需包：

```
yarn add gulp-babel gulp-react gulp-uglify gulp-webpack
```

添加编译压缩 CSS 所需的包：

```
yarn add cssnext gulp-clean-css  gulp-postcss precss
```

添加压缩 HTML 页面文件所需包：

```
yarn add gulp-htmlmin 
```

添加热更新所需包：

```
yarn add connect-livereload gulp-livereload gulp-live-server
```

接着在 ./tasks 目录下创建自动化任务脚本，如同项目模版 ./tasks 目录那样。

最后执行命令 `gulp --watch` 将自动化脚本跑起来，并自动监听。

