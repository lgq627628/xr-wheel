function validate(data, rules) {
    let errors = {};  // 有错误的话放这里面
    rules.forEach(rule => {
        let val = data[rule.key]
        if (rule.required) {
            if (!val && val !== 0) {
                setDefaultObj(errors, rule.key)
                errors[rule.key].required = '必填'
                return
            }
        }
        if (rule.pattern) {
            if (rule.pattern === 'phone') {
                if(!/^1\d{10}$/.test(val)) {
                    setDefaultObj(errors, rule.key)
                    errors[rule.key].pattern = '手机格式错误'
                }
            }
        }
        if (rule.minLen) {
            if (val.length < rule.minLen) {
                setDefaultObj(errors, rule.key)
                errors[rule.key].minLen = '太短啦'
            }
        }
        if (rule.maxLen) {
            if (val.length > rule.maxLen) {
                setDefaultObj(errors, rule.key)
                errors[rule.key].maxLen = '太长啦'
            }
        }
        console.log(errors)
    });
}
function setDefaultObj(obj, key) { // 确保是个对象
    obj[key] = obj[key] || {}
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
    maxlen: 10
}, {
    key: 'phone',
    pattern: 'phone'
}]
// 错误信息大概长这样
let errors = {
    name: {
        required: '必填',
        minLen: '太短了',
        maxLen: '太长了'
    },
    phone: {
        pattern: '手机格式不对'
    }
}
validate(data, rules)