const apiUrl='https://vue3-course-api.hexschool.io/v2';
const path='williamone';
import emitter from "../emitter.js";
import loadCart from "../emitter.js";


export default{
    data(){
        return{
          selectedItem:{},
          itemQty:{},
          isLoading:"",
        };
    },

    methods:{
      selected(item){
        this.selectedItem=item;
        emitter.emit('sendProduct',this.selectedItem); //To productdetails.js
      },

      add2CartSingle(id_in){
        this.isLoading=id_in;
        console.log(id_in);
        axios.get(`${apiUrl}/api/${path}/cart`)
        .then((res)=>{
              let data={
                product_id:id_in,
                qty:1,
              };
              axios.post(`${apiUrl}/api/${path}/cart`,{data})
                      .then((res)=>{
                        console.log(res);
                        loadCart.emit('loadCart',this.selectedItem) //to cart.js for refreshing the cart
                        this.isLoading="";
                      })
                      .catch((error)=>{console.dir(error);})
            }
        )
      },

    },

    mounted(){
      
  },

    props:['productlist'],

    template:`<table class="table align-middle">
    <thead>
      <tr>
        <th>圖片</th>
        <th>商品名稱</th>
        <th>價格</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in productlist" :key="product.id">
      <td style="width: 200px">
      <div style="height: 100px; background-size: cover; background-position: center"
      :style="{ backgroundImage: 'url('+product.imageUrl+')' }">
      </div>
    </td>
        <td>
        </td>{{product.title}}<td>
          <!--<div class="h5">{{product.origin_price}}元</div>-->
          <del class="h6">原價{{product.origin_price}} 元</del>
          <div class="h5">現在只要 {{product.price}} 元</div>
        </td>
        <td>
          <div class="btn-group btn-group-sm">
            <button type="button" class="btn btn-outline-secondary" @click="selected(product)">
              <i class="fas fa-pulse"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger" @click="add2CartSingle(product.id)"
            :disabled="isLoading===product.id">
              <i class="fas fa-pulse" :class="{'fa-spinner':isLoading===product.id}"></i>
              加到購物車
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>`
}