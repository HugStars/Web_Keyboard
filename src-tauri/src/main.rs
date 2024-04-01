// ! 关闭在Windows启动时显示的控制台窗口，请勿删除！！
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{
    CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem,
};
use window_shadows::set_shadow;

mod command_reg;
mod command_sys;
mod command_ws;
mod utils;

fn main() {
    let tray_menu = SystemTrayMenu::new()
        .add_item(CustomMenuItem::new("open".to_string(), "打开主界面"))
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(CustomMenuItem::new("quit".to_string(), "退出程序"));

    let system_tray = SystemTray::new()
        .with_menu(tray_menu)
        .with_tooltip("KeyBoard");

    tauri::Builder::default()
        .system_tray(system_tray)
        .on_system_tray_event(|app, event| menu_handle(app, event))
        .setup(|app| {
            let window = app.get_window("keyboard").unwrap();
            set_shadow(&window, true).expect("Unsupported platform!");
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            command_sys::get_local_ip,
            command_sys::get_current_dir,
            command_sys::open_browser_url,
            command_sys::exit,
            command_reg::get_reg,
            command_reg::set_reg,
            command_ws::web_server,
        ])
        .build(tauri::generate_context!())
        .expect("启动TAURI应用程序时出错")
        .run(|_app_handle, event| match event {
            tauri::RunEvent::ExitRequested { api, .. } => {
                api.prevent_exit();
            }
            _ => {}
        });
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
