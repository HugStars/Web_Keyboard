# Tauri + Vue 3

This template should help get you started developing with Tauri + Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

运行：npm run tauri dev
打包：npm run tauri build

## 相关 CMD 命令

### CMD 配置注册表，设置自启动

`HKEY_LOCAL_MACHINE`要以管理员身份运行

```sh
reg add HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Run /v Web_KeyBoard /d "C:\Users\s__pe\Desktop\Web_KeyBoard_2024.1.16.exe" /f
reg add HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\Run /v Web_KeyBoard /d "C:\Users\s__pe\Desktop\Web_KeyBoard_2024.1.16.exe" /f
```

### 获取注册表值

```sh
reg query HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Run /v Web_KeyBoard
reg query HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\Run /v Web_KeyBoard
```
