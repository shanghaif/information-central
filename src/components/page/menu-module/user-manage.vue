<template>
  <div>
    <div class="search-condition">
      <a-form layout="inline" :form="form" @submit="searchFor">
        <a-form-item label="登录名：">
          <a-input placeholder="" v-model="searchName"></a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" icon="search" html-type="submit">搜索</a-button>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" icon="plus" @click="addUser">添加</a-button>
        </a-form-item>
      </a-form>
    </div>

    <div class="modal">
      <a-modal :visible="isShowModal"
               :okText="okButton"
               centered
               destroyOnClose
               :maskClosable="ifMaskClosable"
               :title="modalTitle"
               :confirm-loading="confirmLoading"
               @ok="handleOk"
               @cancel="closeModal">
        <div class="form-in-modal">
          <a-form :form="modalForm">
            <div class="modal-form">
              <div class="modal-form-one">
                <a-form-item label="登录名" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }" required>
                  <a-input v-model="modalForm.Name" :disabled="enableEdit"></a-input>
                </a-form-item>
                <a-form-item label="姓名" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }" required>
                  <a-input v-model="modalForm.DisplayName" :disabled="enableEdit"></a-input>
                </a-form-item>
                <a-form-item label="状态" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }" required>
                  <a-select :disabled="enableEdit" v-model="modalForm.Status">
                    <a-select-option value="Enable">启用</a-select-option>
                    <a-select-option value="Disable">未启用</a-select-option>
                  </a-select>
                </a-form-item>
                <!--<a-form-item label="创建时间" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">-->
                <!--<a-input v-model="modalForm.Created" :disabled="enableEditTime"></a-input>-->
                <!--</a-form-item>-->
              </div>
              <div class="modal-form-two">
                <a-form-item label="固话"
                             :validate-status="validateTel"
                             :help="telTips"
                             :label-col="{ span: 7 }"
                             :wrapper-col="{ span: 14 }"
                             required>
                  <a-input v-model="modalForm.Tel" :disabled="enableEdit"></a-input>
                </a-form-item>
                <a-form-item label="手机号"
                             :validate-status="validatePhone"
                             :help="phoneTips"
                             :label-col="{ span: 7 }"
                             :wrapper-col="{ span: 14 }"
                             required>
                  <a-input v-model="modalForm.PhoneNumber" :disabled="enableEdit"></a-input>
                </a-form-item>
                <!--<a-form-item label="过期时间" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">-->
                <!--<a-input v-model="modalForm.Expired" :disabled="enableEditTime"></a-input>-->
                <!--</a-form-item>-->
                <!--<a-form-item label="更新时间" :label-col="{ span: 7 }" :wrapper-col="{ span: 14 }">-->
                <!--<a-input v-model="modalForm.Updated" :disabled="enableEditTime"></a-input>-->
                <!--</a-form-item>-->
              </div>
            </div>
          </a-form>
        </div>
      </a-modal>
    </div>

    <div class="table">
      <a-table :columns="column"
               :loading="loading"
               :dataSource="tableList"
               :pagination="pagination"
               :defaultExpandAllRows="expandAllRows"
               size="small">
        <template slot="operation" slot-scope="text, record">
          <a-button type="dashed" ghost @click="checkUser(record)">查看</a-button>
          <a-button type="dashed" ghost @click="editUser(record)">编辑</a-button>
          <a-button type="dashed" ghost @click="deleteUser(record)">删除</a-button>
        </template>
      </a-table>

      <!--<a-pagination :current="pagination.current"-->
      <!--:defaultPageSize="pagination.defaultPageSize"-->
      <!--:showQuickJumper="pagination.showQuickJumper"-->
      <!--@change="pageChange(page, pageSize)" />-->
    </div>
  </div>
</template>

<script>
  // 预留 column 表头信息
  import AFormItem from "ant-design-vue/es/form/FormItem";
  const column = [
    {
      title: '登录名',
      dataIndex: 'Name',
      align: 'center',
      // sorter: true,
      width: '10%',
      // scopedSlots: { customRender: 'name' }
    },
    {
      title: '姓 名',
      dataIndex: 'DisplayName',
      align: 'center',
      width: 30
    },
    {
      title: '固 话',
      dataIndex: 'Tel',
      align: 'center',
      width: '10%'
    },
    {
      title: '手机号',
      dataIndex: 'PhoneNumber',
      align: 'center',
      width: '12%'
    },
    {
      title: '创建时间',
      dataIndex: 'Created',
      align: 'center',
      width: '12%'
    },
    {
      title: '更新时间',
      dataIndex: 'Updated',
      align: 'center',
      width: '12%'
    },
    {
      title: '过期时间',
      dataIndex: 'Expired',
      align: 'center',
      width: '12%'
    },
    {
      title: '状 态',
      dataIndex: 'Status',
      align: 'center',
      width: '5%'
    },
    {
      title: '操 作',
      // dataIndex: 'tel',
      align: 'center',
      width: '18%',
      scopedSlots: { customRender: 'operation' }
    }
  ];

  export default {
    name: "user-manage",
    components: {AFormItem},
    data () {
      return{
        modal: '', // 使用 a-modal target 不能动态地改变标题，模拟一个状态使用 API 来 update 对话框，已解决，因此用来做删除的对话框
        // searchName: this.$form.createForm(this, { name: 'advanced_search' }), // 搜索条件 - 姓名
        searchName: '', // 查询条件 - 姓名
        okButton: '保存',
        isShowModal: false,
        confirmLoading: false,
        column,
        expandAllRows: true,
        enableEdit: false,
        // 创建时间和更新时间永远不能更改
        enableEditTime: true,
        ifMaskClosable: false,
        telTips: '',
        validateTel: '',
        phoneTips: '',
        validatePhone: '',
        // 分页信息
        pagination: {
          current: 0,
          defaultCurrent: 1,
          // 默认页容量
          defaultPageSize: 18,
          total: 0,
          // showQuickJumper: true,
          size: 'large',
          // 使用一个箭头函数来指向当前 Vue 实例
          onChange: (current) => this.changePage(current)
        },
        modalTitle: '',
        loading: false,

        // modalForm: {},
        modalForm: {
          Name: '', // 登录名
          DisplayName: '', // 展示姓名
          EntityId: '',
          Status: '', // 不填写服务默认启动
          Created: '', // 服务创建
          Tel: '',
          PhoneNumber: '',
          Expired: '', // 过期时间 - 如果不填写服务会创建
          Updated: '' // 服务创建
        },
        tableList: [],
        tableContainer: [],
        // 模拟数据
        /*tableList: [
          {
            // key: 1,
            name: 'Apple',
            number: 190022,
            tel: '010-2312313',
            phone: 182929483,
            createTime: '9019-10-10 10:10',
            updateTime: '9019-10-10 10:10',
            overTime: '9019-10-10 10:10',
            status: '启用'
          },
          {
            // key: 2,
            name: 'Apple',
            number: 190022,
            tel: '010-2312313',
            phone: 182929483,
            createTime: '9019-10-10 10:10',
            updateTime: '9019-10-10 10:10',
            overTime: '9019-10-10 10:10',
            status: '启用'
          },
          {
            // key: 2,
            name: 'Apple',
            number: 190022,
            tel: '010-2312313',
            phone: 182929483,
            createTime: '9019-10-10 10:10',
            updateTime: '9019-10-10 10:10',
            overTime: '9019-10-10 10:10',
            status: '启用'
          },
          {
            // key: 1,
            name: 'Apple',
            number: 190022,
            tel: '010-2312313',
            phone: 182929483,
            createTime: '9019-10-10 10:10',
            updateTime: '9019-10-10 10:10',
            overTime: '9019-10-10 10:10',
            status: '启用'
          },
          {
            // key: 1,
            name: 'Apple',
            number: 190022,
            tel: '010-2312313',
            phone: 182929483,
            createTime: '9019-10-10 10:10',
            updateTime: '9019-10-10 10:10',
            overTime: '9019-10-10 10:10',
            status: '启用'
          },
          {
            // key: 1,
            name: 'Apple',
            number: 190022,
            tel: '010-2312313',
            phone: 182929483,
            createTime: '9019-10-10 10:10',
            updateTime: '9019-10-10 10:10',
            overTime: '9019-10-10 10:10',
            status: '启用'
          },
          {
            // key: 1,
            name: 'Apple',
            number: 190022,
            tel: '010-2312313',
            phone: 182929483,
            createTime: '9019-10-10 10:10',
            updateTime: '9019-10-10 10:10',
            overTime: '9019-10-10 10:10',
            status: '启用'
          },
          {
            // key: 1,
            name: 'Apple',
            number: 190022,
            tel: '010-2312313',
            phone: 182929483,
            createTime: '9019-10-10 10:10',
            updateTime: '9019-10-10 10:10',
            overTime: '9019-10-10 10:10',
            status: '启用'
          },
          {
            // key: 1,
            name: 'Apple',
            number: 190022,
            tel: '010-2312313',
            phone: 182929483,
            createTime: '9019-10-10 10:10',
            updateTime: '9019-10-10 10:10',
            overTime: '9019-10-10 10:10',
            status: '启用'
          },
          {
            // key: 1,
            name: 'Apple',
            number: 190022,
            tel: '010-2312313',
            phone: 182929483,
            createTime: '9019-10-10 10:10',
            updateTime: '9019-10-10 10:10',
            overTime: '9019-10-10 10:10',
            status: '启用'
          },
          {
            // key: 1,
            name: 'Apple',
            number: 190022,
            tel: '010-2312313',
            phone: 182929483,
            createTime: '9019-10-10 10:10',
            updateTime: '9019-10-10 10:10',
            overTime: '9019-10-10 10:10',
            status: '启用'
          },
          {
            // key: 1,
            name: 'Apple',
            number: 190022,
            tel: '010-2312313',
            phone: 182929483,
            createTime: '9019-10-10 10:10',
            updateTime: '9019-10-10 10:10',
            overTime: '9019-10-10 10:10',
            status: '启用'
          },
          {
            // key: 1,
            name: 'Apple',
            number: 190022,
            tel: '010-2312313',
            phone: 182929483,
            createTime: '9019-10-10 10:10',
            updateTime: '9019-10-10 10:10',
            overTime: '9019-10-10 10:10',
            status: '启用'
          },
          {
            // key: 1,
            name: 'Apple',
            number: 190022,
            tel: '010-2312313',
            phone: 182929483,
            createTime: '9019-10-10 10:10',
            updateTime: '9019-10-10 10:10',
            overTime: '9019-10-10 10:10',
            status: '启用'
          },
          {
            // key: 1,
            name: 'Apple',
            number: 190022,
            tel: '010-2312313',
            phone: 182929483,
            createTime: '9019-10-10 10:10',
            updateTime: '9019-10-10 10:10',
            overTime: '9019-10-10 10:10',
            status: '启用'
          },
          {
            // key: 1,
            name: 'Apple',
            number: 190022,
            tel: '010-2312313',
            phone: 182929483,
            createTime: '9019-10-10 10:10',
            updateTime: '9019-10-10 10:10',
            overTime: '9019-10-10 10:10',
            status: '启用'
          }
        ]*/
      }
    },

    watch: {
      Tel: function (value) {
        const reg = /^0[0-9]{2,3}-[1-9]\d{5,8}$/;
        if (!reg.test(value)) {
          this.validateTel = 'warning';
          this.telTips = '固话格式XXX-XXXXXX';
        } else {
          this.validateTel = '';
          this.telTips = '';
        }
      },

      PhoneNumber: function (value) {
        const reg = /^1[34578]\d{9}$/;
        if (!reg.test(value)) {
          this.validatePhone = 'warning';
          this.phoneTips = '手机格式：1XXXXXXXX';
        } else {
          this.validatePhone = '';
          this.phoneTips = '';
        }
      }
    },

    // 使用 computed 作中间件
    computed: {
      /**
       * @return {string}
       */
      Tel () {
        return this.modalForm.Tel;
      },

      /**
       * @return {string}
       */
      PhoneNumber () {
        return this.modalForm.PhoneNumber;
      }
    },

    beforeCreate () {
      this.form = this.$form.createForm(this, { name: 'advanced_search' });
    },

    // 状态创建前窗口会出现一次闪烁
    created () {
      // this.modal = this.Modal.confirm();
      // this.form = this.$form.createForm(this, { name: 'advanced_search' });
    },

    beforeMount () {
      // this.modal.destroy();
    },

    mounted () {
      this.initTable();
    },

    methods: {
      /**
       * @function 初始化 table
       */
      initTable () {
        const that = this;
        const len = this.tableList.length;
        this.pagination.current = 1;
        for (let i=0;i<=len;i++) {
          this.tableList.pop();
        }
        this.loading = true;
        this.form.validateFields((err, values) => {
          if (!err) {
            this.$http.get(that.$api.getUsers).then(res => {
              let tableContainer = [];
              that.pagination.total = res.data.value.length;
              // 用户 list
              const table = res.data.value;
              const length = that.pagination.defaultPageSize;
              // 遍历处理数据
              table.forEach((value, index) => {
                for (let valueKey in value) {
                  if (value[valueKey] === '' || value[valueKey] === null || value[valueKey] === undefined) {
                    value[valueKey] = 'N/A';
                  }
                }
                value.Created = that.$common.timestampToTime(value.Created);
                value.Updated = that.$common.timestampToTime(value.Updated);
                value.Expired = that.$common.timestampToTime(value.Expired);
                value.Status = value.Status === 'Enable' ? '启用' : '未启用';
              });
              that.tableList = table;
              that.loading = false;
            })
          }
        })
      },

      /**
       * @function 当页码改变时的 callback
       * @param page
       */
      changePage (page) {
        // 每当页码改变时需要重新渲染列表数据
        if (this.searchName !== '') {
          this.handleConditionSearch(page);
        } else {
          this.handleTableChange(page);
        }
      },

      handleConditionSearch (page) {
        const that = this;
        const length = this.tableList.length;
        for (let i=0;i<=length;i++) {
          this.tableList.pop();
        }
        // this.tableList = [];
        this.loading = true;
        // 使用当前绑定状态进行校验
        this.$http.get(that.$api.getUsers).then(res => {
          let tableContainer = [];
          const table = res.data.value;
          table.forEach((value, index) => {
            for (let valueKey in value) {
              if (value[valueKey] === '' || value[valueKey] === null || value[valueKey] === undefined) {
                value[valueKey] = 'N/A';
              }
            }
            value.Created = this.$common.timestampToTime(value.Created);
            value.Updated = this.$common.timestampToTime(value.Updated);
            value.Expired = this.$common.timestampToTime(value.Expired);
            value.Status = value.Status === 'Enable' ? '启用' : '停用';
            if (value.Name.includes(that.searchName)) {
              tableContainer.push(value);
            }
          });
          that.tableList = tableContainer;
          // 多次查询所以清空搜索条件
          that.searchName = '';
          that.loading = false;
        })
      },

      searchFor (e) {
        const that = this;
        this.tableList = [];
        // 附带 searchName 为参数发起 HTTP 请求
        e.preventDefault();
        this.pagination.current = 1;
        this.loading = true;
        // 使用当前绑定状态进行校验
        this.form.validateFields((err, values) => {
          if (!err) {
            this.$http.get(that.$api.getUsers).then(res => {
              let tableContainer = [];
              // that.pagination.total = res.data.value.length;
              const table = res.data.value;
              table.forEach((value, index) => {
                for (let valueKey in value) {
                  if (value[valueKey] === '' || value[valueKey] === null || value[valueKey] === undefined) {
                    value[valueKey] = 'N/A';
                  }
                }
                value.Created = this.$common.timestampToTime(value.Created);
                value.Updated = this.$common.timestampToTime(value.Updated);
                value.Expired = this.$common.timestampToTime(value.Expired);
                value.Status = value.Status === 'Enable' ? '启用' : '未启用';
                if (that.searchName !== '') {
                  if (value.Name.includes(that.searchName)) {
                    // that.tableList.push(value);
                    // tableContainer.splice(0, 1, value);
                    tableContainer.push(value);
                  }
                } else {
                  tableContainer.push(value);
                }
                // that.tableList = table;
              });
              that.tableList = tableContainer;
              // 缓存数据，用于翻页
              that.tableContainer = tableContainer;
              that.pagination.total = that.tableList.length;
              // 多次查询清空搜索条件
              that.searchName = '';
              that.loading = false;
            })
          }
        })
      },

      handleTableList (table) {
        const that = this;
        let _searchName = this.searchName;
        table.some((value) => {
          if (_searchName !== '' || _searchName !== undefined || _searchName !== null) {
            if (value.Name === _searchName) {
              that.tableList.push(value);
            }
            that.tableList = value;
          }
        })
        /*return function (table) {
          table.some((value) => {
            if (_searchName === value.name) {
              return value
            }
            this.tableList.push(value);
            this.searchName = ''
          })
        }*/
      },

      /*pageChange (page, pageSize) {
        // this.pagination.current = page;
        // 每当页码改变时需要重新渲染列表数据
        this.handleTableChange(page);
      },*/

      handleTableChange (page) {
        // 请求前需要将 tableList 清空
        const that = this;
        const pageSize = this.pagination.defaultPageSize;
        const length = this.tableList.length;
        for (let i=0;i<=length;i++) {
          that.tableList.pop();
        }
        this.loading = true;
        this.pagination.current = page;
        /*this.$http.get(that.$api.getUsers + '?$skip=' + page * that.pagination.defaultPageSize + '&$top=' + that.pagination.defaultPageSize).then(res => {
          console.log(res)
        })*/
        this.$http.get(that.$api.getUsers + '&$skip=' + (page - 1) * that.pagination.defaultPageSize + '&$top=' + that.pagination.defaultPageSize)
          .then((response) => {
            // console.log(response)
            try {
              let index;
              let tableContainer = [];
              const table = response.data.value;
              table.forEach((value, index) => {
                for (let valueKey in value) {
                  if (value[valueKey] === '' || value[valueKey] === null || value[valueKey] === undefined) {
                    value[valueKey] = 'N/A';
                  }
                }
                value.Created = that.$common.timestampToTime(value.Created);
                value.Updated = that.$common.timestampToTime(value.Updated);
                value.Expired = that.$common.timestampToTime(value.Expired);
                value.Status = value.Status === 'Enable' ? '启用' : '未启用';
                tableContainer.push(value);
              });
              that.tableList = table;
            }catch (e) {
              console.log('there are some data have "null":' + e);
            }
            that.loading = false;
          })
      },

      checkUser (row) {
        const formContainer = Object.assign({}, row);
        this.modalForm = Object.assign({}, formContainer);
        this.modalForm.Status = this.modalForm.Status === '启用' ? 'Enable' : 'Disable';
        this.okButton = '确定';
        // 简介对话框
        // this.isShowModal = true;
        this.modalTitle = '查看用户信息';
        this.enableEdit = true;
        this.isShowModal = true;
      },

      editUser(row) {
        this.modalForm = Object.assign({}, row);
        this.modalForm.Status = this.modalForm.Status === '启用' ? 'Enable' : 'Disable';
        this.enableEdit = false;
        this.isShowModal = true;
        this.okButton = '保存';
        this.modalTitle = '编辑用户信息';
      },

      deleteUser (row) {
        const that = this;
        // 获取当前行用户数据
        this.modalForm = Object.assign({}, row);
        let currentUser;
        this.modal = this.Modal.confirm({
          title: '删除用户信息',
          cancelText: '取消',
          centered: true,
          closable: false,
          content: '此操作将在列表删除此条数据，是否继续？',
          okType: 'warning',
          onOk: function (e) {
            const param = {
              EntityId: that.modalForm.EntityId
            };
            that.$http.post(that.$api.deleteUser, param)
              .then(res => {
                // console.log(res)
                if (res.status === 200) {
                  if (res.data === "success") {
                    that.$info({
                      title: '完成',
                      content: '已删除当前用户！',
                      onOk() {
                        that.initTable();
                        that.modal.destroy();
                      },
                    });
                  }
                } else {
                  return false;
                }
                that.modal.destroy();
              });
            // the callback of ok
          },

          onCancel: function (e) {
            // the callback of cancel
            that.modal.destroy();
          }
        })
      },

      handleOk (e) {
        const that = this;
        let param = null;
        this.confirmLoading = true;
        // this.$http.post()
        const titleStatus = this.modalTitle;
        /**
         * @description http request 没问题，请求参数需要确定
         */
        if (titleStatus === '添加用户信息') {
          /*const phoneReg = /^1[34578]\d{9}$/, telReg = /^0[0-9]{2,3}-[1-9]\d{5,8}$/;
          if (!telReg.test(that.modalForm.Tel) || !phoneReg.test(that.modalForm.PhoneNumber)) {
            that.$message.warning("请输入正确的手机号与固话格式");
            this.telTips = '固话格式XXX-XXXXXXX';
            this.confirmLoading = false;
            return false;
          }*/
          param = {
            EntityId: 0, // 主键固定
            Name: that.modalForm.Name,
            DisplayName: that.modalForm.DisplayName,
            Tel: that.modalForm.Tel,
            PhoneNumber: that.modalForm.PhoneNumber,
          };
          // 调用添加的 API
          this.$http.post(that.$api.addUsers, param)
            .then(res => {
              console.log(res);
              if (res.data === "success") {
                that.$info({
                  title: '提示',
                  content: '添加成功！',
                  onOk() {
                    that.isShowModal = false;
                    that.initTable();
                  },
                });
              } else if (res.data.Message === '登录名称重复') {
                that.$info({
                  title: '错误',
                  content: '登录名已经存在，请重新输入',
                  onOk() {
                    // that.isShowModal = false;
                  },
                });
              } else {
                that.$info({
                  title: '错误',
                  content: '发生了一些错误：' + res.status + '，请检查您的输入信息',
                  onOk() {
                    // that.isShowModal = false;
                  },
                });
              }
              that.confirmLoading = false;
            })
        } else if (titleStatus === '查看用户信息') {
          // no handle
          this.isShowModal = false;
          this.confirmLoading = false;
        } else if (titleStatus === '编辑用户信息') {
          // 调用编辑的 API
          param = {
            EntityId: that.modalForm.EntityId,
            Name: that.modalForm.Name, // 不能更改
            DisplayName: that.modalForm.DisplayName, // 登录名可以更改
            Tel: that.modalForm.Tel,
            PhoneNumber: that.modalForm.PhoneNumber,
            GroupId: [],
            RoleIds: [2028, 2019]
          };

          this.$http.post(that.$api.updateUsers, param).then(res => {
            // console.log('chosen status:' + that.modalForm.Status);
            if (res.data === "success") {
              if (that.modalForm.Status === 'Enable') {
                that.$http.post(that.$api.restartUser, {
                  EntityId: that.modalForm.EntityId
                }).then(response => {
                  console.log(response)
                }).catch(err => {
                  console.log(err);
                  that.$info({
                    title: '提示',
                    content: '出现了一些错误：' + err,
                    onOk() {},
                  });
                })
              } else {
                // 锁定用户
                that.$http.post(that.$api.lockUser, {
                  EntityId: that.modalForm.EntityId
                }).then(response => {
                  // console.log(response)
                })
              }
              that.$info({
                title: '提示',
                content: '修改成功！',
                onOk() {
                  that.isShowModal = false;
                  that.initTable();
                },
              });
            }
            that.confirmLoading = false;
          })
        }
      },

      closeModal (e) {
        this.confirmLoading = false;
        this.isShowModal = false;
      },

      /**
       * @function add users
       */
      addUser () {
        // 清空当前用户
        this.modalForm = Object.assign({}, {});
        this.modalTitle = '添加用户信息';
        this.enableEdit = false;
        this.isShowModal = true;
      },
    }
  }
</script>

<style scoped>
  @import '../../../assets/css/default.css';
  .table {
    margin: 20px 10px 0 10px;
  }

  .modal-form {
    display: flex;
    flex-direction: row;
  }
  
  .ant-form-item-label label {}
</style>
