import {defineStore} from 'pinia'

export const useStore = defineStore('searchParams',{
  state:()=>{
    return{
      checked:null,
      searchAll:'',
      searchEither:'',
      searchNeither:''
    }
  }

})

export const detailStore = defineStore('detailStore',{
  state:()=>{
    return{
      id:0
    }
  }
})