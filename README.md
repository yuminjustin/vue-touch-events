# vue-touch-events
This is a plugin for Vuejs, it offer these events<br/>
**tap,longtap, swipeup,swipedown,swipeleft,swiperight,swipe,drag**

## Use
     import Touch from 'vue-touch-events'
     Vue.use(Touch)
	
In Vue component you can bind these touch events just like a normally click event

## template

    <div>
        <div class="block" v-touch.preventDefault @tap="tapCb" @longtap="longTapCb" @swipeup="swipeupCb" @swipedown="swipedownCb" @swipeleft="swipeleftCb" @swiperight="swiperightCb" @swipe="swipeCb">
            {{msg}}
        </div>
        <div class="block2" v-touch.preventDefault.drag @drag="dragCb">
            {{msg2}}
        </div>
    </div>

## script 

    new Vue({
	   el: "#app",
	   methods: {
		tapCb: ...,
		longTapCb: ...,
		swipeupCb: ...,
		swipedownCb: ...,
		swipeleftCb: ...,
		swiperightCb: ...,
		swipeCb: ...,
		dragCb: ...
	  }
    }) 

## config 

**preventDefault**<br/>

Prohibit browser swipe events, just like UC or QQBrowser has  their own swipe events, so sometimes we have to close it.<br/>
Default is not<br/>

**drag**<br/>

This dom could be dragged ,default it's can't. Drag event can't coexist with other touch events


## run this example
    npm install	

install webpack and Vue

    npm run dev

open index.html in your browser

## install in your project

    npm install vue-touch-events -S

## SSR 
   
    if (process.BROWSER_BUILD) {
      Vue.use(require('vue-touch-events'));
    }
   
use it only in browser
