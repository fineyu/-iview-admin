import store from '@/store'
/**
 * 创建唯一标识
 */
const newGuid = () => {
    const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    return `${S4()}${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`;
}

/**
 * 数组去重
 * @param {Array} arry
 */
const uniq = (arry) => {
    return [...new Set(arry)];
}

/**
 * 求数组交集
 * @param {Array} a
 * @param {Array} b
 */
const intersection = (a, b) => {
    return [...new Set(a.filter(v => new Set(b).has(v)))];
}

/**
 * 求数组并集
 * @param {Array} a
 * @param {Array} b
 */
const union = (a, b) => {
    return [...new Set(a.concat(b))];
}

/**
 * 求数组差集
 * @param {Array} a
 * @param {Array} b
 */
const difference = (a, b) => {
    return a.concat(b).filter(v => !a.includes(v) || !b.includes(v));
}


/**
 * 将数组转换为树形数组
 * @param {Array} data 原数组
 * @param {String} searchKey 记录父节点标识的键名
 */
const toTree = (data, searchKey = "parentId") => {
    if (!Array.isArray(data)) return [];

    let result = []
    data.forEach(item => {
        delete item.children;
    });
    let hash = new Map();
    data.forEach(item => {
        hash.set(item.id, item);
    });
    data.forEach(item => {
        if (hash.has(item[searchKey])) {
            let parent = hash.get(item[searchKey]);
            (parent.children || (parent.children = [])).push(item);
        } else {
            result.push(item);
        }
    });
    return result;
}

/**
 * 递归查询
 * @param {*} obj 查询对象
 * @param {Function} predicate 搜索条件
 */
const recursiveSearch = (obj, predicate) => {
    if (!(predicate instanceof Function)) {
        throw new TypeError("递归查询的搜索条件必须是一个函数!用于检查是否满足条件的函数");
    }

    for (let item in obj) {
        let element = obj[item];
        if (element) {
            if (predicate(element)) {
                return element;
            } else if (element instanceof Object) {
                let recursive = recursiveSearch(element, predicate)
                if (recursive) return recursive;
            }
        }
    }
}

/**
 * 递归查询(异步)
 * @param {*} obj 查询对象
 * @param {Function} predicate 搜索条件
 */
const recursiveSearchAsync = async (obj, predicate) => {
    if (!(predicate instanceof Function)) {
        throw new TypeError("递归查询的搜索条件必须是一个函数!用于检查是否满足条件的函数");
    }

    for (let item in obj) {
        let element = obj[item];
        if (element) {
            if (predicate(element)) {
                return element;
            } else if (element instanceof Object) {
                let recursive = await recursiveSearchAsync(element, predicate)
                if (recursive) return recursive;
            }
        }
    }
}

/**
 * 将Date对象转换为yyyy-MM-dd HH:mm:ss格式
 * @param {Date} date
 * @param {Boolean} withoutTime
 */
const dateFormat = (date = new Date(), withoutTime = true) => {
    const innerFormat = (date) => {
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const strDate = date.getDate().toString().padStart(2, '0');
        if (withoutTime) {
            return `${date.getFullYear()}-${month}-${strDate}`;
        } else {
            return `${date.getFullYear()}-${month}-${strDate} ${date.getHours().toString().padStart(2,'0')}:${date.getMinutes().toString().padStart(2,'0')}:${date.getSeconds().toString().padStart(2,'0')}`;
        }
    }

    if (date instanceof Date) {
        return innerFormat(date);
    } else if (typeof date === "string") {
        let innerDate = new Date(date);
        return innerFormat(innerDate);
    }
}


/**
 * 将Date对象转换为yyyyMMddHHmmss格式
 * @param {Date} date
 */
const createDateId = (date = new Date()) => {
    const innerFormat = (date) => {
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const strDate = date.getDate().toString().padStart(2, '0');
        return `${date.getFullYear()}${month}${strDate}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
    }

    if (date instanceof Date) {
        return innerFormat(date);
    } else if (typeof date === "string") {
        let innerDate = new Date(date);
        return innerFormat(innerDate);
    }
}

/**
 * 深拷贝
 * @param {*} obj 要拷贝的对象
 */
const deepClone = (obj, hash = new WeakMap()) => { //递归拷贝
    if (obj instanceof RegExp) return new RegExp(obj);
    if (obj instanceof Date) return new Date(obj);
    if (obj === null || typeof obj !== 'object') {
        //如果不是复杂数据类型，直接返回
        return obj;
    }
    if (hash.has(obj)) {
        return hash.get(obj);
    }
    /**
     * 如果obj是数组，那么 obj.constructor 是 [Function: Array]
     * 如果obj是对象，那么 obj.constructor 是 [Function: Object]
     */
    let t = new obj.constructor();
    hash.set(obj, t);
    for (let key in obj) {
        //如果 obj[key] 是复杂数据类型，递归
        if (obj.hasOwnProperty(key)) {//是否是自身的属性
            if (obj[key] && typeof obj[key] === 'object') {
                t[key] = deepClone(obj[key], hash);
            } else {
                t[key] = obj[key];
            }
        }
    }
    return t;
}

/**
 * 防抖函数
 * @param {Function} func
 * @param {Number} wait
 * @param {Boolean} immediate
 */
const debounce = (func, wait, immediate = true) => {
    let timer;
    // 延迟执行函数
    const later = (context, args) => setTimeout(() => {
        timer = null;// 倒计时结束
        if (!immediate) {
            func.apply(context, args);
            //执行回调
            context = args = null;
        }
    }, wait);
    let debounced = function (...params) {
        let context = this;
        let args = params;
        if (!timer) {
            timer = later(context, args);
            if (immediate) {
                //立即执行
                func.apply(context, args);
            }
        } else {
            clearTimeout(timer);
            //函数在每个等待时延的结束被调用
            timer = later(context, args);
        }
    }
    debounced.cancel = function () {
        clearTimeout(timer);
        timer = null;
    };
    return debounced;
};

/**
 * 节流函数
 * @param {Function} func
 * @param {Number} wait
 * @param {Object} options
 */
const throttle = (func, wait, options) => {
    let timeout, context, args, result;
    let previous = 0;
    if (!options) options = {};

    const later = () => {
        previous = options.leading === false ? 0 : Date.now() || new Date().getTime();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };

    let throttled = function () {
        let now = Date.now() || new Date().getTime();
        if (!previous && options.leading === false) previous = now;
        let remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            // 判断是否设置了定时器和 trailing
            timeout = setTimeout(later, remaining);
        }
        return result;
    };

    throttled.cancel = function () {
        clearTimeout(timeout);
        previous = 0;
        timeout = context = args = null;
    };

    return throttled;
}

const regExpMap = new Map
    ([
        ['联系电话', /^1((3[\d])|(4[5,6,7,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[\d])|(9[1,8,9]))\d{8}$/],//根据工信部2019年最新公布的手机号段
        ['座机电话', /\d{3}-\d{8}|\d{4}-\d{7}/],//如: 0341-86091234
        ['身份证', /(^\d{8}(0\d|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/],
        ['帐号', /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/],//字母开头，允许5-16字节，允许字母数字下划线组合
        ['纯中文', /^[\u4E00-\u9FA5]+$/],
        ['小数', /^\d+\.\d+$/],
        ['数字', /^\d{1,}$/],
        ['QQ号', /^[1-9][0-9]{4,10}$/],
        ['微信号', /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/],
        ['纯英文', /^[a-zA-Z]+$/],
        ['密码强度', /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/],//最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
        ['URL', /^((https?|ftp|file):\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/\w\.-]*)*\/?/],
        ['IPv4地址', /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/],
        ['16进制颜色', /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/],
        ['邮政编码', /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/],
        ['Email', /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/],
    ]);

/**
 * 验证生成器
 * @param {String} key 
 * @param {Boolean} required
 * @param {String} message 
 */
const validateProvider = (key, required = false, message = "") => {
    let regExp = regExpMap.get(key);
    if (!regExp) throw new Error("没有找到对应的正则规则");

    const validator = (rule, value, callback) => {
        if (regExp.test(value)) {
            callback();
        } else {
            callback(new Error(!message ? `请输入正确的${key}!` : message));
        }
    }
    let result = [{ validator }];
    if (required) {
        result.unshift({ required: true, trigger: 'change' })
    }

    return result;
}


/**
 * 根据字典类型获取类型值
 * @param {Array} dicData 字典类型 dic_data : [{name:"军衔",data:[]},]
 */
const getDicByCodeName = (dicData) => {
    dicData.forEach(element => {
        element.data = store.state.dic.dic.get(element.name);
    });
    console.log(dicData,"dicData");
}
/**
 * 获取指定字典类型值的文本
 * @param {String} codeName 字典类型
 * @param {String} values 字典类型的值"001,002,003"
 */
const getTextByValue = (codeName, values) => {
    if (typeof values !== "string") {
        console.warn(`${values}不是一个字符串`);
        return "--";
    }
    let hash = store.state.dic.dic;
    let codeItems = null;
    if (hash.has(codeName)) {
        codeItems = hash.get(codeName)
    } else {
        console.warn(`没有找到字典类型：${codeName}`);
        return "--";
    }
    let arr = [];
    values.split(",").forEach(element => {

        if (codeItems.has(element)) {
            arr.push(codeItems.get(element));
        } else {
            console.warn(`没有找到字典值：${element}!`);
        }
    });
    return arr.toString();
}

/**
 * 比较两个数组中的内容是否一致
 * @param {Array} array1 
 * @param {Array} array2 
 */
const arrayEquals = (array1, array2) => {
    if (array1 instanceof Array && array2 instanceof Array) {
        if (array1.length !== array2.length) {
            return false;
        }

        for (let i = 0; i < array1.length; i++) {
            if (array1[i] instanceof Array && array2[i] instanceof Array) {
                return arrayEquals(array1[i], array2[i]);
            } else if (array1[i] !== array2[i]) {
                return false;
            }
        }

        return true;
    } else {
        console.warn("请检查参数，类型是否是个数组");
    }
}

const HEPLER = {
    newGuid,
    uniq,
    intersection,
    union,
    difference,
    toTree,
    recursiveSearch,
    recursiveSearchAsync,
    dateFormat,
    deepClone,
    debounce,
    throttle,
    validateProvider,
    getDicByCodeName,
    getTextByValue,
    arrayEquals,
    createDateId
}

export default HEPLER;