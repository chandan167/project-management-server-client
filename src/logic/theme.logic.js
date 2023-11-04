import { effect, signal } from "@preact/signals-react";


const themeMode = signal(localStorage.getItem('themeMode') || 'light')

export class ThemeSignal{
    constructor(){
        effect(() =>{
            if(themeMode.value){
                localStorage.setItem('themeMode', themeMode.value)
            }
        })
    }

    toggleTheme(){
        if(themeMode.value == 'light'){
            themeMode.value = 'dark'
        }else{
            themeMode.value = 'light'
        }
    }

    get getTheme(){
        return themeMode.value
    }
}

const themeSignal = new ThemeSignal();
Object.freeze(themeSignal);

export default themeSignal;