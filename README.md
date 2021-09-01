# NeteaseMusicUniapp
基于**uniapp**的手机版和仿网易云音乐app。安卓版 **apk** 体验：[仿网易云APP](https://img.sky123.top/img/%E4%BB%BF%E7%BD%91%E6%98%93%E4%BA%91app.apk)

**本项目仅限学习交流使用, 不得用于商业用途, 如作他用所承受的法律责任一概与作者无关**

## 灵感来源和感谢

- 网易云后端 **API**：

  [Binaryify/NeteaseCloudMusicApi: 网易云音乐 Node.js API service (github.com)](https://github.com/Binaryify/NeteaseCloudMusicApi)

- 这是自己成功部署后的效果，可以供测试用：

  [网易云音乐 API (sky123.top)](http://music.sky123.top/)

- 播放音乐的功能的代码借鉴，这位大佬用的是Nvue实现的和dom来，而我直接用vue写的，好处是大部分界面可以直接在浏览器运行查看到效果方便调试，只有播放音乐的功能需要进行真机调试。（毕竟是写web端写习惯了。。。。）

  [uni-music/NVUE at master · liuxiaoyucc/uni-music (github.com)](https://github.com/liuxiaoyucc/uni-music/tree/master/NVUE)

  

## 功能界面

主要实现了以下功能（其他功能只有界面，而没有具体实现，期待以后实现）

### 手机号密码登陆，注册，忘记密码，修改密码：

![image-20210901164641019](https://img.sky123.top/img/image-20210901164641019.png)

![image-20210901164738844](https://img.sky123.top/img/image-20210901164738844.png)

### 个人信息，歌单和播放列表获取

![image-20210901164938243](https://img.sky123.top/img/image-20210901164938243.png)

![image-20210901165005379](https://img.sky123.top/img/image-20210901165005379.png)

### 网易云发现和歌单推荐，图片推荐

![image-20210901165102869](https://img.sky123.top/img/image-20210901165102869.png)

### 云村推荐

![image-20210901165143364](https://img.sky123.top/img/image-20210901165143364.png)

### 核心功能：播放音乐和播放器背景毛玻璃特效

![image-20210901165238544](https://img.sky123.top/img/image-20210901165238544.png)

支持歌词自滚动，上一首，下一首，喜欢或取消喜欢，播放器背景随专辑图片变换

![image-20210901165251899](https://img.sky123.top/img/image-20210901165251899.png)

![image-20210901165359535](https://img.sky123.top/img/image-20210901165359535.png)

## 运行教程

**git clone** 或者 **download zip**

网速慢的可以使用加速源

```
https://hub.fastgit.org/sky-max-hub/NeteaseMusicUniapp.git
```

```
https://gitclone.com/github.com/sky-max-hub/NeteaseMusicUniapp.git
```

之后在 **HBuilder X** 文件选项中选择**从文件目录中导入**或者**从git中导入**：

![](https://img.sky123.top/img/image-20210901163304654.png)

之后选择识别工程类型，点击运行即可，注意：**播放音乐功能只能在APP端中才能看到效果**，其他界面可以选择在浏览器中运行或者在手机中运行。

![image-20210901163724604](https://img.sky123.top/img/image-20210901163724604.png)

![image-20210901163817218](https://img.sky123.top/img/image-20210901163817218.png)

