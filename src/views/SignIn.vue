<template>
  <div class="signin">
    <TopHead title="商铺签到">
      <div slot="r" @click="submitSign">
        <span><i class="icon iconfont icon-duihao"></i></span>
      </div>
    </TopHead>
    <input @change="uploadImg" type="file" accept="image/*" class="input-file" ref="file">
    <div class="img-box-wrap">
      <ImgBtn @click="$refs.file.click()" class="img-box" :isred="false" iconclass="icon-xiangji" val="拍摄照片"></ImgBtn>
      <div @click="img.checked = !img.checked " v-for="img in imgs" class="img-box" :key="img.url">
        <div v-if="img.checked" class="check-hover"><i class="icon iconfont icon-duihao"></i></div>
        <img :src="img.url" width="100%" height="100%">
      </div>
      <ImgBtn @click="removeImg" class="img-box" :isred="true" iconclass="icon-shanchudange" val="删除照片"></ImgBtn>
    </div>
  </div>
</template>

<script>
import ImgBtn from '../components/ImgBtn';
import service from '../service';
import canvasResize from 'canvas-resize';
import Utility from '../common/Utility';
import { Toast } from 'mint-ui';
// console.log(process.env.VUE_APP_BASEURL);
export default {
  name: 'signin',
  data() {
    return {
      imgs: []
    };
  },
  components: {
    ImgBtn
  },
  created() {},
  methods: {
    submitSign() {
      console.log(this.$route.params.id);
      service
        .submitSigin({
          id: Date.now(),
          shopId: this.$route.params.id,
          SubOn: new Date().toLocaleDateString(),
          imgs: this.imgs.map(item => item.url)
        })
        .then(() => {
          Toast({
            message: '签到成功！',
            position: 'middle',
            duration: 2000
          });
        })
        .catch(() => {
          Toast({
            message: '签到失败！',
            position: 'middle',
            duration: 2000
          });
        });
    },
    removeImg() {
      this.imgs = this.imgs.filter(item => item.checked === false);
    },
    uploadImg() {
      // console.log(this.$refs.file.files[0]);
      let formData = new FormData();
      // 拿到当前上传的图片
      let file = this.$refs.file.files[0];
      // 对当前上传的图片file，进行压缩后，callback返回一个base64的字符串
      canvasResize(file, {
        crop: false, // 裁剪参数
        quality: 0.7, // 压缩率， 0-1
        rotate: 0, // 是否旋转
        callback: baseStr => {
          // 返回的base64字符， 转换成Blob
          let fileBlob = Utility.convertBase64UrlToBlob(baseStr, {
            type: file.type
          });
          formData.append('imgF', fileBlob);
          service
            .uploadImg(formData)
            .then(res => {
              console.log(res);
              this.imgs.push({
                checked: false,
                url: `${process.env.VUE_APP_BASEURL}${res.data.img}`
              });
            })
            .catch(() => {
              console.log('上传失败！');
            });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
i {
  font-size: px2rem(28);
}
.signin {
  height: 100%;
  background-color: #fff;
  .input-file {
    height: 0;
    width: 0;
    position: absolute;
    visibility: hidden;
  }
  .check-hover {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(125, 125, 125, 0.5);
    i {
      position: absolute;
      right: px2rem(28);
      top: px2rem(28);
      font-size: px2rem(28);
      color: red;
    }
  }
}
.img-box-wrap {
  padding: px2rem(28);
  padding-bottom: 0;
  overflow: hidden;
  .img-box {
    border: px2rem(1) solid #ccc;
    height: px2rem(220);
    width: px2rem(220);
    box-sizing: border-box;
    float: left;
    margin-right: px2rem(11);
    margin-bottom: px2rem(28);
    position: relative;
  }
  .img-box:nth-chlid(3n) {
    margin-right: 0;
  }
}
</style>
