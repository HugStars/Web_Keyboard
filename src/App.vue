<template>
    <main data-tauri-drag-region>
        <div class="img_box">
            <div class="image-bg"></div>
            <img data-tauri-drag-region src="../public/logo.svg" alt="logo">
        </div>
        <div class="text_box">
            <h1 class="name" @click="invoke('open_browser_url', { url: 'https://keyboard.hugstars.top/' })">Web KeyBoard</h1>
            <p class="text" data-tauri-drag-region>{{ tips }}</p>
            <p class="tagline" @click="invoke('open_browser_url', { url: qr_code_src })">{{ keyboard_href }}</p>
            <img :class="qr_class" :src="qr_code_src" @error="e => e.target.classList.add('error')" />
        </div>
    </main>
    <section data-tauri-drag-region>
        <button @click="invoke('exit')">后台运行</button>
        <button @click="process.exit()">退出程序</button>
    </section>
</template>


<script setup>
import { ref } from 'vue'

let { http, invoke, process } = window.__TAURI__

let tips = ref("")
let keyboard_href = ref("")
let qr_code_src = ref("")
let qr_class = ref("")

setTimeout(() => {
    invoke("web_server")

    http.fetch("http://127.0.0.1:8765").then(() => {
        tips.value = "服务已启动"
    })

    invoke("get_local_ip").then(res => {
        keyboard_href.value = `http://${res}:8765/keyboard`
        qr_code_src.value = `https://api.pwmqr.com/qrcode/create/?url=${keyboard_href.value}`
        qr_class.value = `padding`
    })
})

</script>
