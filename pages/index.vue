<template>
 <div class="container"
  <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
    <div class="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">
      <div class="flex justify-between">
        <div class="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12 bg-transparent">
            <div class="flex flex-wrap items-stretch w-full h-full mb-6 relative">
              <div class="flex">
                <span class="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm">
                   <svg width="18" height="18" class="w-4 lg:w-auto" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z" stroke="#455A64" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M16.9993 16.9993L13.1328 13.1328" stroke="#455A64" stroke-linecap="round" stroke-linejoin="round" />
                   </svg>
                </span>
          </div>
          <input v-model="searchQuery" type="text" class="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px flex-1 border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs lg:text-xs lg:text-base text-gray-500 font-thin" placeholder="Search">
        </div>
      </div>
    </div>
    </div>
    <div class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <Table :comments="comments" :columns="columns" :filter-key="searchQuery"/>
        <div class="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans">
    <div>
        <p class="text-sm leading-5 text-blue-700">
                Showing
                <span class="font-medium">{{ limit  }}</span>
                to
                <span class="font-medium">{{ page }}</span>
                of
                <span class="font-medium">{{ total }}</span>
                results
        </p>
    </div>
    <div>
      <nav class="relative z-0 inline-flex shadow-sm">
        <div>
            <button v-if = "page !== 1" @click="onChange(true)" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150" aria-label="Previous">
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
        </div>
        <div>
          <nuxt-link 
            v-for="(item, index) in pagination"
            :class="{ disabled: isNaN(item) }"
            :key="index"
            :to="{ path: '/', query: { page: item }}"
            class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-blue-700 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-tertiary active:text-gray-700 transition ease-in-out duration-150 hover:bg-tertiary"
            exact>
            {{ item }}
          </nuxt-link>
        </div>
        <div>
             <button v-if = "page !== total/limit" @click="onChange(false)" class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150" aria-label="Next">
                 <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
             </button>
        </div>
      </nav>
    </div>
  </div></div>
    </div>
  </div>
  </div>
</template>

<script>
import Table from '~/components/Table.vue'

export default {
  name: 'allComments',
  components: {
    Table
  },
  data() {
    return {
      searchQuery: '',
      comments: [],
      columns: ['id', 'name', 'email'],
      page: parseInt(this.$route.query.page, 10) || 1,
      paginateFront: parseInt(this.$route.query.page, 10) + 1,
      paginateBack: parseInt(this.$route.query.page, 10) - 1,
      limit: 10,
      total: 500,
      delta: 2
    };
  },
  computed: {
    pageCount(){
      return this.total/this.limit
    },
    pagination(){
      const separate = (a, b) => [a, ...({
        0: [],
        1: [b],
        2: [a + 1, b],
      }[b - a] || ['...', b])]

      return Array(this.delta * 2 + 1)
        .fill()
        .map((_, index) => this.page - this.delta + index)
        .filter(page => 0 < page && page <= this.pageCount)
        .flatMap((page, index, { length }) => {
          if (!index) return separate(1, page)
          if (index === length - 1) return separate(page, this.pageCount)
          return [page]
        })
    }
  },
  watch:{
    $route (to, from){
      let { page } = to.query
      this.page = parseInt(page, 10)
      this.getComments()
   }
  },
  async asyncData({ route, $axios }) {
    const page = parseInt(route.query.page, 10) || 1
    const limit = parseInt(route.query.limit, 10) || 10
    const comments = await $axios.$get(`/comments?_page=${page}&_limit=${limit}`)
    return { comments }
  },
  methods: {
    onChange(bool) {
      if(!bool){
        this.page = parseInt(this.page, 10)+1
      }else{
        this.page = parseInt(this.page, 10)-1
      }
      this.$router.push({ query: { page: this.page } });
      //this.getComments()
    },
    async getComments(){
      this.comments = await this.$axios.$get(`/comments?_page=${this.page}&_limit=${this.limit}`)
    }
  }
}
</script>

<style scoped>
.disabled {
  pointer-events: none;
  cursor: default;
  opacity: 0.6;
}
</style>
