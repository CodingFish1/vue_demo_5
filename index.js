const apiUrl='https://vue3-course-api.hexschool.io/v2';
const path='williamone';

import productmodal from "./components/product.js";
import cart from "./components/cart.js";
import selecteditem from "./components/productdetail.js";

const App={
    data(){
        return {
            tempProduct:{
                imagesUrl:[],
            },
            axiosStatus:"",
            modalTitle:"",

            itemToDel:[],
            products: [],
            // selectedItem:{},
            itemCounter:"",

            pdetails:"",
                }
    },

    components:{productmodal,cart,selecteditem},
    
    methods:{
        getProduct(){
            axios.get(`${apiUrl}/api/${path}/products/all`)
                .then((res)=>{
                    this.products=res.data.products;
                    this.itemCounter=Object.values(this.products).length;
                    console.log("Hi");
                })
                .catch((error)=>{console.dir(error);})
            },
    },

    mounted(){
        this.getProduct();

        this.pdetails = new bootstrap.Modal(this.$refs.productDOM);
        // this.pdetails=new bootstrap.Modal(document.getElementById('productModal'))
        console.log(this.$refs);
        // this.pdetails.show();
    }

}



Vue.createApp(App).mount('#app');