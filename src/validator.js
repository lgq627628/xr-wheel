let data = {
    email: '',
    pwd: 'fsdgfhg'
}
let rules = [{
    key: 'email',
    pattern: 'email',
    required: true
  }, {
    key: 'pwd',
    minLen: 6,
    maxlen: 10
  }]
  
  validator(data, rules)
  
  function validator(data, rules) {
      let errors = {}
      rules.forEach(rule => {
          let val = data[rule.key]
          if (rule.required) {
              let error = validator.required(val)
              if (error) {
                ensureObj(errors, rule.key)
                errors[rule.key].required = error
                return
              }
          }
          let restKeys = Object.keys(rule).filter(key => key !== 'key' && key !== 'required')
          restKeys.forEach(key => {
              if (validator[key]) {
                  let error = validator[key](val, rule.key)
                  if (error) {
                    ensureObj(errors, rule.key)
                    errors[rule.key][key] = error
                  }
              } else {
                  throw `不存在的规则：${validator[key]}`
              }
          })
      });
  }

  function ensureObj(errors, key) {
    if (errors) errors[key] = {}
  }

  validator.required = (val) => {
    if (!val && val !== 0) return '必填'
  }

  validator.maxLength = (val, max) => {
    if (val.length < max) return '超长'
  }