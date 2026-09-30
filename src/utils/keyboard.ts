type KeyboardCallback = (height: number, isShow: boolean) => void;

let callbackList: KeyboardCallback[] = [];
let preHeight = 0;


//触发回调通知所有订阅者
/**
 * 触发回调函数列表
 * @param height - 触发回调时传递的高度值
 * @param isShow - 触发回调时传递的显示状态值
 */
function trigger(height: number, isShow: boolean) {
    // 遍历回调函数列表，对每个回调函数执行调用
    callbackList.forEach((cb) => {
        // 使用当前的高度和显示状态作为参数调用回调函数
        cb(height, isShow);
    })
}

//开始监听键盘高度变化
/**
 * 监听键盘显示/隐藏的函数
 * 通过检测窗口高度和视口高度的变化来判断键盘是否显示
 */
export function watchKeyboard() {
    // 检查浏览器是否支持visualViewport API
    if(!window.visualViewport){
        return;
    }
    
    // 获取visualViewport对象
    const viewport = window.visualViewport;

    /**
     * 处理视口大小变化的事件处理函数
     * 通过比较窗口高度和视口高度计算键盘高度
     */
    function handler() {
        // 获取窗口内部高度
        const windowInnerHeight = window.innerHeight;
        // 获取视口高度，如果不存在则使用窗口内部高度
        const vpHeight = viewport.height ?? windowInnerHeight
        //键盘高度差值
        const keyboardHeight = Math.max(0, windowInnerHeight - vpHeight);
        const isShow = keyboardHeight > 50; //大于50px判断为键盘显示
        if(vpHeight !== keyboardHeight){
           preHeight = keyboardHeight;
           trigger(keyboardHeight, isShow);
        }

    }

    viewport.addEventListener('resize', handler);
}


/**
 * 注册键盘变化事件的回调函数
 * @param callback - 键盘变化时的回调函数，类型为KeyboardCallback
 */
export function onKeyboardChange(callback: KeyboardCallback) {
   // 将回调函数添加到回调函数列表中
   callbackList.push(callback)
}


/**
 * 销毁键盘监听相关的资源
 * 清理回调列表、重置高度，并移除视觉视口大小变化的事件监听器
 */
export function destroyKeyboardWatch() {
  callbackList = [] // 清空回调函数列表
  preHeight = 0 // 重置之前记录的高度为0
  // 如果存在视觉视口API，则移除其resize事件监听器
  // 注意：这里移除的是一个空函数，这可能是为了确保即使没有添加监听器也不会出错
  if (window.visualViewport) {
    window.visualViewport.removeEventListener('resize', () => {})
  }
}
