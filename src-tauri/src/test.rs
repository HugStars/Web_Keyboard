 // let output = Command::new("cmd")
    //     .creation_flags(0x08000000)
    //     .arg("/c")
    //     .arg(r"reg query HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Run /v Web_KeyBoard")
    //     .stdout(Stdio::piped())
    //     .output()
    //     .expect("执行命令失败");

    // // - 检查是否成功并处理输出：
    // if output.status.success() {
    //     // 先复制一份原始输出字节，以防后续转换失败时仍需使用
    //     let original_output = output.stdout.clone();

    //     match String::from_utf8(output.stdout) {
    //         Ok(stdout) => {
    //             let message_data: serde_json::Value = json!({
    //                 "status": "success",
    //                 "code": "1",
    //                 "message": stdout.trim_end()
    //             });
    //             return message_data.to_string();
    //         }
    //         Err(e) => {
    //             println!(
    //                 "子进程输出不是有效的 UTF-8 编码，原始输出字节: {:?}",
    //                 original_output
    //             );
    //             let message_data: serde_json::Value = json!({
    //                 "status": "error",
    //                 "code": "0",
    //                 "message": format!("子进程输出不是有效的 UTF-8 编码，错误信息: {}", e)
    //             });
    //             return message_data.to_string();
    //         }
    //     };
    // } else {
    //     let message_data: serde_json::Value = json!({
    //         "status": "error",
    //         "code": "0"
    //     });
    //     return message_data.to_string();
    // }