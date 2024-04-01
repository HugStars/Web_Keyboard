<template>
    <main data-tauri-drag-region>
        <div class="img_box">
            <div class="image-bg"></div>
            <img data-tauri-drag-region src="/logo.svg" alt="logo">
        </div>
        <div class="text_box" data-tauri-drag-region>
            <h1 class="name" @click="invoke('open_browser_url', { url: 'https://keyboard.hugstars.top/' })">Web KeyBoard</h1>
            <p class="text" data-tauri-drag-region>{{ tips }}</p>
            <p class="tagline" data-tauri-drag-region>{{ current_dir }}</p>
            <p class="tagline" @click="invoke('open_browser_url', { url: qr_code_src })">{{ keyboard_href }}</p>
            <img :class="qr_class" :src="qr_code_src" @error="e => e.target.classList.add('error')" />
        </div>
    </main>
    <section data-tauri-drag-region>
        <button @click="set_self_start"> <img :class="self_start_status" src="/checked.svg"> 开机自启 </button>
        <button @click="invoke('exit')">后台运行<span>（{{ time_num }}S后）</span></button>
        <button @click="process.exit()">退出程序</button>
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
let time_num = ref(3)
let self_start_status = ref('checked none')

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
        console.log(res.path)
        if (res.code == '1') {
            reg_dir.value = res.path
            if (reg_dir.value == current_dir.value) {
                return self_start_status.value = 'checked have'
            }
            console.log("获取到了注册表，没对上")
        }
        else {
            console.log('没有获取到注册表')
            self_start_status.value = 'checked none'
        }
    })
})

function set_self_start() {
    if (self_start_status.value == 'checked have') return console.log('已注册')
    invoke("set_reg", { dir: current_dir.value }).then(res => {
        res = JSON.parse(res)
        console.log(res)
    })
}

</script>
