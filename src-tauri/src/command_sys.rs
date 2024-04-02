use local_ipaddress;
use std::env;
use std::os::windows::process::CommandExt;
use std::process::Command;
use std::process::Stdio;
use std::cell::Cell;
use tauri::Manager;

#[tauri::command]
pub fn get_current_dir() -> String {
    let current_dir = env::current_exe().unwrap();
    return current_dir.to_string_lossy().to_string();
}

#[tauri::command]
pub fn get_local_ip() -> String {
    return local_ipaddress::get().unwrap();
}

#[tauri::command]
pub fn exit(app: tauri::Window) -> String {
    if let Some(window) = app.get_window("keyboard") {
        window.close().unwrap();
    }
    return "success".to_string();
}

#[tauri::command]
pub fn open_browser_url(url: String) -> String {
    Command::new("cmd")
        .creation_flags(0x08000000)
        .arg("/c")
        .arg("explorer ".to_owned() + &url)
        .stdout(Stdio::piped())
        .output()
        .expect("执行命令失败");

    return "执行成功".to_string();
}

// - 定义一个全局可变整数
static mut  GLOBAL_COUNTER: Cell<usize> = Cell::new(0);

#[tauri::command]
pub fn is_first_open() -> String {
    // 使用 unsafe 来访问和修改全局变量
    unsafe {
        let count = GLOBAL_COUNTER.get();
        GLOBAL_COUNTER.set(count + 1);
        format!("{}", count + 1)
    }
}