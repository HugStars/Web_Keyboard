<template>
    <main data-tauri-drag-region>
        <div class="img_box">
            <div class="image-bg"></div>
            <img data-tauri-drag-region src="/logo.svg" alt="logo">
        </div>
        <div class="text_box" data-tauri-drag-region>
            <h1 class="name" @click="invoke('open_browser_url', { url: 'https://keyboard.hugstars.top/' })">Web KeyBoard</h1>
            <p class="text" data-tauri-drag-region>{{ tips }}</p>
            <p class="tagline" @click="invoke('open_browser_url', { url: qr_code_src })">{{ keyboard_href }}</p>
            <img :class="qr_class" :src="qr_code_src" @error="e => e.target.classList.add('error')" />
        </div>
    </main>
    <section data-tauri-drag-region>
        <button @click="SelfStartFn" :class="self_start_status"> <img class="check" src="/checked.svg"> 开机自启 </button>
        <button @click="invoke('exit')">后台运行<span :class="time_str_class">{{ time_str }}</span></button>
        <button @click="process.exit()" class="inactive">退出程序</button>
    </section>
</template>


<script setup>
import { ref } from 'vue'

let { http, invoke, process } = window.__TAURI__

let tips = ref("")
let current_dir = ref("")
let reg_dir = ref("")
let keyboard_href = ref("")
let qr_code_src = ref("")
let qr_class = ref("")
let time_num = ref(4)
let time_str = ref("")
let time_str_class = ref("time_str_class")
let self_start_status = ref('inactive')

setTimeout(() => {
    invoke("web_server")

    // - 监测服务是否启动
    http.fetch("http://127.0.0.1:8765").then(() => {
        tips.value = "服务已启动"
    })

    // - 获取本机ip
    invoke("get_local_ip").then(res => {
        keyboard_href.value = `http://${res}:8765/keyboard`
        qr_code_src.value = `https://api.pwmqr.com/qrcode/create/?url=${keyboard_href.value}`
        qr_class.value = `padding`
    })

    // - 获取运行目录
    invoke("get_current_dir").then(res => current_dir.value = res)

    // - 获取注册表信息，开机自启
    invoke("get_reg").then(res => {
        res = JSON.parse(res)
        if (res.code == '1') {
            reg_dir.value = res.path
            if (reg_dir.value == current_dir.value) {
                // - 判断是否是开机自启，如果是，就3s后关闭页面
                // - 否则 不关闭页面
                invoke("is_first_open").then(res => {
                    if (res > 1) return
                    Countdown()

                    function Countdown() {
                        return setTimeout(() => {
                            if (time_num.value > 1) {
                                time_str_class.value = 'time_str_class have_text'
                                time_num.value--
                                time_str.value = `（${time_num.value}秒后）`
                                return Countdown()
                            }
                            invoke('exit')
                        }, 1000)
                    }
                })
                return self_start_status.value = 'self_start'
            }
        }
        else self_start_status.value = 'inactive'
    })
})

// - 点击开机自启相关功能
function SelfStartFn() {
    if (self_start_status.value == 'self_start') {
        invoke("del_reg").then(res => {
            res = JSON.parse(res)
            if (res.code == 1) self_start_status.value = 'inactive'
        })
        return
    }

    invoke("set_reg", { dir: current_dir.value }).then(res => {
        res = JSON.parse(res)
        if (res.code == 1) self_start_status.value = 'self_start'
    })
}
</script>
