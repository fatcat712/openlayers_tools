import Vue from 'vue';

function throttle(func, wait) {
    typeof wait === "undefined" ? wait = 500 : null;
    let timer = null,
        previous = 0;
    return function proxy(...params) {
        let now = new Date(),
            remaining = wait - (now - previous);
        if (remaining <= 0) {
            // 立即执行
            clearTimeout(timer);
            timer = null;
            previous = now;
            func.call(this, ...params);
        } else if (!timer) {
            timer = setTimeout(() => {
                clearTimeout(timer);
                timer = null;
                previous = new Date();
                func.call(this, ...params);
            }, remaining);
        }
    };
}
// 'v-input-throttle'
Vue.directive('input-throttle', {
    bind: function(el, binding) {
        let [func, wait = 500] = binding.value;
        el.addEventListener('input', throttle(func, wait));
    }
});