const apiUrl='https://vue3-course-api.hexschool.io/v2';
const path='williamone';
import cartInfo from "../emitter.js";
import loadCart from "../emitter.js";

Object.keys(VeeValidateRules).forEach(rule => {
  if (rule !== 'default') {
    VeeValidate.defineRule(rule, VeeValidateRules[rule]);
  }
});
// 讀取外部的資源
VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');

// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'),
  validateOnInput: false, // 調整為：輸入文字時，就立即進行驗證
});


export default{
    data(){
        return{
         
        form: {
          user: {
            name: '',
            email: '',
            tel: '',
            address: '',
        },
          message: '',
      },

        cart:{},

        };
    },

    methods:{
      submitOrder(){
        const order=this.form;
        axios.post(`${apiUrl}/api/${path}/order`,{data:order})
                .then((res)=>{
                  console.log(res);
                  this.$refs.form.resetForm();
                  this.form.message="";
                  loadCart.emit('loadCart',this.selectedItem);
                })
                .catch((error)=>{console.dir(error);})
      }

    },

    mounted(){
      
    },

    created(){
      cartInfo.on('cartInfo',(data)=>{
        this.cart=data;
        console.log(this.cart);
      })
  },

    template:`<div class="my-5 row justify-content-center">
    <v-form ref="form" class="col-md-6" v-slot="{ errors }" @submit="submitOrder">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <v-field id="email" name="email" type="email" class="form-control"
                :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入 Email" rules="email|required"
                v-model="form.user.email"
                ></v-field>
        <error-message name="email" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="name" class="form-label">收件人姓名</label>
        <v-field id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
                placeholder="請輸入姓名" rules="required"
                v-model="form.user.name"></v-field>
        <error-message name="姓名" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="tel" class="form-label">收件人電話</label>
        <v-field id="tel" name="電話" type="text" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
                placeholder="請輸入電話" rules="required|min:8|max:10"
                v-model="form.user.tel"></v-field>
        <error-message name="電話" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="address" class="form-label">收件人地址</label>
        <v-field id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }"
                placeholder="請輸入地址" rules="required" 
                v-model="form.user.address"></v-field>
        <error-message name="地址" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="message" class="form-label">留言</label>
        <textarea id="message" class="form-control" cols="30" rows="10" 
        v-model="form.address"></textarea>
      </div>
      <div class="text-end">
        <button type="submit" class="btn btn-danger" 
        :disabled="Object.keys(errors).length>0 || cart.length===0">送出訂單</button>
      </div>
    </v-form>
  </div>`
}




