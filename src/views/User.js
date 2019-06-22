export default {
  data () {
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
      if (!value) {
        return callback(new Error('电话号码不能为空'))
      }
      setTimeout(() => {
        // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
        // 所以我就在前面加了一个+实现隐式转换

        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (phoneReg.test(value)) {
            callback()
          } else {
            callback(new Error('电话号码格式不正确'))
          }
        }
      }, 100)
    }
    return {
      addUserRules: {
        userName: { required: true, message: '请输入用户名', trigger: 'blur' },
        password: { required: true, message: '请输入密码', trigger: 'blur' },
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ]

      },
      searchKey: '',
      dialogVisible: true,
      userList: [],
      addUserForm: {
        userName: '',
        password: '',
        email: '',
        mobile: ''
      },
      total: 0,
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      }
    }
  },
  async created () {
    let { data: res } = await this.axios.get('/users', {
      params: this.queryInfo
    })
    if (res.meta.status !== 200) this.$message.error('用户记录获取失败')
    this.userList = res.data.users
    this.total = res.data.total
  },
  methods: {
    // 获取用户列表
    async getList () {
      let { data: res } = await this.axios.get('/users', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) this.$message.error('用户记录获取失败')
      this.userList = res.data.users
      this.total = res.data.total
    },
    handleSizeChange (val) {
      // 当选择每页显示用户数量是激活
      this.queryInfo.pagesize = val
      this.getList()
    },
    handleCurrentChange (val) {
      // 当选择进入页面时
      this.queryInfo.pagenum = val
      this.getList()
    },
    async stateChange (val, row) {
      let { data: res } = await this.axios.put(`users/${row.id}/state/${val}`)
      // 涉及到传值与传值基础
      // 所有row只能传一个对象 ,因为js中对象的传递时传址
      if (res.meta.status !== 200) {
        this.$message.error('状态修改失败')
        setTimeout(() => {
          row.mg_state = !row.mg_state
        }, 500)
      } else {
        this.$message.success('状态修改成功')
      }
    }
  },
  // 通过监听器监听搜索框里输入的值,当值发生改变的时候就自动深度监听
  watch: {
    queryInfo: {
      deep: true,
      // 对象一改变，handler 函数就会被调用了
      handler () {
        this.getList()
      }
    }
  }
}
