# Web KeyBoard | 局域网内的虚拟键盘

技术栈：Tauri + Vue 3
网站：[https://keyboard.hugstars.top](https://keyboard.hugstars.top)
[版本记录](./VERSION.md)

## 命令：

运行：

```npm
npm run tauri dev
```

打包：

```npm
npm run tauri build
```

## 相关 CMD 命令

> 注册表相关的没有使用 `cmd` 来执行，使用的是 `rust` 的 `winreg` 库来实现的

### 1、CMD 配置注册表，设置自启动

`HKEY_LOCAL_MACHINE`或者`HKEY_CURRENT_USER`都可以，但`HKEY_LOCAL_MACHINE`要以管理员身份运行

```sh
reg add HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Run /v Web_KeyBoard /d "文件路径" /f
reg add HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\Run /v Web_KeyBoard /d "文件路径" /f
```

### 2、获取注册表值

```sh
reg query HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Run /v Web_KeyBoard
reg query HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\Run /v Web_KeyBoard
```
