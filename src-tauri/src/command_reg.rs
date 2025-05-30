use serde_json::json;
use std::io;
use winreg::{
    enums::{HKEY_LOCAL_MACHINE, KEY_WRITE},
    RegKey,
};

#[tauri::command]
pub fn get_reg() -> String {
    println!("获取注册表");

    let result = get_reg_value(
        r"SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Run",
        "Web_KeyBoard",
    );
    match result {
        Ok(value) => {
            let message_data: serde_json::Value = json!({
                "status": "s",
                "code": "1",
                "path": value
            });
            return message_data.to_string();
        }
        Err(_e) => {
            let message_data: serde_json::Value = json!({
                "status": "error",
                "code": "0"
            });
            return message_data.to_string();
        }
    }
}

#[tauri::command]
pub fn set_reg(dir: String) -> String {
    println!("设置注册表：{}", &dir);

    let result = set_reg_value(
        r"SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Run",
        "Web_KeyBoard",
        &dir,
    );

    match result {
        Ok(_) => {
            let message_data: serde_json::Value = json!({
                "status": "success",
                "code": "1"
            });
            return message_data.to_string();
        }
        Err(_e) => {
            let message_data: serde_json::Value = json!({
                "status": "error",
                "code": "0"
            });
            return message_data.to_string();
        }
    }
}

#[tauri::command]
pub fn del_reg() -> String {
    println!("删除注册表");

    let result = del_reg_value(
        r"SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Run",
        "Web_KeyBoard",
    );
    match result {
        Ok(_) => {
            let message_data: serde_json::Value = json!({
                "status": "s",
                "code": "1"
            });
            return message_data.to_string();
        }
        Err(_e) => {
            let message_data: serde_json::Value = json!({
                "status": "error",
                "code": "0"
            });
            return message_data.to_string();
        }
    }
}

fn set_reg_value(key_path: &str, value_name: &str, value: &str) -> io::Result<()> {
    let hkcu = RegKey::predef(HKEY_LOCAL_MACHINE);
    let key = hkcu.open_subkey_with_flags(key_path, KEY_WRITE)?;

    // 创建或更新字符串类型的注册表值
    key.set_value(value_name, &value)?;

    Ok(())
}

fn get_reg_value(key_path: &str, value_name: &str) -> Result<String, io::Error> {
    let hkcu = RegKey::predef(HKEY_LOCAL_MACHINE);
    let key = hkcu.open_subkey(key_path)?;

    // 获取注册表键值
    let value = key.get_value(value_name)?;

    Ok(value)
}

fn del_reg_value(key_path: &str, value_name: &str) -> io::Result<()> {
    let hkcu = RegKey::predef(HKEY_LOCAL_MACHINE);
    let key = hkcu.open_subkey_with_flags(key_path, KEY_WRITE)?;

    // 删除指定名称的注册表值
    key.delete_value(value_name)?;

    // 返回空结果 Ok(())
    Ok(())
}
