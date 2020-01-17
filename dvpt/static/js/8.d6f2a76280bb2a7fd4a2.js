webpackJsonp([8],{ho4S:function(t,a){},slvs:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=e("woOf"),r=e.n(i),n={name:"current-alarm",components:{AFormItem:e("SWcn").a},data:function(){var t=this;return{alarmTime:"9019-10-09 09:09",noticeContent:"注意防范",searchAlarm:{},loading:!1,isShowDrawer:!1,pagination:{current:1,defaultCurrent:1,defaultPageSize:18,total:0,size:"large",onChange:function(a){return t.changePage(a)}},drawerForm:{},remarks:"",column:[{title:"报警名称",dataIndex:"AlarmName",align:"center",width:"8%"},{title:"报警级别",dataIndex:"AlarmLevel",align:"center",width:40},{title:"报警类型",dataIndex:"AlarmType",align:"center",width:40},{title:"报警详情",dataIndex:"AlarmDescription",align:"center",width:"15%"},{title:"报警时间",dataIndex:"AlarmDateTime",align:"center",width:"15%"},{title:"设备标识",dataIndex:"EquipmentId",align:"center",width:40},{title:"报警点标识",dataIndex:"PointId",align:"center",width:40},{title:"报警状态",dataIndex:"AlarmStatus",align:"center",width:"10%"},{title:"操 作",align:"center",width:"15%",scopedSlots:{customRender:"operation"}}],tableList:[],tableListContainer:[],alarmNameCurrent:"",condition:{alarmName:""}}},beforeCreate:function(){this.form=this.$form.createForm(this,{name:"advanced_search"})},mounted:function(){this.initTable()},methods:{initTable:function(){var t=this,a=this;this.pagination.current=1,this.loading=!0,this.form.validateFields(function(e,i){e||a.$http.get(a.$api.getAlarmForPagination).then(function(e){if(200===e.status){var i=e.data.value,r=a.pagination.defaultPageSize;a.pagination.total=i.length;for(var n=0;n<r;n++)i[n].AlarmDateTime=a.$common.timestampToTime(i[n].AlarmDateTime),i[n].AlarmStatus='"Unprocessed"'===i[n].AlarmStatus?"处理中":"未处理",i[n].AlarmLevel=i[n].AlarmLevel.Name,a.tableList.push(i[n])}t.loading=!1})})},searchForAlarm:function(t){var a=this,e=this;this.tableList=[],this.tableListContainer=[],this.pagination.current=1,this.loading=!0,this.$http.get(e.$api.getAlarmForPagination).then(function(t){if(200===t.status){var i=[];t.data.value.forEach(function(t,a){t.AlarmDateTime=e.$common.timestampToTime(t.AlarmDateTime),t.AlarmStatus="Unprocessed"===t.AlarmStatus?"未处理":"处理中",t.AlarmLevel=t.AlarmLevel.Name,""!==e.alarmNameCurrent?t.AlarmName.includes(e.alarmNameCurrent)&&(e.tableList.push(t),i.push(t),e.tableListContainer=i):e.tableList.push(t)}),e.pagination.total=e.tableList.length}a.loading=!1})},changePage:function(t){this.pagination.current=t,""!==this.alarmNameCurrent?this.handlePageForCondition(t):this.callbackPageChange(t)},callbackPageChange:function(t){var a=this,e=this;this.loading=!0,this.tableList=[],this.pagination.current=t;var i=this.pagination.defaultPageSize;this.tableList.length;this.$http.get(e.$api.getAlarmForPagination+"&$top="+i+"&$skip="+(t-1)*i).then(function(t){if(200===t.status){var i=[];t.data.value.forEach(function(t,a){t.AlarmDateTime=e.$common.timestampToTime(t.AlarmDateTime),t.AlarmStatus="Unprocessed"===t.AlarmStatus?"未处理":"处理中",t.AlarmLevel=t.AlarmLevel.Name,i.push(t)}),e.tableList=i}a.loading=!1})},handlePageForCondition:function(t){this.loading=!0;var a=this;this.$http.get(a.$api.getAlarmForPagination).then(function(t){if(200===t.status){var e=[];t.data.value.forEach(function(t,i){t.AlarmDateTime=a.$common.timestampToTime(t.AlarmDateTime),t.AlarmStatus="Unprocessed"===t.AlarmStatus?"未处理":"处理中",t.AlarmLevel=t.AlarmLevel.Name,t.AlarmName.includes(a.alarmNameCurrent)&&e.push(t)}),a.tableList=e}}),this.loading=!1},exportAlarm:function(){},onClose:function(){this.isShowDrawer=!1},sureAlarm:function(t){this.drawerForm=r()({},t),this.isShowDrawer=!0},submitRemarks:function(t){var a=this,e=(this.remarks,this),i=this.drawerForm.Id;this.$http.post(e.$api.confirmAlarm+"?key="+i).then(function(t){console.log(t),200===t.status&&t.data===i&&e.$info({title:"提示",content:"确认成功！",onOk:function(){}}),a.isShowDrawer=!1})}}},s={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"current-alarm"},[e("div",{staticClass:"search-condition"},[e("a-form",{attrs:{layout:"inline",form:t.form},on:{submit:t.searchForAlarm}},[e("a-form-item",{attrs:{label:"报警名称："}},[e("a-input",{attrs:{placeholder:"报警名称"},model:{value:t.alarmNameCurrent,callback:function(a){t.alarmNameCurrent=a},expression:"alarmNameCurrent"}})],1),t._v(" "),e("a-form-item",[e("a-button",{attrs:{type:"primary",icon:"search","html-type":"submit"}},[t._v("搜索")])],1),t._v(" "),e("a-form-item",[e("a-button",{attrs:{type:"primary",icon:"form"},on:{click:t.exportAlarm}},[t._v("导出")])],1)],1)],1),t._v(" "),e("div",{staticClass:"the-drawer-of-alarm"},[e("a-drawer",{attrs:{title:"确认报警",width:720,visible:t.isShowDrawer,wrapStyle:{height:"calc(100% - 108px)",overflow:"auto",paddingBottom:"108px"}},on:{close:t.onClose}},[e("div",{staticClass:"chosen-alarm"},[e("tr",[e("th",{attrs:{width:"150",height:"35"}},[t._v("报警名称")]),t._v(" "),e("th",{attrs:{width:"190",height:"35"}},[t._v(t._s(t.drawerForm.AlarmName))])]),t._v(" "),e("tr",[e("th",{attrs:{width:"150",height:"35"}},[t._v("报警级别")]),t._v(" "),e("th",{attrs:{width:"190",height:"35"}},[t._v(t._s(t.drawerForm.AlarmLevel))])]),t._v(" "),e("tr",[e("th",{attrs:{width:"150",height:"35"}},[t._v("报警类型")]),t._v(" "),e("th",{attrs:{width:"190",height:"35"}},[t._v(t._s(t.drawerForm.AlarmType))])]),t._v(" "),e("tr",[e("th",{attrs:{width:"150",height:"35"}},[t._v("报警详情")]),t._v(" "),e("th",{attrs:{width:"190",height:"35"}},[t._v(t._s(t.drawerForm.AlarmDescription))])]),t._v(" "),e("tr",[e("th",{attrs:{width:"150",height:"35"}},[t._v("报警时间")]),t._v(" "),e("th",{attrs:{width:"190",height:"35"}},[t._v(t._s(t.drawerForm.AlarmDateTime))])]),t._v(" "),e("tr",[e("th",{attrs:{width:"150",height:"35"}},[t._v("设备标识")]),t._v(" "),e("th",{attrs:{width:"190",height:"35"}},[t._v(t._s(t.drawerForm.EquipmentId))])]),t._v(" "),e("tr",[e("th",{attrs:{width:"150",height:"35"}},[t._v("报警点标识")]),t._v(" "),e("th",{attrs:{width:"190",height:"35"}},[t._v(t._s(t.drawerForm.PointId))])]),t._v(" "),e("tr",[e("th",{attrs:{width:"150",height:"35"}},[t._v("报警状态")]),t._v(" "),e("th",{attrs:{width:"190",height:"35"}},[t._v(t._s(t.drawerForm.AlarmStatus))])]),t._v(" "),e("tr",[e("th",{attrs:{width:"150",height:"35"}},[t._v("备注")]),t._v(" "),e("th",{attrs:{width:"190",height:"35"}},[e("a-input",{model:{value:t.remarks,callback:function(a){t.remarks=a},expression:"remarks"}})],1)])]),t._v(" "),e("div",{staticClass:"time-line"},[e("a-timeline",[e("a-timeline-item",[t._v(t._s(t.alarmTime)+" "+t._s(t.noticeContent))]),t._v(" "),e("a-timeline-item",[t._v(t._s(t.alarmTime)+" "+t._s(t.noticeContent))]),t._v(" "),e("a-timeline-item",[t._v(t._s(t.alarmTime)+" "+t._s(t.noticeContent))]),t._v(" "),e("a-timeline-item",[t._v(t._s(t.alarmTime)+" "+t._s(t.noticeContent))]),t._v(" "),e("a-timeline-item",[t._v(t._s(t.alarmTime)+" "+t._s(t.noticeContent))]),t._v(" "),e("a-timeline-item",[t._v(t._s(t.alarmTime)+" "+t._s(t.noticeContent))]),t._v(" "),e("a-timeline-item",[t._v(t._s(t.alarmTime)+" "+t._s(t.noticeContent))])],1)],1),t._v(" "),e("div",{style:{position:"absolute",left:0,bottom:0,width:"100%",borderTop:"1px solid #e9e9e9",padding:"10px 16px",background:"#fff",textAlign:"right"}},[e("a-button",{style:{marginRight:"8px"},on:{click:t.onClose}},[t._v("\n          关闭\n        ")]),t._v(" "),e("a-button",{attrs:{type:"primary"},on:{click:t.submitRemarks}},[t._v("确认")])],1)])],1),t._v(" "),e("div",{staticClass:"table"},[e("a-table",{attrs:{columns:t.column,loading:t.loading,pagination:t.pagination,dataSource:t.tableList,size:"small"},scopedSlots:t._u([{key:"operation",fn:function(a,i){return[e("a-button",{attrs:{type:"primary"},on:{click:function(a){return t.sureAlarm(i)}}},[t._v("确认报警")])]}}])})],1)])},staticRenderFns:[]};var o=e("VU/8")(n,s,!1,function(t){e("ho4S")},"data-v-289fe148",null);a.default=o.exports}});
//# sourceMappingURL=8.d6f2a76280bb2a7fd4a2.js.map