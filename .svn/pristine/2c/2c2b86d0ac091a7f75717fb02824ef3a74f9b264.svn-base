export default (()=>{
    /**
     * 注入一个函数
     * 将函数注入到一个函数中，可以通过(funcName,args)的方式调用被注入的函数
     * @param {Function} injectFunc 需要被注入进去的函数
     */
    Function.prototype.inject = function(injectFunc){
        try {
            if (!window.inject) {
                window.inject = {};
            }
            let funcName = this.name.replace("bound ","");
            let injectFuncName = injectFunc.name.replace("bound ","");
            window.inject[`reflectionFunc_${funcName}`] = this;

            window[injectFuncName] = function(funcName,args){
                return window.inject[`reflectionFunc_${funcName}`](args);
            }

            return true;
        } catch (error) {
            console.log("注入函数失败,请检查参数!");
            return false;
        }
    }

    /**
     * 释放被一个被注入的函数
     */
    Function.prototype.release = function(){
        try {
            let funcName = this.name.replace("bound ","");
            return delete window.inject[`reflectionFunc_${funcName}`];
        } catch (error) {
            console.log("函数注入释放失败!请确定函数释放被注入!");
        }
    }
})();