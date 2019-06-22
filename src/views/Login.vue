    <template>
  <div class="login">
    <div class="login-box">
      <img src="../assets/logo.png" alt>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" @keyup.enter.native="loginSubmit">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            placeholder="密码"
           ></el-input>
        </el-form-item>
        <div class="button">
          <el-button @click="loginSubmit" type="primary">登录</el-button>
          <el-button @click="loginReplace">重置</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请请输入用户名称', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    loginSubmit () {
      this.$refs.loginForm.validate(async ok => {
        if (ok) {
          // 验证成功 可以进行异步传输
          const { data: res } = await this.axios.post('/login', this.loginForm)
          if (res.meta.status !== 200) { return this.$message.error('用户名或密码错误') }
          sessionStorage.setItem('token', res.data.token)

          console.log('set=====' + res.data.token)
          this.$router.push('/')
        }
      })
    },
    loginReplace () {
      this.loginForm = {}
    }
  }
}
</script>

    <style>

.login {
  background-color: #294a69;
  height: 100%;
  width: 100%;
}
.login-box {
  width: 450px;
  height: 304px;
  background-color: #fff;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.login-box img {
  background-color: #eee;
  border: #fff 5px solid;
  box-shadow: 0 0 10px #ccc;
  width: 120px;
  height: 120px;
  border-radius: 100px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
}
.login-box .el-form {
  width: 100%;
  padding: 35px 20px 10px 20px;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  text-align: right;
}

.login-box .el-input {
  margin-bottom: 15px;
}

.login-box .el-form .button {
  display: flex;
  justify-content: center;
}
</style>
