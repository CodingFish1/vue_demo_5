const apiUrl='https://vue3-course-api.hexschool.io/v2';
const path='williamone';

export default{
    data(){
        return{

        };
    },

    methods:{

    },

    mounted(){
      
  },
    props:[''],

    template:`<div class="text-end">
    <button class="btn btn-outline-danger" type="button">清空購物車</button>
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
      <template> 
        <tr>
          <td>
            <button type="button" class="btn btn-outline-danger btn-sm">
              <i class="fas fa-spinner fa-pulse"></i>
              x
            </button>
          </td>
          <td>
            {{  }}
            <div class="text-success">
              已套用優惠券
            </div>
          </td>
          <td>
            <div class="input-group input-group-sm">
              <div class="input-group mb-3">
                <input 
                     min="1" type="number" class="form-control">
                <span class="input-group-text" id="basic-addon2">{{  }}</span>
              </div>
            </div>
          </td>
          <td class="text-end">
            <small class="text-success">折扣價：</small>
            {{  }}
          </td>
        </tr>
      </template>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3" class="text-end">總計</td>
        <td class="text-end">{{  }}</td>
      </tr>
      <tr>
        <td colspan="3" class="text-end text-success">折扣價</td>
        <td class="text-end text-success">{{  }}</td>
      </tr>
    </tfoot>
  </table>`
}