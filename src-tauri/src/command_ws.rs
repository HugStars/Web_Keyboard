mod keyboard;
use axum::response::IntoResponse;
use axum::{
    body::Bytes,
    extract::Json,
    http::{HeaderMap, HeaderValue},
    response::{Html, Response},
    routing::{get, post},
    Router,
};
use enigo::*;
use image::ImageOutputFormat;
use screenshots::Screen;
use serde::Deserialize;
use serde_json::json;
use std::io::Cursor;
use std::os::windows::process::CommandExt;
use std::process::Command;
use std::process::Stdio;
use std::time::SystemTime;

use crate::utils::string_to_key;

#[tauri::command]
pub async fn web_server() {
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
        .route("/screen_shot", get(get_screen_shot))
        .route("/shutdown", post(post_shutdown))
        .route("/cancel_shutdown", post(post_cancel_shutdown))
        .route("/get_keyboard_css", get(get_keyboard_css))
        .route("/get_keyboard_js", get(get_keyboard_js));

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
    println!("获取了键盘控制页面的HTML文件");
    Html(format!("{}", keyboard::KEYBOARD_HTML))
}

async fn get_keyboard_css() -> String {
    println!("获取了键盘控制页面的CSS文件");
    format!("{}", keyboard::KEYBOARD_CSS)
}

async fn get_keyboard_js() -> String {
    println!("获取了键盘控制页面的JavaScript文件");
    format!("{}", keyboard::KEYBOARD_JS)
}

#[derive(Deserialize)]
struct KeyboardEvent {
    keys: Vec<String>,
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

    format!("{}", "{\"status\": \"success\",\"code\": \"1\"}")
}

async fn post_mouse_click() -> String {
    println!("点击 - 鼠标左键");

    let mut enigo = Enigo::new();
    enigo.mouse_click(MouseButton::Left);

    format!("{}", "{\"status\": \"success\",\"code\": \"1\"}")
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

    format!("{}", "{\"status\": \"success\",\"code\": \"1\"}")
}

async fn get_screen_shot() -> Result<Response, String> {
    println!("获取截图");

    let screens = Screen::all().map_err(|e| format!("获取屏幕失败: {}", e))?;

    if screens.is_empty() {
        return Err("没有找到屏幕".to_string());
    }

    let screen = screens[0];
    let image = screen.capture().map_err(|e| format!("截图失败: {}", e))?;

    let mut bytes = Vec::new();
    let mut cursor = Cursor::new(&mut bytes);

    image
        .write_to(&mut cursor, ImageOutputFormat::Png)
        .map_err(|e| format!("图像编码失败: {}", e))?;

    let mut headers = HeaderMap::new();
    headers.insert("Content-Type", HeaderValue::from_static("image/png"));
    headers.insert(
        "Content-Disposition",
        HeaderValue::from_static("inline; filename=\"screenshot.png\""),
    );

    Ok((headers, Bytes::from(bytes)).into_response())
}

#[derive(Deserialize)]
struct ShotDownEvent {
    time: String,
}
async fn post_shutdown(Json(model): Json<ShotDownEvent>) -> String {
    let time = model.time;

    println!("{}", time.clone() + "s后关机");

    Command::new("cmd")
        .creation_flags(0x08000000)
        .arg("/c")
        .arg("shutdown -s -t ".to_owned() + &time)
        .stdout(Stdio::piped())
        .output()
        .expect("执行命令失败");

    format!("{}", "{\"status\": \"success\",\"code\": \"1\"}")
}

async fn post_cancel_shutdown() -> String {
    println!("取消关机");

    Command::new("cmd")
        .creation_flags(0x08000000)
        .arg("/c")
        .arg("shutdown -a")
        .stdout(Stdio::piped())
        .output()
        .expect("执行命令失败");

    format!("{}", "{\"status\": \"success\",\"code\": \"1\"}")
}
