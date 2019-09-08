class Validator {
    constructor() {
    }
    static addRule (name, fn) { // 全局添加新规则
        // 这边的 this 和下面的不同
        // this[name] = fn
        Validator.prototype[name] = fn
    }
    validate(data, rules) {
        let errors = {}
        rules.forEach(rule => {
            let val = data[rule.key]
            if (rule.required) {
                let error = this.required(val)
                if (error) {
                    this.setDefaultObj(errors, rule.key)
                    errors[rule.key] = error
                    return
                }
            }
            let restKeys = Object.keys(rule).filter(key => key !== 'key' && key !== 'required');
            restKeys.forEach(restKey => {
                if (this[restKey]) {
                    let error = this[restKey](val, rule[restKey])
                    if (error) {
                        this.setDefaultObj(errors, rule.key)
                        errors[rule.key][restKey] = error
                    }
                } else {
                    throw `${restKey} 规则不存在`
                }
            })
        });
        console.log(errors)
    }
    required (val) {
        if (!val && val !== 0) {
            return '必填'
        }
    }
    pattern (val, pattern) { // pattern 可以是用户自定义的正则也可以是内置的
        if (pattern === 'phone') {
            if(!/^1\d{10}$/.test(val)) {
                return '手机格式错误'
            }
        } else if(!pattern.test(val)) {
            return '手机格式错误'
        }
    }
    minLen (val, minLen) {
        if (val.length < minLen) {
            return '太短啦'
        }
    }
    maxLen (val, maxLen) {
        if (val.length > maxLen) {
            return '太长啦'
        }
    }
    setDefaultObj (obj, key) {
        obj[key] = obj[key] || {}
    }
}

// 数据大概长这样
let data = {
    name: 'xxx',
    phone: '138xxxxxxxx'
}
// 规则大概长这样
let rules = [{
    key: 'name',
    required: true,
    minLen: 6,
    maxLen: 10
}, {
    key: 'phone',
    pattern: 'phone'
}]

let validator = new Validator()
validator.validate(data, rules)
