<template>
  <div class="video-set-module">
    <div class="video-area">
      <div class="video-area-0">
        <div class="video-content-0">
          <!--<video id="myPlayer"
                 width="500px"
                 height="350px"
                 src="ezopen://open.ys7.com/D14931813/1.live"
                 autoplay controls playsInline webkit-playsinLine></video>-->
          <!--<iframe src="https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/D14931813/2.live&autoplay=1&accessToken=at.0trb40gkdhomm5yn5aj3zfnb017vs7n5-4g2kk8g8lx-14k1r6k-ckuvbxzfy"-->
          <iframe :src="ysUrl.ysUrl_0"
                  width="640" height="430" id="ysOpenDevice" allowfullscreen></iframe>
        </div>
        <div class="video-content-1">
          <!--<iframe src="https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/D14931813/3.live&autoplay=1&accessToken=at.0trb40gkdhomm5yn5aj3zfnb017vs7n5-4g2kk8g8lx-14k1r6k-ckuvbxzfy"-->
          <iframe :src="ysUrl.ysUrl_1"
                  width="640" height="430" id="ysOpenDevice-1" allowfullscreen>
          </iframe>
        </div>
      </div>

      <div class="video-area-1">
        <div class="video-content-2">
          <!--<iframe src="https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/D14931813/4.live&autoplay=1&accessToken=at.0trb40gkdhomm5yn5aj3zfnb017vs7n5-4g2kk8g8lx-14k1r6k-ckuvbxzfy"-->
          <iframe :src="ysUrl.ysUrl_2"
                  width="640" height="430" id="ysOpenDevice-2" allowfullscreen></iframe>
        </div>
        <div class="video-content-3">
          <!--<iframe src="https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/D14931813/5.live&autoplay=1&accessToken=at.0trb40gkdhomm5yn5aj3zfnb017vs7n5-4g2kk8g8lx-14k1r6k-ckuvbxzfy"-->
          <iframe :src="ysUrl.ysUrl_3"
                  width="640" height="430" id="ysOpenDevice-3" allowfullscreen></iframe>
        </div>
        <div class="video-content"></div>
      </div>
    </div>

    <div class="control">
      <div class="the-first-area">
        <div class="area-title">
          <div class="area-title-font">设备信息</div>
        </div>
        <div class="video-status">
          <video-information
            :access-token="accessTokenIn"
            @chooseChannel="chooseChannel"></video-information>
        </div>
      </div>

      <div class="the-second-area">
        <div class="area-title">
          <div class="area-title-font">监控预览</div>
        </div>
        <div class="video-status">
          <video-setting @changeAlarmMode="changeAlarmMode"></video-setting>
        </div>
      </div>

      <div class="the-third-area">
        <div class="area-title">
          <div class="area-title-font">监控告警</div>
        </div>
        <div class="video-status">
          <div class="video-alarm-content">
            <a-table :columns="columnVideo"
                     :loading="loadingFlag"
                     :dataSource="tableListVideo"
                     :pagination="paginationVideo"
                     size="small">
            </a-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // 不用再额外引入
  // import {EZUIKit} from '../../../../static/ezuikit'
  // 引入外部组件
  import VideoInformation from "../menu-module-components/video-information";
  import VideoSetting from "../menu-module-components/video-setting";
  export default {
    components: {VideoSetting, VideoInformation},
    data () {
      return {
        columnVideo: [
          {
            title: '序号',
            dataIndex: 'alarmId',
            align: 'center',
            // sorter: true,
            width: '10%',
            // scopedSlots: { customRender: 'name' }
          },
          {
            title: '告警类型',
            dataIndex: 'alarmType',
            align: 'center',
            width: '10%'
          },
          {
            title: '告警时间',
            dataIndex: 'alarmTime',
            align: 'center',
            width: '10%'
          },
          {
            title: '告警名称',
            dataIndex: 'alarmName',
            align: 'center',
            width: '10%'
          }
        ],
        loadingFlag: false,
        tableListVideo: [],
        paginationVideo: {
          current: 1,
          defaultCurrent: 1,
          defaultPageSize: 4,
          total: 0
        },
        player: '',
        // 视频长宽 - 根据显示台数改变
        videoWidth: 600,
        videoHeight: 400,
        url: process.env.NODE_ENV === "development" ? "/api" : "http://open.ys7.com",
        // 动态获取 accessToken，拼接 url
        ysUrl: {
          ysUrl_0: '',
          ysUrl_1: '',
          ysUrl_2: '',
          ysUrl_3: '',
        },
        accessTokenIn: '',
        testAccessToken: 'at.9fj5sml0bare3yy7cmx92sc75ki05r5d-3gmhe8sy91-04uffq3-sudrfzy6g',
        // 设备信息，由于部分 API 请求会自动转换请求方式，所有需要用到的数据写死
        deviceData: {
          deviceSerial: "D14931813", // 设备序列号
          deviceVersion: "V3.4.103 build 181128", // 版本号
          deviceModel: "DS-7808NB-K1/C", // 设备型号
        },
        // API HTTPS 自动转换 get 为 post 的问题，直接使用设备列表
        deviceList: {
          deviceSerial: "D14931813",
          deviceName: "DS-7808NB-K1/C(D14931813)",
          deviceType: "DS-7808NB-K1/C",
          status: 1,
          defence: 0,
          deviceVersion: "V3.4.103 build 181128",
          addTime: 1578127170000,
          parentCategory: "COMMON"
        }
      }
    },

    // 在组件挂载前就必须拿到 token
    created () {
      this.getAccessTokenIn();
      // 延迟获取设备信息列表
      setTimeout(() => {
        // this.checkDeviceList()
      }, 2000)
    },

    mounted () {
      // 优先获取 accessToken 用于调用其他萤石官方 API
      // this.player = new EZUIKit.EZUIPlayer('myPlayer');
      // 挂载完成在获取 DOM 节点操作视频组件
      let player = document.getElementById("ysOpenDevice").contentWindow;
      let player_1 = document.getElementById("ysOpenDevice-1").contentWindow;
      let player_2 = document.getElementById("ysOpenDevice-2").contentWindow;
      let player_3 = document.getElementById("ysOpenDevice-3").contentWindow;
      // console.log("current env:" + process.env.NODE_ENV);
      this.loadingFlag = true;
      setTimeout(() => {
        this.loadingFlag = false;
        setInterval(() => {
          this.loadingFlag = true;
          setTimeout(() => {
            this.loadingFlag = false;
          }, 2000)
        }, 7000)
      }, 2500)
    },

    methods: {
      /**
       * @function 选择通道
       */
      chooseChannel (key) {
        // get store
        console.log("current channel number:", key)
      },
      // 获取通道信息
      checkDeviceList () {
        const that = this;
        let param = new FormData;
        param.append("accessToken", that.accessTokenIn);
        param.append("deviceSerial", that.deviceSerial);
        this.$axios.post("/api/lapp/device/camera/list", param)
          .then(res => {
            if (res.data) {
              console.log("获取设备通道信息：", res)
            }
          })
      },

      /**
       * @function 获取 ys 平台连接视频的 token
       */
      getAccessTokenIn () {
        const that = this;
        console.log("current environment url:", process.env.API_PORT);
        /**
         * @exception 跨域：dev env 使用本地代理，prod env 使用 nginx 代理
         * @solve 请求时不加 IP，则自动访问 localhost，build 后由 nginx 增加属性 location /api/ { proxy_pass http://url } 转发以 /api/ 开头的请求
         * @type {FormData}
         */
        let param = new FormData();
        param.append('appKey', '31b9d2360c7845ecaff4870f68e10b20');
        param.append('appSecret', '2b54e82f434c0667299b130f4d85e3f9');
        // 使用原生 axios 访问 localhost 模拟 server 解决浏览器同源访问限制
        const url = process.env.NODE_ENV === "development" ? "/api" : "http://open.ys7.com";
        this.$axios.post(url + "/api/lapp/token/get", param)
          .then(res => {
            // console.log(res);
            if (res.data.code === "200") {
              const token = res.data.data.accessToken,
                ysUrl = "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/D14931813/",
                tokenString = ".live&autoplay=1&accessToken=" + token;
              that.ysUrl.ysUrl_0 = ysUrl + "2" + tokenString;
              that.ysUrl.ysUrl_1 = ysUrl + "3" + tokenString;
              that.ysUrl.ysUrl_2 = ysUrl + "4" + tokenString;
              that.ysUrl.ysUrl_3 = ysUrl + "5" + tokenString;
              // 使用获取的 accessToken 去获取设备列表
              // that.getCameraList(token);
              that.$common.setCookie("ysAccessToken", token, 6 * 24 * 60);
            } else {
              // 如果请求失败则使用 cookie 中缓存的 token
              console.log("get token in cookie.");
              const token = that.$common.getCookie("ysAccessToken"),
                ysUrl = "https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/D14931813/",
                tokenString = ".live&autoplay=1&accessToken=" + token;
              that.ysUrl.ysUrl_0 = ysUrl + "2" + tokenString;
              that.ysUrl.ysUrl_1 = ysUrl + "3" + tokenString;
              that.ysUrl.ysUrl_2 = ysUrl + "4" + tokenString;
              that.ysUrl.ysUrl_3 = ysUrl + "5" + tokenString;
            }
          })
          .catch(err => {
            console.log(err);
          })
      },

      /**
       * @function
       * @exception 目前不能在 web 中使用的 API {deviceList, deviceInfo, cameraList}
       */
      getCameraList (token) {
        const that = this;
        let param = new FormData;
        param.append('accessToken', token);
        this.$axios.post(that.url + "/api/lapp/camera/list", param)
          .then(res => {
            console.log("device list:", res)
          })
          .catch(err => {
            console.log("come error throw:", err)
          })
      },

      /**
       * @function 改变设备报警模式
       */
      changeAlarmMode (key) {
        const that = this;
        console.log("当前选择：", key);
        switch (key) {
          case "1":
            this.$message.info("当前模式为短叫。");
            break;
          case "2":
            this.$message.info("当前模式为长叫。");
            break;
          case "3":
            this.$message.info("当前模式为静音。");
            break;
        }
      }
    }
  }
</script>

<style scoped>
  .video-area-0, .video-area-1 {
    display: flex;
    flex-direction: row;
  }

  .video-set-module {
    display: flex;
    flex-direction: row;
  }

  .control {
    display: flex;
    flex-direction: column;
  }

  .the-first-area, .the-second-area, .the-third-area {
    width: 560px;
    height: 290px;
    color: #fff;
    margin: 0 0 20px 28px;
    border-radius: 10px;
    box-shadow: 0 0 35px rgba(0, 204, 255, 1) inset;
  }

  .area-title {
    height: 50px;
    width: 100%;
    display: flex;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 204, 255, 1) inset;
  }

  .area-title-font {
    font-size: 22px;
    margin: 5px 0 0 10px;
  }

  .video-alarm-content {
    padding: 0 13px 0 13px;
  }
</style>
