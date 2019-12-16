export default (() => {
    /**
     * 钩住一个函数
     * 被钩住的函数被执行时会先执行钩子函数，然后再执行自身
     * @param {Function} hookFunc 钩子函数
     * @param {Object} context 原函数的作用域
     */
    Function.prototype.hook = function (hookFunc, context) {
        try {
            let funcName = this.name.replace("bound ", "");
            //将原函数重命名并保存起来
            context[`realFunc_${funcName}`] = this;

            if (context[funcName].prototype && context[funcName].prototype.isHooked) {
                console.log(`${funcName}已被Hook,请先UnHook!`);
                return false;
            }

            //修改原函数的函数体
            context[funcName] = function () {
                //获取参数
                let args = [funcName, [...arguments]];
                //执行钩子函数
                hookFunc.apply(this, args);
                //执行原函数并返回结果
                return context[`realFunc_${funcName}`].apply(this, args);
            };

            //由于函数名无法动态创建
            //所以需要动态的去修改函数名，也就是修改Function.prototype.name的值
            Object.defineProperty(context[funcName], "name", { value: funcName });
            context[funcName].prototype.isHooked = true;
            return true;
        } catch (error) {
            console.log("Hook失败,请检查参数");
            return false;
        }
    }

    /**
     * 解开一个函数的钩子
     * @param {Object} context 原函数的作用域
     */
    Function.prototype.unhook = function (context) {
        let funcName = this.name;

        if (!context[funcName].prototype.isHooked) {
            console.log(`${funcName}没有被Hook,无需UnHook!`);
            return false;
        }

        //将原函数恢复
        context[funcName] = context[`realFunc_${funcName}`];
        //删除原函数的备份
        delete context[`realFunc_${funcName}`];
        return true;
    }
})();