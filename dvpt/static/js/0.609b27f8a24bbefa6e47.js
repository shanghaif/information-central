webpackJsonp([0],{Cdx3:function(t,e,a){var n=a("sB3e"),i=a("lktj");a("uqUo")("keys",function(){return function(t){return i(n(t))}})},MnZ5:function(t,e,a){t.exports=a.p+"static/img/指纹密码刷卡门禁机.c46a249.jpg"},Vf5R:function(t,e){},fZjL:function(t,e,a){t.exports={default:a("jFbC"),__esModule:!0}},jFbC:function(t,e,a){a("Cdx3"),t.exports=a("FeBl").Object.keys},raP7:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("fZjL"),i=a.n(n),s=[{title:"名称",dataIndex:"DisplayName",align:"center",width:"50%"},{title:"描述",dataIndex:"Desc",align:"center",width:"50%"}],o=[{title:"DisplayName",dataIndex:"DisplayName",align:"center",width:"25%"},{title:"TechnicalAddress",dataIndex:"TechnicalAddress",align:"center",width:"25%"},{title:"Location",dataIndex:"Location",align:"center",width:"25%"},{title:"TPType",dataIndex:"TPType",align:"center",width:"50%"}],c={name:"forthwith-monitor",data:function(){return{data:[],menu:[],eqType:"",eqName:"",pointInfo:[],pointVal:[],columns:s,columns2:o,dataSource:[],dataSource2:[],popWarning:[],imgUrl:"",commStatus:{Value:"",Time:""},loading:!1,collapsed:!1,rootSubmenuKeys:[],openKeys:[]}},mounted:function(){this.init()},methods:{popConfirm:function(t){console.log(t)},popCancel:function(t){console.log(t)},init:function(){var t=this;this.getEquipments().then(function(e){t.data=e,console.log(t.data),t.menu=t.unique(t.data),console.log(t.menu),t.eqType=t.menu[0],t.changeMenu(t.eqType)})},unique:function(t){for(var e=this,n=[],i={},s=function(s){if(console.log(t[s].Description),i[t[s].Code])n.forEach(function(e){e.Code==t[s].Code&&e.Equipments.push(t[s])});else{var o="";switch(t[s].Description){case"多功能传感器1":o=a("z1ri");break;case"风冷行级精密空调":o=a("ZQRS");break;case"配电柜输入":o=a("cl24");break;case"配电柜输出":o=a("8h8+");break;case"水浸传感器":o=a("+XYQ");break;case"LED灯":o=a("Yzwu");break;case"半高型rPDU":o=a("Oshm");break;case"灯光告警器":o=a("bhA+");break;case"机房":o=a("NqJq");break;case"门禁":o=a("bqq0");break;case"门禁执行器":o=a("ZgOF");break;case"全高型rPDU":o=a("iVqc");break;case"摄像机":o=a("CTBw");break;case"天窗执行器":o=a("ool2");break;case"网络硬盘刻录机":o=a("Vqfg");break;case"一体化机房":o=a("ix3Y");break;case"指纹密码刷卡门禁机":o=a("MnZ5")}var c={Code:t[s].Code,DisplayName:t[s].Description,Equipments:[],ImgUrl:o};c.Equipments.push(t[s]),n.push(c),e.rootSubmenuKeys.push(t[s].Code),i[t[s].Code]=!0}},o=0;o<t.length;o++)s(o);return this.openKeys.push(this.rootSubmenuKeys[0]),n},changeMenu:function(t){this.eqType=t,this.imgUrl=this.eqType.ImgUrl,this.eqName=this.eqType.Equipments[0].Name,this.changeTab(this.eqName)},changeTab:function(t){this.eqName=t,this.initPoint()},initPoint:function(){var t=this;this.getPointInformations(this.eqName).then(function(e){console.log(e),0==e.length&&t.$message.error("暂无数据");var a=[];t.pointInfo=e,t.pointInfo.forEach(function(t){a.push({Id:t.EntityId})}),t.getPointValues(a).then(function(e){console.log(e),t.pointVal=e,t.initPage()})})},initPage:function(){var t=this,e=[];this.popWarning=[];for(var a=0;a<this.pointInfo.length;a++)if(this.pointInfo[a]){var n=this.pointInfo[a].DisplayName;-1==n.indexOf("只读")&&-1==n.indexOf("读构建")&&function(){var s="";if(t.pointVal[a])if(t.pointVal[a].st.ib)s="坏点";else{var o=t.pointVal[a].t;if("String"==o?s=t.pointVal[a].s:"Long"==o&&(s=t.pointVal[a].l),""!=t.pointInfo[a].MeaningOfValue){var c=JSON.parse(t.pointInfo[a].MeaningOfValue);i()(c).forEach(function(t){t==s&&(s=c[t])})}""!=t.pointInfo[a].UnitOfMeasurement&&(s+=t.pointInfo[a].UnitOfMeasurement),t.pointVal[a].st.ia&&t.popWarning.push({DisplayName:n,Desc:s}),"通信状态"==n&&(t.commStatus.Value=s,t.commStatus.Time=t.$common.timestampToTime(t.pointVal[a].ti))}else"通信状态"==n&&(t.commStatus.Value="暂无数据",t.commStatus.Time="暂无数据");e.push({DisplayName:n,Desc:s})}()}this.dataSource=e},toggleCollapsed:function(){this.collapsed=!this.collapsed},onOpenChange:function(t){var e=this,a=t.find(function(t){return-1===e.openKeys.indexOf(t)});-1===this.rootSubmenuKeys.indexOf(a)?this.openKeys=t:this.openKeys=a?[a]:[]},getEquipments:function(){return this.$http.get(this.$api.monitorEquipments).then(function(t){if(t.data.value)return t.data.value})},getPointInformations:function(t){var e="/config/pointinformations?&$filter=indexof(Name,'"+t+"') ge 0";return this.$http.get(e).then(function(t){if(t.data.value)return t.data.value})},getPointValues:function(t){return this.$http.post("/point/api/getpoint/getpointvalues",t).then(function(t){if(t.data)return t.data})},getPointValue:function(t){return this.$http.post("/point/api/getpoint/getpointvalue",t).then(function(t){if(t.data)return t.data})}}},r={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"forthwith-monitor"},[n("div",{staticClass:"control-module"},[n("div",{staticClass:"select-menu"},[n("a-menu",{attrs:{mode:"inline",theme:"dark",defaultSelectedKeys:[t.menu[0].Code]}},[t._l(t.menu,function(e){return[n("a-menu-item",{key:e.Code,on:{click:function(a){return t.changeMenu(e)}}},[n("span",[t._v(t._s(e.DisplayName))])])]})],2)],1),t._v(" "),n("div",{staticClass:"show-area"},[n("div",{staticClass:"select-taps"},[[n("a-tabs",{attrs:{defaultActiveKey:"2"},on:{change:t.changeTab}},[t._l(t.eqType.Equipments,function(t){return[n("a-tab-pane",{key:t.Name,attrs:{tab:t.DisplayName}})]}),t._v(" "),n("a",{staticStyle:{"margin-right":"20px"},attrs:{slot:"tabBarExtraContent"},slot:"tabBarExtraContent"},[n("a-badge",{attrs:{dot:"",count:t.popWarning.length}},[n("a-popover",{attrs:{title:"告警提示",trigger:"click",placement:"leftBottom"}},[n("template",{slot:"content"},t._l(t.popWarning,function(e){return n("p",[n("span",[t._v(t._s(e.DisplayName))]),t._v("\n                      ：\n                      "),n("span",{},[t._v(t._s(e.Desc))])])}),0),t._v(" "),n("a-button",{attrs:{type:"primary"}},[n("a-icon",{attrs:{type:"notification"}})],1)],2)],1)],1)],2)]],2),t._v(" "),n("div",{staticClass:"select-container"},[n("a-carousel",{attrs:{arrows:""},scopedSlots:t._u([{key:"prevArrow",fn:function(t){return n("div",{staticClass:"custom-slick-arrow",staticStyle:{left:"10px",zIndex:"1"}},[n("a-icon",{attrs:{type:"left-circle"}})],1)}},{key:"nextArrow",fn:function(t){return n("div",{staticClass:"custom-slick-arrow",staticStyle:{right:"10px"}},[n("a-icon",{attrs:{type:"right-circle"}})],1)}}])},[t._v(" "),t._v(" "),n("div",[n("div",{staticClass:"select-container-bg"}),t._v(" "),n("div",{staticClass:"select-container-module",attrs:{id:"basicInfo"}},[n("div",{staticClass:"boxes"},[n("div",{staticClass:"equipment",style:{backgroundImage:"url("+t.imgUrl+")"}})]),t._v(" "),n("div",{staticClass:"boxes"},[n("div",{staticClass:"pointInfo"},[n("a-table",{staticClass:"flipInX",attrs:{columns:t.columns,dataSource:t.dataSource,showHeader:!1,pagination:!1,loading:t.loading}})],1)])])]),t._v(" "),n("div",[n("div",{staticClass:"select-container-bg"}),t._v(" "),n("div",{staticClass:"select-container-module",attrs:{id:"KPI"}},[n("div",{staticClass:"boxes"},[n("img",{staticClass:"boxes-bg",attrs:{src:a("W2do"),alt:""}}),t._v(" "),n("div",{staticClass:"boxes-cont"},[n("div",{staticClass:"borde"},[t._v("能量流图")]),t._v(" "),n("div",{staticClass:"pointStatus-ti"},[t._v("\n                    2019年12月19日 09:31:31\n\n                  ")]),t._v(" "),n("div",{staticClass:"energy"},[n("img",{attrs:{src:a("FBg+"),alt:""}})])])]),t._v(" "),n("div",{staticClass:"boxes"},[n("img",{staticClass:"boxes-bg",attrs:{src:a("W2do"),alt:""}}),t._v(" "),n("div",{staticClass:"boxes-cont"},[n("div",{staticClass:"borde"},[t._v("通信状态")]),t._v(" "),n("div",{staticClass:"pointStatus-ti"},[t._v("\n                    "+t._s(t.commStatus.Time)+"\n\n                  ")]),t._v(" "),n("div",{staticClass:"electricity"},[n("div",{staticClass:"status"},[t._v("\n                      "+t._s(t.commStatus.Value)+"\n                    ")])])])]),t._v(" "),n("div",{staticClass:"boxes",staticStyle:{width:"100%"}},[n("img",{staticClass:"boxes-bg",staticStyle:{width:"95%",left:"2.5%"},attrs:{src:a("W2do"),alt:""}}),t._v(" "),n("div",{staticClass:"boxes-cont"},[n("div",{staticClass:"borde"},[t._v("电池后备时间")]),t._v(" "),n("div",{staticClass:"pointStatus-ti"},[t._v("\n                    2019年12月19日 09:31:31\n\n                  ")]),t._v(" "),n("div",{staticClass:"battery"},[n("a-table",{attrs:{columns:t.columns2,dataSource:t.dataSource2,showHeader:!0,pagination:!1,loading:t.loading}})],1)])])])])])],1)])])])},staticRenderFns:[]};var l=a("VU/8")(c,r,!1,function(t){a("Vf5R")},"data-v-3bd3977c",null);e.default=l.exports},uqUo:function(t,e,a){var n=a("kM2E"),i=a("FeBl"),s=a("S82l");t.exports=function(t,e){var a=(i.Object||{})[t]||Object[t],o={};o[t]=e(a),n(n.S+n.F*s(function(){a(1)}),"Object",o)}}});
//# sourceMappingURL=0.609b27f8a24bbefa6e47.js.map