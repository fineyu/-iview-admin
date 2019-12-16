import AsyncValidator from "async-validator";
import iView from 'iview';

export default (() => {
    /**
     * 修复Select组件的可搜索（filterable）在搜索选中后
     * 背景灰色永远是查询后选择的游标值bug
     * @override
     */
    iView.Select.methods.processOption = function processOption(option, values, isFocused) {
        if (!option.componentOptions) return option;
        const optionValue = option.componentOptions.propsData.value;
        const disabled = option.componentOptions.propsData.disabled;
        const isSelected = values.includes(optionValue);
        const propsData = {
            ...option.componentOptions.propsData,
            selected: isSelected,
            isFocused: isSelected,
            disabled: typeof disabled === 'undefined' ? false : disabled !== false,
        };
        return {
            ...option,
            componentOptions: {
                ...option.componentOptions,
                propsData: propsData
            }
        };
    }

    /**
     * 实现FormItem的prop的requied功能
     * 自动生成必填message
     * @override
     */
    iView.FormItem.methods.validate = function validate(trigger, callback = function () { }) {
        let rules = this.getFilteredRule(trigger);
        if (!rules || rules.length === 0) {
            if (!this.required) {
                callback();
                return true;
            } else {
                rules = [{ required: true }];
            }
        }
        this.validateState = "validating";
        let descriptor = {};
        descriptor[this.prop] = rules;
        var cn = {
            required: `${this.label} 必填!`
        };
        const validator = new AsyncValidator(descriptor);
        validator.messages(cn);
        let model = {};
        model[this.prop] = this.fieldValue;
        validator.validate(model, { firstFields: true }, errors => {
            this.validateState = !errors ? "success" : "error";
            this.validateMessage = errors ? errors[0].message.replace(this.prop, "") : "";
            callback(this.validateMessage);
        });
        this.validateDisabled = false;
    }

    /**
     * 修复FormItem组件在使用validateProvider，又将prop的requied设为true时
     * 会导致无法触发change时验证的问题
     * @override
     */
    iView.FormItem.methods.setRules = function setRules() {
        let rules = this.getRules();
        if (rules.length && !this.required) {
            return;
        } else if (rules.length) {
            rules.every((rule) => {
                this.isRequired = rule.required;
            });
        } else if (this.required) {
            this.isRequired = this.required;
        }
        this.$off('on-form-blur', this.onFieldBlur);
        this.$off('on-form-change', this.onFieldChange);
        this.$on('on-form-blur', this.onFieldBlur);
        this.$on('on-form-change', this.onFieldChange);
    }
})()