<template>
    <div>
      <div class="load-icon" v-show="loadSymbol">
        <a-spin class="load-img" size="large" />
      </div>
      <div class="video-information">
        <tr>
          <th height="45" width="132"><div class="status-title"><div>硬盘状态</div></div></th>
          <th height="45" width="132">
            <div class="status-menu"><div>正常</div></div>
          </th>
          <th height="45" width="132"><div class="status-title"><div>硬盘数量</div></div></th>
          <th height="45" width="132">
            <div class="status-menu"><div>一个硬盘</div></div>
          </th>
        </tr>
        <tr>
          <th height="45" width="132"><div class="status-title"><div>隐私状态</div></div></th>
          <td height="45" width="132">
            <div class="status-menu"><div>隐私关闭</div></div>
          </td>
          <td height="45" width="132"></td>
          <td height="45" width="132">
            <!--<div class="status-menu"></div>-->
          </td>
        </tr>
      </div>

      <div class="channel-area">
        <tr>
          <th height="45" width="132"><div class="status-title"><div>选择通道</div></div></th>
          <th height="45" width="130">
            <a-dropdown>
              <a-menu slot="overlay" @click="handleMenuClick">
                <a-menu-item key="1"><a-icon type="play-circle" />视频1</a-menu-item>
                <a-menu-item key="2"><a-icon type="play-circle" />视频2</a-menu-item>
                <a-menu-item key="3"><a-icon type="play-circle" />视频3</a-menu-item>
                <a-menu-item key="4"><a-icon type="play-circle" />视频4</a-menu-item>
                <a-menu-item key="5"><a-icon type="play-circle" />视频5</a-menu-item>
                <a-menu-item key="6"><a-icon type="play-circle" />视频6</a-menu-item>
                <a-menu-item key="7"><a-icon type="play-circle" />视频7</a-menu-item>
                <a-menu-item key="8"><a-icon type="play-circle" />视频8</a-menu-item>
              </a-menu>
              <a-button style="margin-left: 8px"> {{channelNum}} <a-icon type="down" /> </a-button>
            </a-dropdown>
          </th>
          <th width="132"><div class="status-title"><div>窗口个数</div></div></th>
          <th width="130">
            <a-dropdown>
              <a-menu slot="overlay" @click="handleMenuClickForWindow">
                <a-menu-item key="1"><a-icon type="play-circle" />1 X 1</a-menu-item>
                <a-menu-item key="2"><a-icon type="play-circle" />2 X 2</a-menu-item>
              </a-menu>
              <a-button style="margin-left: 8px"> {{windowNumber}} <a-icon type="down" /> </a-button>
            </a-dropdown>
          </th>
        </tr>
        <tr>
          <td height="45" width="132"><div class="status-title"><div>运行状态</div></div></td>
          <td><div class="status-menu"><div>在线</div></div></td>
          <td><div class="status-title"><div>视频质量</div></div></td>
          <td><div class="status-menu"><div>流畅</div></div></td>
        </tr>
      </div>
      <!--<div class="video-information" id="video-information-1" style="width: 90%;height: 105px"></div>-->
    </div>
</template>

<script>
    export default {
        name: "video-information",
      // 父组件传值
      props: ["accessToken"],
      data () {
          return {
            loadSymbol: false,
            deviceSerial: 'D14931813',
            channelNum: '视频1',
            windowNumber: '2 X 2'
          }
      },

      // 是否需要一个监听属性
      watch: {
        accessToken: function (val) {
          console.log("transfer the token:", val);
          this.accessToken = val;
        }
      },

      created () {
          // this.loadSymbol = true;
          // this.getDeviceStatus();
      },

      mounted () {
        // this.loadSymbol = true;
      },

      methods: {
          // 更改窗口个数
        handleMenuClickForWindow (e) {
          // console.log("选择了窗口个数：", e);
          const key = e.key;
          switch (key) {
            case "2":
              this.windowNumber = "2 X 2";
              break;
            default:
              this.windowNumber = "1 X 1";
              break;
          }
        },
          // 设置通道
        handleMenuClick (e) {
          // console.log("选择了通道：", e);
          const key = e.key;
          switch (key) {
            case "1":
              this.channelNum = "视频1";
              this.$emit("chooseChannel", key);
              break;
            case "2":
              this.channelNum = "视频2";
              this.$emit("chooseChannel", key);
              break;
            case "3":
              this.channelNum = "视频3";
              this.$emit("chooseChannel", key);
              break;
            case "4":
              this.channelNum = "视频4";
              this.$emit("chooseChannel", key);
              break;
            case "5":
              this.channelNum = "视频5";
              this.$emit("chooseChannel", key);
              break;
            case "6":
              this.channelNum = "视频6";
              this.$emit("chooseChannel", key);
              break;
            case "7":
              this.channelNum = "视频7";
              this.$emit("chooseChannel", key);
              break;
            case "8":
              this.channelNum = "视频8";
              this.$emit("chooseChannel", key);
              break;
            default:
              return;
          }
        }
      }
    }
</script>

<style scoped>

  .video-information {
    color: #fff;
    margin-top: 8px;
  }

  .status-title {
    font-size: 25px;
    /*padding-top: 10px;*/
    margin-left: 20px;
    display: flex;
  }

  .status-title div {}

.status-menu {
  text-align: center;
  font-size: 18px;
  width: 100%;
  height: 32px;
  color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 204, 255, 1) inset;
}

  .channel-area {
    margin: 10px 0 0 0;
  }
</style>
