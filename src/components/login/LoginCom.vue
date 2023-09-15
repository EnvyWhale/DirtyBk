<template>
  <div>
    <van-form validate-first @submit="Login">
      <!-- 通过 pattern 进行正则校验 -->
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
      <!-- 通过 passwordReg 进行函数校验 -->
      <van-field
        v-model="PassWord"
        label="密码"
        placeholder="密码"
        type="password"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登陆</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { GetUserMsg } from "@/utils/server";
import { mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      UserName: "",
      PassWord: "",
    };
  },
  methods: {
    ...mapMutations(["GetUserInfo_vm"]),
    ...mapActions("AddressStore", ["GetUserAddressList_va"]),
    UserNameReg(val) {
      return /^[a-z]+[a-z0-9]{4,9}$/i.test(val);
    },
    async Login() {
      let res = await GetUserMsg({
        username: btoa(this.UserName),
      });
      //   console.log(res);
      if (res.data.length == 0) {
        this.$toast.fail("该用户未注册");
      } else {
        // 已注册，发请求验证是否密码正确
        let res = await GetUserMsg({
          username: btoa(this.UserName),
          password: btoa(this.PassWord),
        });
        if (res.data.length) {
          // 登陆成功
          // 本地记录用户登陆状态
          sessionStorage.setItem(
            "userinfo",
            JSON.stringify({
              userid: res.data[0].id,
              username: atob(res.data[0].username),
              password: res.data[0].password,
              user_img: res.data[0].user_img,
            })
          );
          // vuex记录用户信息
          this.GetUserInfo_vm();
          this.GetUserAddressList_va();
          this.$toast.loading({
            message: "登陆成功，正在跳转",
            forbidClick: true,
            duration: 1000,
          });
          setTimeout(() => {
            // console.log(this.$route.params);
            this.$emit("Jump");
          }, 1000);
        } else {
          this.$toast.fail("密码错误");
        }
      }
      // console.log("begin login");
    },
  },
};
</script>

<style lang="scss" scoped></style>
