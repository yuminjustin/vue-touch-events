# vue-touch-events
这是一个Vue插件，提供了常用的几个事件: tap,longTap, swipeUp,swipeDown,swipeLeft,swipeRight,swipe,drag<br/>
##Use
       
    import Touch from 'vue-touch-events'
    Vue.use(Touch)
	 
	 /*script*/
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
	/*template*/ 
	<div id="app">
        <div class="block" v-touch.preventDefault='true' @tap="tapCb" @longtap="longTapCb" @swipeup="swipeupCb" @swipedown="swipedownCb"
            @swipeleft="swipeleftCb" @swiperight="swiperightCb" @swipe="swipeCb" @drag="dragCb">
            {{msg}}
        </div>
    </div>
	
preventDefault 禁止浏览器事件 默认是不开启的
