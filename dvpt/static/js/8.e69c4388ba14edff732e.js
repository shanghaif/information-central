webpackJsonp([8],{Fcbh:function(t,a){},TOaz:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var o=e("woOf"),n=e.n(o),l=[{title:"部门代码",dataIndex:"url"},{title:"部门名称",dataIndex:"name"},{title:"操 作",align:"center",scopedSlots:{customRender:"operation"},width:300}],i=[{title:"岗位ID",dataIndex:"EntityId"},{title:"岗位代码",dataIndex:"RoleLevel"},{title:"从属部门",dataIndex:"Description"},{title:"岗位名称",dataIndex:"Name"},{title:"操 作",align:"center",scopedSlots:{customRender:"operation"},width:300}],d=[{title:"部门名称",dataIndex:"EntityId"},{title:"岗位名称",dataIndex:"RoleLevel"},{title:"可通行门",dataIndex:"Description"},{title:"状态",dataIndex:"Name"},{title:"操 作",align:"center",scopedSlots:{customRender:"operation"},width:300}],r={name:"card-user-manage",components:{AFormItem:e("SWcn").a},data:function(){var t=this;return{key:"",data:[],columns1:l,columns2:i,columns3:d,expandAllRows:!0,loading:!1,pagination:{current:1,defaultCurrent:1,defaultPageSize:15,total:0,size:"large",onChange:function(a){return t.changePage(a)}},departmentModal:!1,postModal:!1,authorityModal:!1,modalTitle:"",modalForm:{}}},mounted:function(){this.initTable(1)},methods:{initTable:function(t){var a=this;if(a.loading=!0,a.key=t,1==a.key){a.$http.get("/config").then(function(t){console.log(t),a.data=t.data.value,a.pagination.total=a.data.length,a.loading=!1})}else if(2==a.key){a.$http.get("/config/Roles").then(function(t){console.log(t),a.data=t.data.value,a.pagination.total=a.data.length,a.loading=!1})}else{a.$http.get("/config/Roles").then(function(t){console.log(t),a.data=t.data.value,a.pagination.total=a.data.length,a.loading=!1})}},changePage:function(t){this.pagination.current=t},addDepartment:function(){this.modalTitle="新增部门信息",this.modalForm=n()({},{}),this.departmentModal=!0},editDepartment:function(t){this.modalTitle="编辑部门信息",this.modalForm=n()({},t),this.departmentModal=!0},deleteDepartment:function(t){var a=this;a.modal=a.Modal.confirm({title:"删除部门信息",centered:!0,closable:!1,content:"此操作将在列表删除此条数据，是否继续？",okType:"warning",onOk:function(t){var e={EntityId:a.modalForm.EntityId};a.$http.post(a.$api.deleteUser,e).then(function(t){if(200!==t.status)return!1;"success"===t.data&&a.$info({title:"完成",content:"已删除此条数据！",onOk:function(){a.modal.destroy()}}),a.modal.destroy()})},onCancel:function(t){a.modal.destroy()}})},AddPost:function(){this.modalForm=n()({},{}),this.modalTitle="新增岗位信息",this.postModal=!0},editPost:function(t){this.modalForm=n()({},t),this.modalTitle="编辑岗位信息",this.postModal=!0},deletePost:function(t){var a=this;a.modal=a.Modal.confirm({title:"删除岗位信息",cancelText:"取消",centered:!0,closable:!1,content:"此操作将在列表删除此条数据，是否继续？",okType:"warning",onOk:function(t){var e={EntityId:a.modalForm.EntityId};a.$http.post(a.$api.deleteUser,e).then(function(t){if(200!==t.status)return!1;"success"===t.data&&a.$info({title:"完成",content:"已删除此条数据！",onOk:function(){a.modal.destroy()}}),a.modal.destroy()})},onCancel:function(t){a.modal.destroy()}})},editAuthority:function(t){this.modalForm=n()({},t),this.modalTitle="编辑权限信息",this.authorityModal=!0},handleOk:function(t){var a=this,e=null;if(1==a.key)if("新增部门信息"===a.modalTitle){var o=a.modalForm.Encoded,n=a.modalForm.DisplayName,l=(a.modalForm.Expire,a.modalForm.TimeSheetType),i=a.modalForm.Description;a.modalForm.Enable;e={Modified:new Date,IsDeleted:!1,Actived:new Date,Expired:new Date,Type:l,FirstName:"",LastName:n,Description:i,IsBlocked:!1,Code:o,Role:"",Department:""},console.log(e),a.$http.post(a.$api.getCards,e).then(function(t){console.log(t),"success"===t.data?a.$info({title:"提示",content:"添加成功！",onOk:function(){a.isShowModal=!1}}):a.$info({title:"错误",content:"发生了一些错误："+t.data.Message,onOk:function(){a.isShowModal=!1}}),a.confirmLoading=!1})}else"编辑部门信息"===a.modalTitle&&(console.log(a.modalForm),a.$http.post(a.$api.updateUsers,e).then(function(t){"success"===t.data?a.$info({title:"提示",content:"修改成功！",onOk:function(){a.isShowModal=!1}}):a.$info({title:"错误",content:"发生了一些错误："+t.data.Message,onOk:function(){a.isShowModal=!1}}),a.confirmLoading=!1}));else a.key},closeModal:function(){this.departmentModal=!1,this.postModal=!1,this.authorityModal=!1}}},s={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"card-user-manage"},[e("a-tabs",{attrs:{type:"card",defaultActiveKey:"1",tabPosition:"left"},on:{change:t.initTable}},[e("a-tab-pane",{key:"1",attrs:{tab:"部门"}},[e("a-form",{attrs:{layout:"inline"}},[e("a-form-item",[e("a-button",{attrs:{type:"primary",icon:"plus"},on:{click:t.addDepartment}},[t._v("新增")])],1)],1),t._v(" "),e("a-table",{attrs:{columns:t.columns1,dataSource:t.data,pagination:t.pagination,loading:t.loading,defaultExpandAllRows:t.expandAllRows,size:"small"},scopedSlots:t._u([{key:"operation",fn:function(a,o){return[e("a-button",{attrs:{type:"primary"},on:{click:function(a){return t.editDepartment(o)}}},[t._v("编辑")]),t._v(" "),e("a-button",{attrs:{type:"primary"},on:{click:function(a){return t.deleteDepartment(o)}}},[t._v("删除")])]}}])}),t._v(" "),e("a-modal",{attrs:{visible:t.departmentModal,title:t.modalTitle,centered:"",destroyOnClose:""},on:{ok:function(a){return t.handleOk()},cancel:function(a){return t.closeModal()}}},[e("div",{staticClass:"form-in-modal"},[e("a-form",{attrs:{layout:"inline",form:t.modalForm}},[e("div",{staticClass:"modal-form",staticStyle:{"text-align":"center"}},[e("a-form-item",{attrs:{label:"部门代码"}},[e("a-input",{model:{value:t.modalForm.Code,callback:function(a){t.$set(t.modalForm,"Code",a)},expression:"modalForm.Code"}})],1),t._v(" "),e("a-form-item",{attrs:{label:"部门名称"}},[e("a-input",{model:{value:t.modalForm.Name,callback:function(a){t.$set(t.modalForm,"Name",a)},expression:"modalForm.Name"}})],1)],1)])],1)])],1),t._v(" "),e("a-tab-pane",{key:"2",attrs:{tab:"岗位"}},[e("a-form",{attrs:{layout:"inline"}},[e("a-form-item",[e("a-button",{attrs:{type:"primary",icon:"plus"},on:{click:t.AddPost}},[t._v("新增")])],1)],1),t._v(" "),e("a-table",{attrs:{columns:t.columns2,dataSource:t.data,pagination:t.pagination,loading:t.loading,defaultExpandAllRows:t.expandAllRows,size:"small"},scopedSlots:t._u([{key:"operation",fn:function(a,o){return[e("a-button",{attrs:{type:"primary"},on:{click:function(a){return t.editPost(o)}}},[t._v("编辑")]),t._v(" "),e("a-button",{attrs:{type:"primary"},on:{click:function(a){return t.deletePost(o)}}},[t._v("删除")])]}}])}),t._v(" "),e("a-modal",{attrs:{visible:t.postModal,title:t.modalTitle,centered:"",destroyOnClose:""},on:{ok:function(a){return t.handleOk()},cancel:function(a){return t.closeModal()}}},[e("div",{staticClass:"form-in-modal"},[e("a-form",{attrs:{layout:"inline",form:t.modalForm}},[e("div",{staticClass:"modal-form",staticStyle:{"text-align":"center"}},[e("a-form-item",{attrs:{label:"从属部门"}},[e("a-select",{model:{value:t.modalForm.Department,callback:function(a){t.$set(t.modalForm,"Department",a)},expression:"modalForm.Department"}},[e("a-select-option",{attrs:{value:"Enable"}},[t._v("启用")]),t._v(" "),e("a-select-option",{attrs:{value:"Disable"}},[t._v("未启用")])],1)],1),t._v(" "),e("a-form-item",{attrs:{label:"岗位代码"}},[e("a-input",{model:{value:t.modalForm.Code,callback:function(a){t.$set(t.modalForm,"Code",a)},expression:"modalForm.Code"}})],1),t._v(" "),e("a-form-item",{attrs:{label:"岗位名称"}},[e("a-input",{model:{value:t.modalForm.Name,callback:function(a){t.$set(t.modalForm,"Name",a)},expression:"modalForm.Name"}})],1)],1)])],1)])],1),t._v(" "),e("a-tab-pane",{key:"3",attrs:{tab:"岗位权限配置"}},[e("a-table",{attrs:{columns:t.columns3,dataSource:t.data,pagination:t.pagination,loading:t.loading,defaultExpandAllRows:t.expandAllRows,size:"small"},scopedSlots:t._u([{key:"operation",fn:function(a,o){return[e("a-button",{attrs:{type:"primary"},on:{click:function(a){return t.editAuthority(o)}}},[t._v("编辑")])]}}])}),t._v(" "),e("a-modal",{attrs:{visible:t.authorityModal,title:t.modalTitle,centered:"",destroyOnClose:""},on:{ok:function(a){return t.handleOk()},cancel:function(a){return t.closeModal()}}},[e("div",{staticClass:"form-in-modal"},[e("a-form",{attrs:{layout:"inline",form:t.modalForm}},[e("div",{staticClass:"modal-form",staticStyle:{"text-align":"center"}},[e("a-form-item",{attrs:{label:"从属部门"}},[e("a-select",{model:{value:t.modalForm.Department,callback:function(a){t.$set(t.modalForm,"Department",a)},expression:"modalForm.Department"}},[e("a-select-option",{attrs:{value:"Enable"}},[t._v("启用")]),t._v(" "),e("a-select-option",{attrs:{value:"Disable"}},[t._v("未启用")])],1)],1),t._v(" "),e("a-form-item",{attrs:{label:"岗位代码"}},[e("a-input",{model:{value:t.modalForm.Code,callback:function(a){t.$set(t.modalForm,"Code",a)},expression:"modalForm.Code"}})],1),t._v(" "),e("a-form-item",{attrs:{label:"岗位名称"}},[e("a-input",{model:{value:t.modalForm.Name,callback:function(a){t.$set(t.modalForm,"Name",a)},expression:"modalForm.Name"}})],1)],1)])],1)])],1)],1)],1)},staticRenderFns:[]};var m=e("VU/8")(r,s,!1,function(t){e("Fcbh")},"data-v-545a2243",null);a.default=m.exports}});
//# sourceMappingURL=8.e69c4388ba14edff732e.js.map