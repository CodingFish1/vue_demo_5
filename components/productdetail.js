const apiUrl='https://vue3-course-api.hexschool.io/v2';
const path='williamone';
import emitter from "../emitter.js";
import loadCart from "../emitter.js";

export default{
    data(){
        return{
          modalOn:"",
          selected:{},
          itemCounter:"",
        };
    },

    methods:{
      add2Cart(){
        let data={
          product_id:this.selected.id,
          qty:this.itemCounter,
        };

        axios.post(`${apiUrl}/api/${path}/cart`,{data})
                .then((res)=>{
                  loadCart.emit('loadCart',this.selectedItem) //to cart.js for refreshing the cart
                  console.log(res);
                  this.modalOn.hide();
                })
                .catch((error)=>{console.dir(error);})
      },

    },

    mounted(){
      this.modalOn=new bootstrap.Modal(this.$refs.modaldom);
  },

    unmounted(){
      
    },

    created(){
      emitter.on('sendProduct',(data)=>{
        this.selected=data;
        this.modalOn.show();
        this.itemCounter=1;
      })
    }
    ,

    template:`<div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modaldom">
    <div class="modal-dialog modal-xl" role="document" >
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>{{selected.title}}</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-6">
              <img class="img-fluid" v-bind:src="selected.imageUrl" alt="">
            </div>
            <div class="col-sm-6">
              <span class="badge bg-primary rounded-pill">{{ }}</span>
              <p>商品描述：{{selected.description}}</p>
              <p>商品內容：{{selected.content}}</p>
              <div class="h5">{{selected.price}} 元</div>
              <del class="h6">原價 {{selected.origin_price}} 元</del>
              <div class="h5">現在只要 {{selected.price}} 元</div>
              <div>
                <div class="input-group">
                  <input type="number" class="form-control" min="1" v-model.number="itemCounter">
                  <button type="button" class="btn btn-primary" @click="add2Cart">加入購物車</button>
                </div>
              </div>
            </div>
            <!-- col-sm-6 end -->
          </div>
        </div>
      </div>
    </div>
  </div>`
}
























