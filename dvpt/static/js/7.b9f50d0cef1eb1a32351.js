webpackJsonp([7],{D3Nf:function(t,e){},s8IG:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("woOf"),o=a.n(i),n=[{title:"登录名",dataIndex:"Name",align:"center",width:"10%"},{title:"姓 名",dataIndex:"DisplayName",align:"center",width:30},{title:"固 话",dataIndex:"Tel",align:"center",width:"10%"},{title:"手机号",dataIndex:"PhoneNumber",align:"center",width:"12%"},{title:"创建时间",dataIndex:"Created",align:"center",width:"12%"},{title:"更新时间",dataIndex:"Updated",align:"center",width:"12%"},{title:"过期时间",dataIndex:"Expired",align:"center",width:"12%"},{title:"状 态",dataIndex:"Status",align:"center",width:"5%"},{title:"操 作",align:"center",width:"18%",scopedSlots:{customRender:"operation"}}],l={name:"user-manage",components:{AFormItem:a("SWcn").a},data:function(){var t=this;return{modal:"",searchName:"",okButton:"保存",isShowModal:!1,confirmLoading:!1,column:n,expandAllRows:!0,enableEdit:!1,enableEditTime:!0,ifMaskClosable:!1,telTips:"",validateTel:"",phoneTips:"",validatePhone:"",pagination:{current:0,defaultCurrent:1,defaultPageSize:18,total:0,size:"large",onChange:function(e){return t.changePage(e)}},modalTitle:"",loading:!1,modalForm:{Name:"",DisplayName:"",EntityId:"",Status:"",Created:"",Tel:"",PhoneNumber:"",Expired:"",Updated:""},tableList:[],tableContainer:[]}},watch:{Tel:function(t){/^0[0-9]{2,3}-[1-9]\d{5,8}$/.test(t)?(this.validateTel="",this.telTips=""):(this.validateTel="warning",this.telTips="固话格式XXX-XXXXXX")},PhoneNumber:function(t){/^1[34578]\d{9}$/.test(t)?(this.validatePhone="",this.phoneTips=""):(this.validatePhone="warning",this.phoneTips="手机格式：1XXXXXXXX")}},computed:{Tel:function(){return this.modalForm.Tel},PhoneNumber:function(){return this.modalForm.PhoneNumber}},beforeCreate:function(){this.form=this.$form.createForm(this,{name:"advanced_search"})},created:function(){},beforeMount:function(){},mounted:function(){this.initTable()},methods:{initTable:function(){var t=this,e=this,a=this.tableList.length;this.pagination.current=1;for(var i=0;i<=a;i++)this.tableList.pop();this.loading=!0,this.form.validateFields(function(a,i){a||t.$http.get(e.$api.getUsers).then(function(t){e.pagination.total=t.data.value.length;var a=t.data.value;e.pagination.defaultPageSize;a.forEach(function(t,a){t.Created=e.$common.timestampToTime(t.Created),t.Updated=e.$common.timestampToTime(t.Updated),t.Expired=e.$common.timestampToTime(t.Expired),t.Status="Enable"===t.Status?"启用":"未启用"}),e.tableList=a,e.loading=!1})})},changePage:function(t){""!==this.searchName?this.handleConditionSearch(t):this.handleTableChange(t)},handleConditionSearch:function(t){for(var e=this,a=this,i=this.tableList.length,o=0;o<=i;o++)this.tableList.pop();this.loading=!0,this.$http.get(a.$api.getUsers).then(function(t){var i=[];t.data.value.forEach(function(t,o){t.Created=e.$common.timestampToTime(t.Created),t.Updated=e.$common.timestampToTime(t.Updated),t.Expired=e.$common.timestampToTime(t.Expired),t.Status="Enable"===t.Status?"启用":"停用",t.Name.includes(a.searchName)&&i.push(t)}),a.tableList=i,a.searchName="",a.loading=!1})},searchFor:function(t){var e=this,a=this;this.tableList=[],t.preventDefault(),this.pagination.current=1,this.loading=!0,this.form.validateFields(function(t,i){t||e.$http.get(a.$api.getUsers).then(function(t){var i=[];t.data.value.forEach(function(t,o){t.Created=e.$common.timestampToTime(t.Created),t.Updated=e.$common.timestampToTime(t.Updated),t.Expired=e.$common.timestampToTime(t.Expired),t.Status="Enable"===t.Status?"启用":"未启用",""!==a.searchName?t.Name.includes(a.searchName)&&i.push(t):i.push(t)}),a.tableList=i,a.tableContainer=i,a.pagination.total=a.tableList.length,a.searchName="",a.loading=!1})})},handleTableList:function(t){var e=this,a=this.searchName;t.some(function(t){""===a&&void 0===a&&null===a||(t.Name===a&&e.tableList.push(t),e.tableList=t)})},handleTableChange:function(t){for(var e=this,a=(this.pagination.defaultPageSize,this.tableList.length),i=0;i<=a;i++)e.tableList.pop();this.loading=!0,this.pagination.current=t,this.$http.get(e.$api.getUsers+"&$skip="+(t-1)*e.pagination.defaultPageSize+"&$top="+e.pagination.defaultPageSize).then(function(t){try{var a=[],i=t.data.value;i.forEach(function(t,i){t.Created=e.$common.timestampToTime(t.Created),t.Updated=e.$common.timestampToTime(t.Updated),t.Expired=e.$common.timestampToTime(t.Expired),t.Status="Enable"===t.Status?"启用":"未启用",a.push(t)}),e.tableList=i}catch(t){console.log('there are some data have "null":'+t)}e.loading=!1})},checkUser:function(t){var e=o()({},t);this.modalForm=o()({},e),this.modalForm.Status="启用"===this.modalForm.Status?"Enable":"Disable",this.okButton="确定",this.modalTitle="查看用户信息",this.enableEdit=!0,this.isShowModal=!0},editUser:function(t){this.modalForm=o()({},t),this.modalForm.Status="启用"===this.modalForm.Status?"Enable":"Disable",this.enableEdit=!1,this.isShowModal=!0,this.okButton="保存",this.modalTitle="编辑用户信息"},deleteUser:function(t){var e=this;this.modalForm=o()({},t);this.modal=this.Modal.confirm({title:"删除用户信息",cancelText:"取消",centered:!0,closable:!1,content:"此操作将在列表删除此条数据，是否继续？",okType:"warning",onOk:function(t){var a={EntityId:e.modalForm.EntityId};e.$http.post(e.$api.deleteUser,a).then(function(t){if(200!==t.status)return!1;"success"===t.data&&e.$info({title:"完成",content:"已删除当前用户！",onOk:function(){e.initTable(),e.modal.destroy()}}),e.modal.destroy()})},onCancel:function(t){e.modal.destroy()}})},handleOk:function(t){var e=this,a=null;this.confirmLoading=!0;var i=this.modalTitle;"添加用户信息"===i?(a={EntityId:0,Name:e.modalForm.Name,DisplayName:e.modalForm.DisplayName,Tel:e.modalForm.Tel,PhoneNumber:e.modalForm.PhoneNumber},this.$http.post(e.$api.addUsers,a).then(function(t){console.log(t),"success"===t.data?e.$info({title:"提示",content:"添加成功！",onOk:function(){e.isShowModal=!1,e.initTable()}}):"登录名称重复"===t.data.Message?e.$info({title:"错误",content:"登录名已经存在，请重新输入",onOk:function(){}}):e.$info({title:"错误",content:"发生了一些错误："+t.status+"，请检查您的输入信息",onOk:function(){}}),e.confirmLoading=!1})):"查看用户信息"===i?(this.isShowModal=!1,this.confirmLoading=!1):"编辑用户信息"===i&&(a={EntityId:e.modalForm.EntityId,Name:e.modalForm.Name,DisplayName:e.modalForm.DisplayName,Tel:e.modalForm.Tel,PhoneNumber:e.modalForm.PhoneNumber,GroupId:[],RoleIds:[2028,2019]},this.$http.post(e.$api.updateUsers,a).then(function(t){"success"===t.data&&("Enable"===e.modalForm.Status?e.$http.post(e.$api.restartUser,{EntityId:e.modalForm.EntityId}).then(function(t){console.log(t)}).catch(function(t){console.log(t),e.$info({title:"提示",content:"出现了一些错误："+t,onOk:function(){}})}):e.$http.post(e.$api.lockUser,{EntityId:e.modalForm.EntityId}).then(function(t){}),e.$info({title:"提示",content:"修改成功！",onOk:function(){e.isShowModal=!1,e.initTable()}})),e.confirmLoading=!1}))},closeModal:function(t){this.confirmLoading=!1,this.isShowModal=!1},addUser:function(){this.modalForm=o()({},{}),this.modalTitle="添加用户信息",this.enableEdit=!1,this.isShowModal=!0}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"search-condition"},[a("a-form",{attrs:{layout:"inline",form:t.form},on:{submit:t.searchFor}},[a("a-form-item",{attrs:{label:"登录名："}},[a("a-input",{attrs:{placeholder:""},model:{value:t.searchName,callback:function(e){t.searchName=e},expression:"searchName"}})],1),t._v(" "),a("a-form-item",[a("a-button",{attrs:{type:"primary",icon:"search","html-type":"submit"}},[t._v("搜索")])],1),t._v(" "),a("a-form-item",[a("a-button",{attrs:{type:"primary",icon:"plus"},on:{click:t.addUser}},[t._v("添加")])],1)],1)],1),t._v(" "),a("div",{staticClass:"modal"},[a("a-modal",{attrs:{visible:t.isShowModal,okText:t.okButton,centered:"",destroyOnClose:"",maskClosable:t.ifMaskClosable,title:t.modalTitle,"confirm-loading":t.confirmLoading},on:{ok:t.handleOk,cancel:t.closeModal}},[a("div",{staticClass:"form-in-modal"},[a("a-form",{attrs:{form:t.modalForm}},[a("div",{staticClass:"modal-form"},[a("div",{staticClass:"modal-form-one"},[a("a-form-item",{attrs:{label:"登录名","label-col":{span:7},"wrapper-col":{span:14},required:""}},[a("a-input",{attrs:{disabled:t.enableEdit},model:{value:t.modalForm.Name,callback:function(e){t.$set(t.modalForm,"Name",e)},expression:"modalForm.Name"}})],1),t._v(" "),a("a-form-item",{attrs:{label:"姓名","label-col":{span:7},"wrapper-col":{span:14},required:""}},[a("a-input",{attrs:{disabled:t.enableEdit},model:{value:t.modalForm.DisplayName,callback:function(e){t.$set(t.modalForm,"DisplayName",e)},expression:"modalForm.DisplayName"}})],1),t._v(" "),a("a-form-item",{attrs:{label:"状态","label-col":{span:7},"wrapper-col":{span:14},required:""}},[a("a-select",{attrs:{disabled:t.enableEdit},model:{value:t.modalForm.Status,callback:function(e){t.$set(t.modalForm,"Status",e)},expression:"modalForm.Status"}},[a("a-select-option",{attrs:{value:"Enable"}},[t._v("启用")]),t._v(" "),a("a-select-option",{attrs:{value:"Disable"}},[t._v("未启用")])],1)],1)],1),t._v(" "),a("div",{staticClass:"modal-form-two"},[a("a-form-item",{attrs:{label:"固话","validate-status":t.validateTel,help:t.telTips,"label-col":{span:7},"wrapper-col":{span:14},required:""}},[a("a-input",{attrs:{disabled:t.enableEdit},model:{value:t.modalForm.Tel,callback:function(e){t.$set(t.modalForm,"Tel",e)},expression:"modalForm.Tel"}})],1),t._v(" "),a("a-form-item",{attrs:{label:"手机号","validate-status":t.validatePhone,help:t.phoneTips,"label-col":{span:7},"wrapper-col":{span:14},required:""}},[a("a-input",{attrs:{disabled:t.enableEdit},model:{value:t.modalForm.PhoneNumber,callback:function(e){t.$set(t.modalForm,"PhoneNumber",e)},expression:"modalForm.PhoneNumber"}})],1)],1)])])],1)])],1),t._v(" "),a("div",{staticClass:"table"},[a("a-table",{attrs:{columns:t.column,loading:t.loading,dataSource:t.tableList,pagination:t.pagination,defaultExpandAllRows:t.expandAllRows,size:"small"},scopedSlots:t._u([{key:"operation",fn:function(e,i){return[a("a-button",{attrs:{type:"dashed",ghost:""},on:{click:function(e){return t.checkUser(i)}}},[t._v("查看")]),t._v(" "),a("a-button",{attrs:{type:"dashed",ghost:""},on:{click:function(e){return t.editUser(i)}}},[t._v("编辑")]),t._v(" "),a("a-button",{attrs:{type:"dashed",ghost:""},on:{click:function(e){return t.deleteUser(i)}}},[t._v("删除")])]}}])})],1)])},staticRenderFns:[]};var r=a("VU/8")(l,s,!1,function(t){a("D3Nf")},"data-v-3b72c37b",null);e.default=r.exports}});
//# sourceMappingURL=7.b9f50d0cef1eb1a32351.js.map