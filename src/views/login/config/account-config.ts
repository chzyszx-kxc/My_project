export const rules = {
  name: [
    {
      required: true,
      message: '用户名是必传内容',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z0-9]{5,10}$]/, // 通过正则表达式验证表单
      message: '用户名必须是5~10个字母或数字',
      trigger: 'blur'
    },
  ],
  password: [
    {
      require: true,
      message: '密码是必传内容',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z0-9]{3,}$/,
      message: '密码必须是3位以上的字母或数字',
      trigger: 'blur'
    }
  ]
}