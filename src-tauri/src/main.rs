// ! 关闭在Windows启动时显示的控制台窗口，请勿删除！！
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use crate::keyboard::KEYBOARD_HTML;
use crate::utils::{string_to_key};
use axum::{
    extract::Json,
    response::Html,
    routing::{get, post},
    Router,
};
use enigo::*;
use local_ipaddress;
use serde::Deserialize;
use serde_json::json;
use std::env;
use std::os::windows::process::CommandExt;
use std::process::Command;
use std::process::Stdio;
use std::time::SystemTime;
use tauri::{
    CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem,
};
use window_shadows::set_shadow;
mod keyboard;
mod utils;

#[derive(Deserialize)]
struct KeyboardEvent {
    keys: Vec<String>,
}

fn main() {
    let tray_menu = SystemTrayMenu::new()
        .add_item(CustomMenuItem::new("open".to_string(), "打开主界面"))
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(CustomMenuItem::new("quit".to_string(), "退出程序"));

    let system_tray = SystemTray::new().with_menu(tray_menu).with_tooltip("KeyBoard");

    tauri::Builder::default()
        .system_tray(system_tray)
        .on_system_tray_event(|app, event| menu_handle(app, event))
        .setup(|app| {
            let window = app.get_window("keyboard").unwrap();
            set_shadow(&window, true).expect("Unsupported platform!");
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![get_local_ip, open_browser_url, web_server, exit])
        .build(tauri::generate_context!())
        .expect("启动TAURI应用程序时出错")
        .run(|_app_handle, event| match event {
            tauri::RunEvent::ExitRequested { api, .. } => {
                api.prevent_exit();
            }
            _ => {}
        });
}

#[tauri::command]
fn get_local_ip() -> String {
    return local_ipaddress::get().unwrap();
}

#[tauri::command]
fn exit(app: tauri::Window) -> String {
    if let Some(window) = app.get_window("keyboard") {
        window.close().unwrap();
    }
    return "success".to_string();
}

#[tauri::command]
fn open_browser_url(url: String) -> String {
    Command::new("cmd")
    .creation_flags(0x08000000)
    .arg("/c")
    .arg("explorer ".to_owned() + &url)
    .stdout(Stdio::piped())
    .output()
    .expect("执行命令失败");

    return "执行成功".to_string();
}

#[tauri::command]
async fn web_server() {
    let output = Command::new("cmd")
        .creation_flags(0x08000000)
        .arg("/c")
        .arg("netstat -ano | findstr :8765")
        .stdout(Stdio::piped())
        .output()
        .expect("执行命令失败");

    let stdout = String::from_utf8_lossy(&output.stdout);

    if stdout.contains("LISTENING") {
        return println!("端口8765正在监听中...");
    }

    let app: Router = Router::new()
        .route("/", get(root))
        .route("/keyboard", get(get_keyboard).post(post_keyboard))
        .route("/mouse_click", post(post_mouse_click))
        .route("/lock_screen", post(post_lock_screen))
        .route("/shutdown", post(post_shutdown))
        .route("/cancel_shutdown", post(post_cancel_shutdown));

    println!("启动了Web服务子线程，监听8765端口");

    axum::Server::bind(&"0.0.0.0:8765".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn root() -> String {
    let now = SystemTime::now()
        .duration_since(SystemTime::UNIX_EPOCH)
        .unwrap()
        .as_millis();

    let message_data: serde_json::Value = json!({
        "status": "success",
        "code": "1",
        "data": {
            "message": "Hello, World!",
            "time": now,
        }
    });
    return message_data.to_string();
}

async fn get_keyboard() -> Html<String> {
    println!("获取了键盘控制页面");

    Html(format!("{}", KEYBOARD_HTML))
}

async fn post_keyboard(Json(model): Json<KeyboardEvent>) -> String {
    let keys = model.keys;

    let mut enigo = Enigo::new();

    if keys.len() > 1 {
        for i in 0..keys.len() - 1 {
            println!("按下 - {}", keys[i]);
            enigo.key_down(string_to_key(&keys[i]).unwrap());
        }

        println!("点击 - {}", keys[keys.len() - 1]);
        enigo.key_click(string_to_key(&keys[keys.len() - 1]).unwrap());

        for i in (0..=keys.len() - 2).rev() {
            println!("弹起 - {}", keys[i]);
            enigo.key_up(string_to_key(&keys[i]).unwrap());
        }
    } else {
        println!("点击 - {}", keys[0]);
        enigo.key_click(string_to_key(&keys[0]).unwrap());
    }

    let message_data: serde_json::Value = json!({
        "status": "success",
        "code": "1"
    });
    return message_data.to_string();
}

async fn post_mouse_click() -> String {
    println!("点击 - 鼠标左键");

    let mut enigo = Enigo::new();
    enigo.mouse_click(MouseButton::Left);

    let message_data: serde_json::Value = json!({
        "status": "success",
        "code": "1"
    });
    return message_data.to_string();
}

async fn post_lock_screen() -> String {
    println!("锁屏");

    Command::new("cmd")
        .creation_flags(0x08000000)
        .arg("/c")
        .arg("rundll32.exe user32.dll,LockWorkStation")
        .stdout(Stdio::piped())
        .output()
        .expect("执行命令失败");

    let message_data: serde_json::Value = json!({
        "status": "success",
        "code": "1"
    });

    return message_data.to_string();
}

async fn post_shutdown() -> String {
    println!("30s后关机");

    Command::new("cmd")
        .creation_flags(0x08000000)
        .arg("/c")
        .arg("shutdown -s -t 30")
        .stdout(Stdio::piped())
        .output()
        .expect("执行命令失败");

    let message_data: serde_json::Value = json!({
        "status": "success",
        "code": "1"
    });

    return message_data.to_string();
}

async fn post_cancel_shutdown() -> String {
    println!("取消30s后关机");

    Command::new("cmd")
        .creation_flags(0x08000000)
        .arg("/c")
        .arg("shutdown -a")
        .stdout(Stdio::piped())
        .output()
        .expect("执行命令失败");

    let message_data: serde_json::Value = json!({
        "status": "success",
        "code": "1"
    });

    return message_data.to_string();
}

// - 托盘菜单事件 处理函数
fn menu_handle(app_handle: &tauri::AppHandle, event: SystemTrayEvent) {
    match event {
        SystemTrayEvent::LeftClick { .. } => {
            if let Some(window) = app_handle.get_window("keyboard") {
                window.show().unwrap();
                window.set_focus().unwrap();
                return;
            } else {
                println!("窗口不存在");

                tauri::WindowBuilder::new(
                    app_handle,
                    "keyboard",
                    tauri::WindowUrl::App("/".into()),
                )
                .inner_size(800.0, 600.0)
                .title("KeyBoard")
                .decorations(false)
                .resizable(false)
                .fullscreen(false)
                .transparent(false)
                .center()
                .build()
                .expect("启动TAURI应用程序时出错");

                let window = app_handle.get_window("keyboard").unwrap();
                set_shadow(&window, true).expect("Unsupported platform!");

                window.show().unwrap();
                window.set_focus().unwrap();

                return;
            }
        }
        SystemTrayEvent::RightClick { .. } => {
            if let Some(window) = app_handle.get_window("keyboard") {
                let item_handle = app_handle.tray_handle().get_item("open");
                if window.is_visible().unwrap() {
                    item_handle.set_title("关闭主界面").unwrap();
                } else {
                    item_handle.set_title("打开主界面").unwrap();
                }
                return;
            } else {
                let item_handle = app_handle.tray_handle().get_item("open");
                item_handle.set_title("打开主界面").unwrap();
            }
        }
        SystemTrayEvent::DoubleClick { .. } => {}
        SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
            "quit" => {
                std::process::exit(0);
            }
            "open" => {
                if let Some(window) = app_handle.get_window("keyboard") {
                    if window.is_visible().unwrap() {
                        window.close().unwrap();
                    } else {
                        window.show().unwrap();
                        window.set_focus().unwrap();
                    }
                    return;
                } else {
                    println!("窗口不存在");

                    tauri::WindowBuilder::new(
                        app_handle,
                        "keyboard",
                        tauri::WindowUrl::App("/".into()),
                    )
                    .inner_size(800.0, 600.0)
                    .title("KeyBoard")
                    .decorations(false)
                    .resizable(false)
                    .fullscreen(false)
                    .transparent(false)
                    .center()
                    .build()
                    .expect("启动TAURI应用程序时出错");

                    let window = app_handle.get_window("keyboard").unwrap();
                    set_shadow(&window, true).expect("Unsupported platform!");
                    window.show().unwrap();
                    window.set_focus().unwrap();
                    return;
                }
            }
            _ => {}
        },
        _ => {}
    }
}
