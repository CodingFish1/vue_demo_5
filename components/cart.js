const apiUrl='https://vue3-course-api.hexschool.io/v2';
const path='williamone';
import loadCart from "../emitter.js";

export default{
    data(){
        return{
          cart:{},
          isLoading:"",
          isDeleting:"",
        };
    },

    methods:{
      getCart(){
        axios.get(`${apiUrl}/api/${path}/cart`)
            .then((res)=>{
              this.cart=res.data.data.carts;
            })
            .catch((error)=>{console.dir(error);})
        },

      delCart(){
        axios.delete(`${apiUrl}/api/${path}/carts`)
            .then((res)=>{
              this.getCart();
            })
            .catch((error)=>{console.dir(error);})
      },

      delItem(id){
        this.isDeleting=id;
        console.log(id);
        axios.delete(`${apiUrl}/api/${path}/cart/${id}`)
            .then((res)=>{
              this.getCart();
              this.isDeleting="";
            })
            .catch((error)=>{console.dir(error);})
      },

      updateCart(item){
        this.isLoading=item.id;
        let data={
          product_id:item.id,
          qty:item.qty,
        };

        axios.put(`${apiUrl}/api/${path}/cart/${item.id}`,{data})
                .then((res)=>{
                  console.log(res);
                  this.isLoading="";
                  this.getCart();
                })
                .catch((error)=>{console.dir(error);})
      },

    },

    mounted(){
      this.getCart();
      
  },

    created(){
      loadCart.on('loadCart',(data)=>{
        console.log(data);
        this.getCart();
      })
  },
    // props:[''],

    template:`<div class="text-end">
    <button class="btn btn-outline-danger" type="button" @click="delCart">清空購物車</button>
  </div>
  <table class="table align-middle">
    <thead>
      <tr>
        <th></th>
        <th>品名</th>
        <th style="width: 150px">數量/單位</th>
        <th>單價</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="cart"> 
        <tr v-for="item in cart" :key=item.product.id>
          <td>
            <button type="button" class="btn btn-outline-danger btn-sm" @click="delItem(item.id)">
              <i class="fas fa-pulse" :class="{'fa-spinner':isDeleting===item.id}"></i>
              x
            </button>
          </td>
          <td>
            {{item.product.title}}
            <div class="text-success">
              已套用優惠券
            </div>
          </td>
          <td>
            <div class="input-group input-group-sm">
              <div class="input-group mb-3">
                <select id="" class="form select" v-model="item.qty" @change="updateCart(item)" :disabled="isLoading===item.id">
                  <option :value="num" v-for="num in 20"
                    :key="item.id">
                    {{num}}
                  </option>
                </select>
                <span class="input-group-text" id="basic-addon2">{{ item.product.unit }}</span>
              </div>
            </div>
          </td>
          <td class="">
            <small class="text-success">折扣價：</small>
            {{ item.product.price }}
          </td>
        </tr>
      </template>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3" class="text-end">總計</td>
        <td class="text-end">{{}}</td>
      </tr>
      <!--<tr>
        <td colspan="3" class="text-end text-success">折扣價</td>
        <td class="text-end text-success">{{}}</td>
      </tr> -->
    </tfoot>
  </table>`
}