import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

const apiUrl='https://vue3-course-api.hexschool.io/v2';
const path='williamone';

import productmodal from "./components/pmodal.js";

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
            selectedItem:{},
            itemCounter:"",
                }
    },

    components:{productmodal},
    
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
    }

}



Vue.createApp(App).mount('#app');