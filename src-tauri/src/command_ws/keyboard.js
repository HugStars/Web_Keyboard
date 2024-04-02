let CheckViscous = document.querySelector('#Viscous')
let Viscous_List = []

document.addEventListener('keydown', e => {
    e.preventDefault()
    console.log(e)
    if (!e.key) return
    let el = document.querySelector("." + (e.code || e.key))
    if (!el) el = document.querySelector("." + e.key)
    if (!el) el = document.querySelector("." + e.key.toLocaleLowerCase())
    if (el) el.classList.add("pressed"), setTimeout(() => el.classList.remove("pressed"), 100)
    // keydown_fn(e)
})

let keyboard_list = [
    [
        { "Escape": { type: 'press', value: "Esc" } },
        { "empty_1": "empty" },
        { "F1": 'press' },
        { "F2": 'press' },
        { "F3": 'press' },
        { "F4": 'press' },
        { "empty_2": "empty" },
        { "F5": 'press' },
        { "F6": 'press' },
        { "F7": 'press' },
        { "F8": 'press' },
        { "empty_3": "empty" },
        { "F9": 'press' },
        { "F10": 'press' },
        { "F11": 'press' },
        { "F12": 'press' },
    ],
    [
        { "Backquote": { type: "press", value: "`" } },
        { "Digit1": { type: "press", value: "1" } },
        { "Digit2": { type: "press", value: "2" } },
        { "Digit3": { type: "press", value: "3" } },
        { "Digit4": { type: "press", value: "4" } },
        { "Digit5": { type: "press", value: "5" } },
        { "Digit6": { type: "press", value: "6" } },
        { "Digit7": { type: "press", value: "7" } },
        { "Digit8": { type: "press", value: "8" } },
        { "Digit9": { type: "press", value: "9" } },
        { "Digit0": { type: "press", value: "0" } },
        { "Minus": { type: "press", value: "-" } },
        { "Equal": { type: "press", value: "=" } },
        { "Backspace": { type: "press", value: `<svg style="width: 1.2rem;height: 1.2rem;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1026 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M968.704 197.632q23.552 0 38.912 15.36t15.36 36.864l0 528.384q0 21.504-15.36 36.864t-38.912 15.36l-655.36 0-1.024 0-2.048 0q-5.12 0-14.848-2.048t-14.848-6.144l-1.024-1.024-1.024-1.024-262.144-257.024 0-1.024q-18.432-15.36-18.432-48.128 0-15.36 4.608-27.648t12.8-20.48l262.144-256q2.048-2.048 10.24-6.144 10.24-6.144 25.6-6.144l655.36 0zM834.56 658.432q9.216-14.336 3.072-25.6t-20.48-25.6q-17.408-17.408-47.616-45.056t-65.024-59.392q37.888-35.84 69.632-66.56t49.152-48.128q12.288-11.264 12.288-26.112t-13.312-26.112q-2.048-2.048-6.144-5.632t-6.144-4.608q-14.336-9.216-28.16-7.168t-25.088 13.312q-17.408 17.408-49.152 47.104t-67.584 63.488q-31.744-29.696-58.88-55.808t-44.544-43.52q-19.456-20.48-34.816-23.552t-27.648 4.096q-2.048 2.048-9.728 7.168t-9.728 7.168q-13.312 11.264-8.704 28.16t30.208 42.496q16.384 15.36 43.008 40.448t57.344 54.784q-32.768 30.72-60.416 56.832t-45.056 43.52q-14.336 13.312-23.04 29.696t1.536 29.696q2.048 2.048 8.704 8.192t8.704 8.192q14.336 11.264 32.256 7.68t35.328-20.992 45.056-44.544 60.416-57.856q34.816 32.768 64.512 60.928t48.128 46.592q13.312 12.288 30.72 16.384t28.672-4.096l4.096-4.096t7.68-8.704 6.656-8.192 4.096-4.608z"></path></svg>` } },
    ], [
        { "Tab": "press" },
        { "q": "press" },
        { "w": "press" },
        { "e": "press" },
        { "r": "press" },
        { "t": "press" },
        { "y": "press" },
        { "u": "press" },
        { "i": "press" },
        { "o": "press" },
        { "p": "press" },
        { "BracketLeft": { type: "press", value: "[" } },
        { "BracketRight": { type: "press", value: "]" } },
        { "Backslash": { type: "press", value: "\\" } },
    ],
    [
        { "CapsLock": "touch" },
        { "a": "press" },
        { "s": "press" },
        { "d": "press" },
        { "f": "press" },
        { "g": "press" },
        { "h": "press" },
        { "j": "press" },
        { "k": "press" },
        { "l": "press" },
        { "Semicolon": { value: ";", type: "press" } },
        { "Quote": { value: "'", type: "press" } },
        { "Enter": "press" }
    ],
    [
        { "Shift": "touch" },
        { "z": "press" },
        { "x": "press" },
        { "c": "press" },
        { "v": "press" },
        { "b": "press" },
        { "n": "press" },
        { "m": "press" },
        { "Comma": { value: ",", type: "press" } },
        { "Period": { value: ".", type: "press" } },
        { "Slash": { value: "/", type: "press" } },
        { "empty_2": "empty" },
        { "ArrowUp": { type: "press", value: "↑" } }
    ],
    [
        { "Control": { type: "touch", value: "Ctrl" } },
        { "Meta": { type: "press", value: `<svg style="width: 1rem;height: 1rem;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M454.656 863.232l-1.024-343.04 455.68 2.048 0 409.6zM453.632 143.36l455.68-68.608 0 378.88-455.68 0 0-310.272zM65.536 519.168l325.632 1.024 0 336.896-325.632-52.224 0-285.696zM65.536 453.632l0-251.904 325.632-52.224 0 304.128-325.632 0z"></path></svg>` } },
        { "Alt": "press" },
        { "Space": { type: "press", value: "" } },
        { "Click": { type: "other", value: `<svg style="width: 1rem;height: 1rem;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M598.4 355.2l3.2-3.2c32-60.8 32-128 0-188.8-32-57.6-96-92.8-163.2-92.8-32 0-64 9.6-92.8 25.6-48 25.6-80 67.2-92.8 118.4-12.8 48-3.2 96 22.4 137.6l3.2 6.4H198.4v-3.2C172.8 288 172.8 220.8 198.4 160c41.6-96 134.4-160 240-160 32 0 67.2 6.4 99.2 19.2 64 25.6 115.2 73.6 140.8 137.6 28.8 64 28.8 134.4 0 198.4v3.2h-80z" ></path><path d="M854.4 569.6c-6.4-32-35.2-57.6-64-57.6-19.2 0-35.2 9.6-44.8 22.4v-6.4c0-38.4-28.8-67.2-60.8-67.2s-60.8 32-60.8 67.2v-35.2c0-38.4-28.8-67.2-60.8-67.2s-60.8 32-60.8 67.2V272c0-38.4-28.8-67.2-60.8-67.2S384 236.8 384 272v390.4c0 19.2-12.8 35.2-32 35.2h-9.6L256 659.2c-9.6-6.4-19.2-3.2-28.8-6.4-32-9.6-60.8 32-60.8 67.2 0 22.4 25.6 51.2 38.4 64l233.6 240h358.4c9.6-44.8 44.8-214.4 57.6-320 3.2-51.2 6.4-99.2 0-134.4z" ></path></svg>` } },
        { "Viscous": { type: "other", value: `<svg style="width: .8rem;height: .8rem;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1226 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" ><path d="M1211.564373 375.395954L656.151534 1004.500731a57.398712 57.398712 0 0 1-86.167895 0L14.5708 375.395954a57.445264 57.445264 0 0 1 43.060672-95.431759h1110.872229a57.445264 57.445264 0 0 1 43.060672 95.431759z" ></path><path d="M20.808779 153.901169h1184.517615a20.715675 20.715675 0 0 0 20.669123-20.669123V20.669122A20.715675 20.715675 0 0 0 1205.326394 0H20.669122A20.715675 20.715675 0 0 0 0 20.669122v112.562924a20.948435 20.948435 0 0 0 20.808779 20.669123z" opacity=".5" ></path></svg>` } },
        { "Change": { type: "other", value: `<svg style="width: .9rem;height: .9rem;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M768.263314 250.88l120.978286-73.362286s7.168-4.315429 4.534857-17.627428a52.882286 52.882286 0 0 0-19.456-18.139429C868.688457 140.141714 601.570743 8.045714 601.570743 8.045714S578.603886-7.899429 557.319314 5.046857c-17.846857 10.825143-16.749714 30.134857-16.749714 30.134857l-22.601143 312.758857s4.681143 17.188571 10.825143 28.379429c9.728 9.069714 16.822857 4.754286 16.822857 4.754286l113.883429-69.046857L780.624457 532.48s73.142857 184.905143 12.726857 221.622857c0 0 190.171429-120.32 93.549715-296.009143"></path><path d="M257.726171 726.308571L136.747886 799.670857s-5.12 8.045714-2.486857 21.430857c6.144 11.264 11.776 12.8 13.897142 16.530286 5.558857 1.609143 272.676571 133.705143 272.676572 133.705143s23.04 15.945143 44.397714 2.998857 20.187429-32.182857 20.187429-32.182857l20.626285-316.562286s-2.633143-13.385143-8.777142-24.649143c-11.776-12.726857-18.944-8.411429-18.944-8.411428l-113.810286 69.046857-121.270857-220.598857S170.101029 256.146286 230.590171 219.428571c0 0-190.171429 120.246857-93.549714 296.009143"></path></svg>` } },
        { "empty_2": "empty" },
        { "ArrowLeft": { type: "press", value: "←" } },
        { "ArrowDown": { type: "press", value: "↓" } },
        { "ArrowRight": { type: "press", value: "→" } },
    ]]
let control_panel_list = [
    { "VolumeMute": { type: "other", value: `<svg style="width: 1.2rem;height: 1.2rem;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" ><path d="M552.96 152.064v719.872c0 16.118-12.698 29.184-28.365 29.184a67.482 67.482 0 0 1-48.394-20.644L329.359 729.354a74.547 74.547 0 0 0-53.493-22.794H250.47c-104.386 0-189.03-87.101-189.03-194.56s84.644-194.56 189.03-194.56h25.396c20.07 0 39.3-8.192 53.473-22.794L476.18 143.503a67.482 67.482 0 0 1 48.436-20.623c15.646 0 28.344 13.066 28.344 29.184z m400.507 514.662a31.068 31.068 0 0 1-41.41 2.294l-88.167-70.656a40.243 40.243 0 0 0-50.34 0l-88.166 70.656a31.068 31.068 0 0 1-43.684-43.684l70.656-88.166a40.243 40.243 0 0 0 0-50.34L641.7 398.664a31.068 31.068 0 0 1 43.684-43.684l88.166 70.656c14.705 11.796 35.635 11.796 50.34 0l88.166-70.656a31.068 31.068 0 0 1 43.684 43.684l-70.656 88.166a40.243 40.243 0 0 0 0 50.34l70.656 88.166a31.068 31.068 0 0 1-2.273 41.41z"></path></svg>` } },
    { "VolumeDown": { type: "other", value: `<svg style="width: 1.2rem;height: 1.2rem;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M552.96 152.064v719.872c0 16.118-12.698 29.184-28.365 29.184a67.482 67.482 0 0 1-48.394-20.644L329.359 729.354a74.547 74.547 0 0 0-53.493-22.794H250.47c-104.386 0-189.03-87.101-189.03-194.56s84.644-194.56 189.03-194.56h25.396c20.07 0 39.3-8.192 53.473-22.794L476.18 143.503a67.482 67.482 0 0 1 48.436-20.623c15.646 0 28.344 13.066 28.344 29.184zM675.84 471.04H921.6a40.96 40.96 0 1 1 0 81.92H675.84a40.96 40.96 0 1 1 0-81.92z"></path></svg>` } },
    { "VolumeUp": { type: "other", value: `<svg style="width: 1.2rem;height: 1.2rem;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" ><path d="M552.96 152.064v719.872c0 16.118-12.698 29.184-28.365 29.184a67.482 67.482 0 0 1-48.394-20.644L329.359 729.354a74.547 74.547 0 0 0-53.493-22.794H250.47c-104.386 0-189.03-87.101-189.03-194.56s84.644-194.56 189.03-194.56h25.396c20.07 0 39.3-8.192 53.473-22.794L476.18 143.503a67.482 67.482 0 0 1 48.436-20.623c15.646 0 28.344 13.066 28.344 29.184z m212.05 281.088l6-59.904a27.853 27.853 0 0 1 55.42 0l6 59.904a50.422 50.422 0 0 0 45.138 45.138l59.904 6a27.853 27.853 0 0 1 0 55.42l-59.904 6a50.422 50.422 0 0 0-45.138 45.138l-6 59.904a27.853 27.853 0 0 1-55.42 0l-6-59.904a50.422 50.422 0 0 0-45.138-45.138l-59.904-6a27.853 27.853 0 0 1 0-55.42l59.904-6a50.422 50.422 0 0 0 45.138-45.138z"></path></svg>` } },
    { "empty_1": "empty" },
    { "LockScreen": { type: 'other', value: `<svg style="width: 1rem;height: 1rem;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" ><path d="M835.82781 987.91619H145.700571c-24.966095 0-44.958476-20.577524-44.958476-46.372571V446.171429c0-25.795048 20.138667-46.567619 44.958476-46.567619h74.947048V291.303619C220.842667 137.362286 341.625905 12.678095 490.788571 12.678095c149.113905 0 270.140952 124.68419 270.140953 278.820572V399.847619h75.093333c24.81981 0 44.909714 20.772571 44.909714 46.567619v495.518476a45.738667 45.738667 0 0 1-45.104761 45.982476zM445.830095 711.92381v90.307047c0 25.6 20.138667 46.567619 44.958476 46.567619 24.966095 0 45.104762-20.821333 45.104762-46.567619V711.92381c26.624-15.993905 44.909714-45.592381 44.909715-80.067048 0-51.346286-40.277333-92.94019-90.014477-92.940191-49.590857 0-89.86819 41.593905-89.86819 92.940191a92.16 92.16 0 0 0 44.909714 80.067048z m224.792381-420.620191c0-102.741333-80.457143-185.880381-180.028952-185.880381-99.376762 0-179.931429 83.139048-179.931429 185.880381v108.348952h360.009143V291.303619z"></path></svg>` } },
    { "MediaPrevTrack": { type: "other", value: `<svg style="width: 1.2rem;height: 1.2rem;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M264.533333 176.981333a42.666667 42.666667 0 0 1 42.368 37.674667l0.298667 4.992v215.04l418.986667-235.264A85.333333 85.333333 0 0 1 853.333333 273.792v484.48a85.333333 85.333333 0 0 1-123.306666 76.416L307.2 624.512v179.882667a42.666667 42.666667 0 0 1-85.034667 4.949333l-0.298666-4.949333V219.648a42.666667 42.666667 0 0 1 42.666666-42.666667z"></path></svg>` } },
    { "MediaPlayPause": { type: "other", value: `<svg style="width: 1em;height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden; margin-left: 0.1rem;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M80.842105 136.353684C80.842105 52.224 173.109895 0.538947 244.951579 44.570947l612.944842 375.592421c68.661895 42.037895 68.661895 141.743158 0 183.781053l-612.944842 375.646316C173.109895 1023.461053 80.842105 971.776 80.842105 887.538526V136.407579z"></path></svg>` } },
    { "MediaNextTrack": { type: "other", value: `<svg style="width: 1.2rem;height: 1.2rem;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M759.466667 176.981333a42.666667 42.666667 0 0 1 42.666666 42.666667v584.746667l-0.298666 4.949333a42.666667 42.666667 0 0 1-85.034667-4.949333l-0.042667-179.882667-422.784 210.176a85.333333 85.333333 0 0 1-30.08 8.533333l-7.893333 0.426667a85.333333 85.333333 0 0 1-85.333333-85.333333V273.749333a85.333333 85.333333 0 0 1 127.146666-74.368l418.944 235.306667 0.042667-215.082667 0.298667-4.992a42.666667 42.666667 0 0 1 42.368-37.674666z"></path></svg>` } },
    { "empty_1": "empty" },
    { "Shutdown": { type: "other", value: `<svg style="width: 1.1em;height: 1.1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M540.8 534.4c32-16 32-12.8 32-260.8 0-203.2 0-225.6-9.6-241.6s-38.4-32-57.6-32c-19.2 0-48 12.8-57.6 28.8s-9.6 28.8-12.8 232c-3.2 241.6 0 244.8 32 267.2 22.4 16 51.2 16 73.6 6.4z m48 484.8C827.2 977.6 993.6 780.8 993.6 544c0-131.2-51.2-251.2-144-344C804.8 160 782.4 144 756.8 144c-38.4 0-67.2 32-67.2 70.4 0 19.2 9.6 35.2 64 86.4 70.4 67.2 105.6 147.2 105.6 241.6 0 150.4-102.4 286.4-248 331.2-54.4 16-147.2 16-200 0-54.4-16-121.6-60.8-156.8-99.2-35.2-38.4-70.4-102.4-83.2-153.6-9.6-41.6-9.6-121.6 0-163.2 19.2-76.8 64-140.8 124.8-190.4 44.8-35.2 54.4-57.6 38.4-92.8-12.8-25.6-44.8-44.8-76.8-35.2-51.2 12.8-137.6 105.6-180.8 190.4-32 62.4-44.8 116.8-44.8 195.2-3.2 64 0 83.2 9.6 124.8 41.6 174.4 169.6 305.6 340.8 356.8 38.4 12.8 64 16 118.4 16 30.4 0 75.2 0 88-3.2z" ></path></svg>` } },
    { "Change": { type: "other", value: `<svg style="width: .9rem;height: .9rem;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M768.263314 250.88l120.978286-73.362286s7.168-4.315429 4.534857-17.627428a52.882286 52.882286 0 0 0-19.456-18.139429C868.688457 140.141714 601.570743 8.045714 601.570743 8.045714S578.603886-7.899429 557.319314 5.046857c-17.846857 10.825143-16.749714 30.134857-16.749714 30.134857l-22.601143 312.758857s4.681143 17.188571 10.825143 28.379429c9.728 9.069714 16.822857 4.754286 16.822857 4.754286l113.883429-69.046857L780.624457 532.48s73.142857 184.905143 12.726857 221.622857c0 0 190.171429-120.32 93.549715-296.009143"></path><path d="M257.726171 726.308571L136.747886 799.670857s-5.12 8.045714-2.486857 21.430857c6.144 11.264 11.776 12.8 13.897142 16.530286 5.558857 1.609143 272.676571 133.705143 272.676572 133.705143s23.04 15.945143 44.397714 2.998857 20.187429-32.182857 20.187429-32.182857l20.626285-316.562286s-2.633143-13.385143-8.777142-24.649143c-11.776-12.726857-18.944-8.411429-18.944-8.411428l-113.810286 69.046857-121.270857-220.598857S170.101029 256.146286 230.590171 219.428571c0 0-190.171429 120.246857-93.549714 296.009143"></path></svg>` } },
    { "empty_1": "empty" },
    { "empty_1": "empty" },
    { "empty_1": "empty" },
    { "CancelShutdown": { type: "other", value: `<svg style="width: 1.1em;height: 1.1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M540.8 534.4c32-16 32-12.8 32-260.8 0-203.2 0-225.6-9.6-241.6s-38.4-32-57.6-32c-19.2 0-48 12.8-57.6 28.8s-9.6 28.8-12.8 232c-3.2 241.6 0 244.8 32 267.2 22.4 16 51.2 16 73.6 6.4z m48 484.8C827.2 977.6 993.6 780.8 993.6 544c0-131.2-51.2-251.2-144-344C804.8 160 782.4 144 756.8 144c-38.4 0-67.2 32-67.2 70.4 0 19.2 9.6 35.2 64 86.4 70.4 67.2 105.6 147.2 105.6 241.6 0 150.4-102.4 286.4-248 331.2-54.4 16-147.2 16-200 0-54.4-16-121.6-60.8-156.8-99.2-35.2-38.4-70.4-102.4-83.2-153.6-9.6-41.6-9.6-121.6 0-163.2 19.2-76.8 64-140.8 124.8-190.4 44.8-35.2 54.4-57.6 38.4-92.8-12.8-25.6-44.8-44.8-76.8-35.2-51.2 12.8-137.6 105.6-180.8 190.4-32 62.4-44.8 116.8-44.8 195.2-3.2 64 0 83.2 9.6 124.8 41.6 174.4 169.6 305.6 340.8 356.8 38.4 12.8 64 16 118.4 16 30.4 0 75.2 0 88-3.2z" ></path><path d="M25.137849 146.514072A85.80985 85.80985 0 0 1 146.514073 25.137849l852.364189 852.364189a85.80985 85.80985 0 0 1-121.307958 121.307958z m0 0" ></path></svg>` } },
]

let main_html_str = ``
keyboard_list.forEach(list => {
    list.forEach(key => {
        let key_name = Object.keys(key)[0]
        if (Object.values(key)[0] == 'empty') main_html_str += `<div class="empty ${key_name}"></div>`
        else if (typeof Object.values(key)[0] == "object") main_html_str += `<div class="key ${key_name}" data-key="${key_name}">${Object.values(key)[0].value}</div>`
        else main_html_str += `<div class="key ${key_name}" data-key="${key_name}">${key_name}</div>`
    })
})

document.querySelector('.keyboard').innerHTML = main_html_str

let control_panel_html_str = ``
control_panel_list.forEach(key => {
    let key_name = Object.keys(key)[0]
    if (Object.values(key)[0] == 'empty') control_panel_html_str += `<div class="empty ${key_name}"></div>`
    else if (typeof Object.values(key)[0] == "object") control_panel_html_str += `<div class="key ${key_name}" data-key="${key_name}">${Object.values(key)[0].value}</div>`
    else control_panel_html_str += `<div class="key ${key_name}" data-key="${key_name}">${key_name}</div>`
})

document.querySelector('.control_panel').innerHTML = control_panel_html_str

document.querySelector('body').addEventListener('click', e => keydown_fn(e))
document.querySelector('body').addEventListener('touch', e => keydown_fn(e))

function keydown_fn(event) {
    if (event.target.classList[0] !== 'key') return

    if (event.target.dataset.key === 'Viscous') return ViscousFn()
    if (event.target.dataset.key === 'Click') return ClickFn()
    if (event.target.dataset.key === 'LockScreen') return LockScreenFn()
    if (event.target.dataset.key === 'Shutdown') return ShutdownFn()
    if (event.target.dataset.key === 'CancelShutdown') return CancelShutdownFn()
    if (event.target.dataset.key === 'Change') return ChangeFn(event.target)
    if (["Shift", "Control", "Meta", "Alt"].includes(event.target.dataset.key) && CheckViscous.checked) return Viscous(event.target)

    console.log(event.target.dataset.key)

    let xhr = new XMLHttpRequest()
    xhr.open('post', location.href)
    xhr.setRequestHeader("Content-Type", "application/json")

    Viscous_List.push(event.target.dataset.key)

    xhr.send(JSON.stringify({
        "keys": Viscous_List
    }))
    if (Viscous_List.length > 1) ViscousFn()

    Viscous_List.length = 0
}

function ViscousFn() {
    CheckViscous.checked = !CheckViscous.checked
    if (CheckViscous.checked) document.querySelector('.Viscous').classList.add("check")
    else {
        ['Viscous', , 'Shift', 'Control', 'Meta', 'Alt'].forEach(key => {
            document.querySelector('.' + key).classList.remove("check")
        })
        Viscous_List.length = 0
    }
}

function Viscous(target) {
    if ([...target.classList].includes('check')) {
        target.classList.remove('check')
        let index = Viscous_List.indexOf(target.dataset.key)
        return Viscous_List.splice(index, 1)
    }
    target.classList.add('check')
    Viscous_List.push(target.dataset.key)
}

function ClickFn() {
    console.log("ClickFn, 发送点击事件")
    let xhr = new XMLHttpRequest()
    xhr.open('post', location.origin + "/mouse_click")
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send()
}

function ChangeFn(target) {
    if (target.parentNode.className == 'keyboard') {
        document.querySelector('.keyboard').style.display = 'none'
        document.querySelector('.control_panel').style.display = 'grid'
    }
    else if (target.parentNode.className == 'control_panel') {
        document.querySelector('.keyboard').style.display = 'grid'
        document.querySelector('.control_panel').style.display = 'none'
    }
}

function LockScreenFn() {
    console.log("LockScreenFn, 发送锁屏事件")
    let xhr = new XMLHttpRequest()
    xhr.open('post', location.origin + "/lock_screen")
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send()
}

function ShutdownFn() {
    console.log("ShutdownFn, 发送关机事件")
    let xhr = new XMLHttpRequest()
    xhr.open('post', location.origin + "/shutdown")
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send()
}

function CancelShutdownFn() {
    console.log("CancelShutdownFn, 发送取消关机事件")
    let xhr = new XMLHttpRequest()
    xhr.open('post', location.origin + "/cancel_shutdown")
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send()
}
