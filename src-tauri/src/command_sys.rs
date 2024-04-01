use local_ipaddress;
use std::env;
use std::os::windows::process::CommandExt;
use std::process::Command;
use std::process::Stdio;
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
