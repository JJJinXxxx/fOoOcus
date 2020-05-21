# fOoOcus -- 你学起来真好看
An extension which allows you to monitor yourself for better online learning and doesn't let you browse social media while on focus mode.

<br>├── img 图像存放
<br>|   └── fOoOcus.png 暂定的拓展程序的图标
<br>├── background.js 后端文件（包括处理人脸识别/专注力报告生成/笔记中心推送区/桌面宠物娱乐养成
<br>├── popup.html 点击右上角拓展程序图标后出现的页面 可以放一些简单的button指向，例如快速开启各种学习模式（零酱在文档里写的番茄吧唧/生命有限..etc
<br>├── popup.js 由于chrome的popup文件不支持inline script所以所有js操作都要在popup.js里面单独操作
<br>├── homePage.html 前端。主要界面，包括桌面宠物/todolist/笔记中心之类的，并且请求摄像头权限进行获取用户图像
<br>├── inject.js 是content script，在打开一个页面的时候可以注入js，应该是可以用来统计网站使用时间der
<br>├── manifest.json 配置文件，需要什么权限去里面加ww