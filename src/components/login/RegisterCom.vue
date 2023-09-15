<template>
  <div>
    <van-form validate-first @submit="Register">
      <van-field
        v-model="UserName"
        label="用户名"
        placeholder="用户名"
        :rules="[
          {
            validator: UserNameReg,
            message: '用户名不规范(需包含字母和数字,字母开头,5-10位)',
          },
        ]"
      />
      <van-field
        v-model="PassWord"
        label="密码"
        placeholder="密码"
        type="password"
        :rules="[
          {
            validator: PassWordReg,
            message: '密码格式错误(含有字母，数字，5-15位)',
          },
        ]"
      />
      <!-- 确认密码 -->
      <van-field
        v-model="RePassWord"
        label="确认密码"
        placeholder="确认密码"
        type="password"
        :rules="[{ validator: RePassWordReg, message: '两次密码不一致' }]"
      />
      <!-- 选择头像 -->
      <van-field name="uploader" label="选择头像">
        <template #input>
          <van-uploader v-model="uploader" :max-count="1" />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >注册</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { GetUserMsg, GreateUser } from "@/utils/server";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      UserName: "",
      PassWord: "",
      RePassWord: "",
      uploader: [{ url: "https://img01.yzcdn.cn/vant/leaf.jpg" }],
      user_img: "",
    };
  },
  methods: {
    ...mapMutations(["GetUserInfo_vm"]),
    UserNameReg(val) {
      return /^[a-z]+[a-z0-9]{4,9}$/i.test(val);
    },
    PassWordReg(val) {
      return /^[a-z0-9]{5,15}$/i.test(val);
    },
    RePassWordReg() {
      return this.RePassWord == this.PassWord;
    },
    async Register() {
      if (this.uploader[0]) {
        // 有头像信息
        if (this.uploader[0].url) {
          // 默认头像
          this.user_img = this.uploader[0].url;
        } else if (this.uploader[0].content) {
          this.user_img = this.uploader[0].content;
        }
      } else {
        this.user_img = "";
      }
      // console.log("begin Register");
      let res = await GetUserMsg({
        username: btoa(this.UserName),
      });
      if (res.data.length) {
        this.$toast.fail("注册失败！该用户已注册");
      } else {
        // console.log("can create");
        // 可以注册
        let res = await GreateUser({
          username: btoa(this.UserName),
          password: btoa(this.PassWord),
          user_img: this.user_img,
        });
        // console.log(res.data);
        sessionStorage.setItem(
          "userinfo",
          JSON.stringify({
            userid: res.data.id,
            username: atob(res.data.username),
            password: res.data.password,
            user_img: res.data.user_img,
          })
        );
        // vuex记录用户信息
        this.GetUserInfo_vm();
        this.$toast.loading({
          message: "注册成功，正在跳转",
          forbidClick: true,
          duration: 1000,
        });
        setTimeout(() => {
          // console.log(this.$route.params);
          this.$emit("Jump");
        }, 1000);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
