<template>
  <div>
    <van-nav-bar
      title="地址选择"
      left-text="返回订单"
      left-arrow
      @click-left="Jump"
    />
    <!-- 地址列表 -->
    <div v-if="!addnew && !edit">
      <van-address-list
        v-model="chosenAddressId"
        :list="UserAddressList"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      />
      <van-button
        v-if="this.UserAddressList.length"
        class="choseaddress"
        color="#7232dd"
        plain
        @click="SelectThisAddress"
        >选择该地址</van-button
      >
    </div>
    <!-- 地址新增 -->
    <div v-if="addnew">
      <van-address-edit
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        :address-info="EditAddress"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
      />
    </div>
    <!-- 地址修改 -->
    <div v-if="edit">
      <van-address-edit
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        :address-info="EditAddress"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
      />
    </div>
  </div>
</template>

<script>
import { NavBarMixin } from "@/utils/key_navbar";
import { areaList } from "@vant/area-data";
import {
  QueryUserAddress,
  AddUserAddress,
  UpdateUserAddress,
} from "@/utils/server/address";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  mixins: [NavBarMixin],
  data() {
    return {
      areaList,
      EditAddress: {},
      edit: false,
      // 地址编辑所需要的信息
      // 点击编辑的index
      editindex: 0,
      addnew: false,
      // 用户选择的地址index
      chosenAddressId:0
    };
  },
  methods: {
    ...mapMutations("AddressStore", [
      "SelectAddress",
      "UpdateUserAddress_vm",
      "AddUserAddress_vm",
    ]),
    ...mapActions("AddressStore", [
      "DeleteUserAddress_va",
      "GetUserAddressList_va",
    ]),
    onAdd() {
      this.addnew = true;
    },
    onEdit(item) {
      this.EditAddress = item;
      this.editindex = item.id;
      this.edit = true;
    },
    Jump() {
      this.$router.push("/pay");
    },
    SelectThisAddress() {
      this.SelectAddress(
        this.UserAddressList.filter((item) => item.id == this.chosenAddressId)[0]
      );
      this.$router.push("/pay");
    },
    // 地址编辑或新增部分
    async onSave(content) {
      // 新增
      if (this.addnew) {
        // console.log("用户新增地址");
        // 勾选默认
        if (content.isDefault) {
          //检查用户是否已经有了默认地址
          let res2 = await QueryUserAddress({
            userid: this.$store.state.userinfo.userid,
            isDefault: true,
          });
          // 有默认地址，先修改默认地址的isDefault
          if (res2.data.length) {
            //有默认地址
            let existInfo = res2.data[0];
            //更新数据库
            let res=await UpdateUserAddress(existInfo.id, {
              isDefault: false,
            });
            //同步更新vant中对应地址信息
            console.log(res.data);
            this.UpdateUserAddress_vm(res.data);

            // 更新完旧的默认地址后，进行添加新地址
          } 
        }
        // 没有勾选默认，直接新增
            //地址的新增
            let res = await AddUserAddress({
              ...content,
              userid: this.$store.state.userinfo.userid,
            })
        //同步vuex
            this.AddUserAddress_vm(res.data);
      }
      // 修改
      if (this.edit) {
        // console.log("用户点击修改按钮");
          //检查用户是否勾选默认
         if (content.isDefault) {
          let res2 = await QueryUserAddress({
            userid: this.$store.state.userinfo.userid,
            isDefault: true,
          });
          // 有默认地址，先修改默认地址的isDefault
          if (res2.data.length) {
            //有默认地址
            let existInfo = res2.data[0];
            //更新数据库
            let res=await UpdateUserAddress(existInfo.id, {
              isDefault: false,
            });
            //同步更新vant中对应地址信息
            this.UpdateUserAddress_vm(res.data);
            // 更新完旧的默认地址后，进行添加新地址
          } 
        }
        // 通过地址id修改数据库
        await UpdateUserAddress(this.editindex, {
          ...content,
        });
        //同步修改vuex中的地址信息
        this.UpdateUserAddress_vm(content);
      }
      this.addnew = false;
      this.edit = false;
    },
    onDelete(item) {
      // on confirm
      // 删除地址信息
      this.DeleteUserAddress_va(item.id);
      this.edit = false;
      // on cancel
      this.addnew = false;
      // 重置编辑对象内容
      this.EditAddress={}
    },
  },
  computed: {
    // 引入vuex中用户列表
    ...mapState("AddressStore", ["UserAddressList"]),
    // 选中的index
   
  },
  created() {
      if (this.UserAddressList.length) {
        let DefaultItem = this.UserAddressList.filter(
          (item) => item.isDefault
        )[0];
        if (DefaultItem) {
          this.chosenAddressId= DefaultItem.id;
        } else {
         this.chosenAddressId=this.UserAddressList[0].id;
        }
      } 
  },
  watch: {
    UserAddressList() {
       if (this.UserAddressList.length) {
        let DefaultItem = this.UserAddressList.filter(
          (item) => item.isDefault
        )[0];
        if (DefaultItem) {
          this.chosenAddressId= DefaultItem.id;
        } else {
         this.chosenAddressId=this.UserAddressList[0].id;
        }
      } 
    }
  }
};
</script>

<style lang="scss" scoped></style>
