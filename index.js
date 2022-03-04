const apiUrl='https://vue3-course-api.hexschool.io/v2';
const path='williamone';



import productlist from "./components/productlist.js";
import cart from "./components/cart.js";
import productdetail from "./components/productdetail.js";
import formport from "./components/form.js";

const App=Vue.createApp({
    data(){
        return {
            tempProduct:{
                imagesUrl:[],
            },

            products: [],
            selectedItem:{},

                }
    },

    components:{productlist,cart,productdetail,formport},
    
    methods:{
        getProduct(){
            axios.get(`${apiUrl}/api/${path}/products/all`)
                .then((res)=>{
                    this.products=res.data.products;
                    this.itemCounter=Object.values(this.products).length;
                })
                .catch((error)=>{console.dir(error);})
            },
        
        openModal(){
            this.$refs.pmodal.openModal();
        },
    },

    mounted(){
        this.getProduct();
    }

});

App.component('VForm', VeeValidate.Form);
App.component('VField', VeeValidate.Field);
App.component('ErrorMessage', VeeValidate.ErrorMessage);

App.mount('#app');
