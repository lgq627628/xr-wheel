class Validator {
  constructor() {}

  // 静态方法：相当于 Validator.add = fn，属于构造函数上的方法 
  static add (name, fn) {
    Validator.prototype[name] = fn
  }

  validate(data, rules) {
    let errors = {}
    rules.forEach(rule => {
        let val = data[rule.key]
        if (rule.required) {
            let error = this.required(val)
            if (error) {
              this.ensureObj(errors, rule.key)
              errors[rule.key].required = error
              return
            }
        }
        let restKeys = Object.keys(rule).filter(key => key !== 'key' && key !== 'required')
        restKeys.forEach(key => {
            if (this[key]) {
                let error = this[key](val, rule.key)
                if (error) {
                  this.ensureObj(errors, rule.key)
                  errors[rule.key][key] = error
                }
            } else {
                throw `不存在的规则：${this[key]}`
            }
        })
    });
  }

  ensureObj(errors, key) {
    if (errors) errors[key] = {}
  }
  required (val) {
    if (!val && val !== 0) return '必填'
  }
  maxLength (val, max) {
    if (val.length < max) return '超长'
  }
}

export default Validator