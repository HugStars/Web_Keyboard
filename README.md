# Web KeyBoard | 局域网内的虚拟键盘

技术栈：Tauri + Vue 3

官网：[https://keyboard.hugstars.top](https://keyboard.hugstars.top)

版本情况：[版本记录](./VERSION.md)

开发笔记：[开发笔记](./NOTE.md)（待完善）

## 使用场景

- 电脑播放电影，坐的离电脑比较远，不想起身拿键盘
- 办公室内起身去厕所忘了锁屏
- 局域网其他电脑不想频繁起身或者切换键盘
- ...

## 使用方法说明

### 一、软件使用介绍

1. 此软件是使用 `Tauri` + `Vue3` 编写的一个局域网内的虚拟键盘
2. 推荐以管理员身份运行，以便在如 VSCode、游戏（如 CFHD）中获取控制权。
   - 右键 → 以管理员身份运行
   - 右键 → 属性 → 兼容性 → 以管理员身份运行此程序 → 应用
3. 首次进入软件时，若 `Windows 安全中心`提示：【`是否要允许公共网络和专用网络访问此应用`】，请点击`允许`，以便在同局域网下的其他客户端访问控制此电脑。
4. 应用启动后，点击标题的<b style="color:#41CF7D">【Web KeyBoard】</b>可跳转到官网：[https://keyboard.hugstars.top](https://keyboard.hugstars.top)
5. 点击【`服务已启动`】下面的`控制端网址`可在本机打开控制端网页进行测试
6. 若设备可访问公网，会在【`控制端网址`】下面生成`网址二维码`，网址二维码内容和控制端网址一致
7. 控制端需要和本软件的运行设备处在`同一网络下`才可进行控制
8. 控制端`手动输入控制端网址或者扫描二维码`即可打开控制端虚拟键盘
9. 点击<b style="color:#41CF7D">【开机自启】</b>按钮，程序会向注册表内注册或删除对应信息，以供实现开机自启
10. 点击<b style="color:#41CF7D">【后台运行】</b>按钮，程序会最小化运行
11. 若设置了开机自启，且软件为首次打开，软件会在 3 秒后自动关闭主界面，后台运行
12. 若想再次打开页面，在状态栏右下角找到对应托盘程序`单击`或右键【`打开主界面`】即可

### 二、控制端网页使用介绍：

- <img src="https://github.com/HugStars/Web_Keyboard/assets/76810475/fbdb19f6-5ec5-44fa-b2cb-b005417a13aa" width="16px">：鼠标左键单击
- <img src="https://github.com/HugStars/Web_Keyboard/assets/76810475/f78d2a2e-c898-473c-98a5-622cc77e838e" height="11px">：多选键，点击后可以使用组合键：
  - 【Shift】、【Ctrl】、【<img src="https://github.com/HugStars/Web_Keyboard/assets/76810475/15f389be-8071-49c5-ab08-c360c8717394" width="16px">】、【Alt】键
  - 示例 1：【Win + R】的组合按键顺序为：【<img src="https://github.com/HugStars/Web_Keyboard/assets/76810475/f78d2a2e-c898-473c-98a5-622cc77e838e" height="11px">】、【<img src="https://github.com/HugStars/Web_Keyboard/assets/76810475/15f389be-8071-49c5-ab08-c360c8717394" width="16px">】、【R】
  - 示例 2：【Ctrl + Shift + Esc】任务管理器的组合按键顺序为：【<img src="https://github.com/HugStars/Web_Keyboard/assets/76810475/f78d2a2e-c898-473c-98a5-622cc77e838e" height="11px">】、【Ctrl】、【Shift】、【Esc】
- <img src="https://github.com/HugStars/Web_Keyboard/assets/76810475/bf164330-4bf0-4b0c-bf59-f935aabc1660" width="16px">：切换副键盘
- <img src="https://github.com/HugStars/Web_Keyboard/assets/76810475/38239afc-dba0-4de3-b409-102ad1769232" width="16px">：锁屏
- <img src="https://github.com/HugStars/Web_Keyboard/assets/76810475/cb124c8d-f522-4244-99ac-9be074d324bd" width="16px">：30s 后关机
- <img src="https://github.com/HugStars/Web_Keyboard/assets/76810475/3a729083-d60a-45db-a221-8a0c8d127efa" width="16px">：取消关机

## 构建命令：

运行：`npm run tauri dev`

打包：`npm run tauri build`
