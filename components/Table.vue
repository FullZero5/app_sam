<!-- Please remove this file from your project -->
<template>
   <table class="table-auto min-w-full">
    <thead>
        <tr>
          <th v-for="(key, index) in columns"
              :key="index"
              @click="sortBy(key)"
              :class="{ active: sortKey == key }"
              class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
              {{ key | capitalize  }}
              <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
              </span>
            </th>
        </tr>
    </thead>
    <tbody class="bg-white">
        <tr v-for="(item, index) in filteredComments" :key="index" class="cursor-pointer" @click="detailed(item.id)">           
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              <div class="flex items-center">
                  <div>
                    <div class="text-sm leading-5 text-gray-800"># {{item.id}}</div>
                  </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
              <div class="text-sm leading-5 text-blue-900">
                 {{item.name}}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{{item.email}}</td>
        </tr>
    </tbody>  
  </table>
</template>

<script>

export default {
  name: 'Table',
  props: ['comments', 'columns', 'filterKey'],
  data (){
    let sortOrders = {};
    this.columns.forEach(key => {sortOrders[key] = 1;})
    return {
     sortKey: "",
            sortOrders: sortOrders
    }
  },
  filters: {
    capitalize(str) {
     return str.charAt(0).toUpperCase() + str.slice(1);
    }
  },
  computed: {
    filteredComments() {
      let sortKey = this.sortKey,
          filterKey = this.filterKey && this.filterKey.toLowerCase(),
          order = this.sortOrders[sortKey] || 1,
          comments = this.comments
      if (filterKey) {
              comments = comments.filter(row => {
                return Object.keys(row).some(key => {
                  return (
                    String(row[key])
                      .toLowerCase()
                      .indexOf(filterKey) > -1
                  );
                });
              });
        }
      if (sortKey) {
        comments = comments.slice().sort((a, b) => {
                a = a[sortKey];
                b = b[sortKey];
                return (a === b ? 0 : a > b ? 1 : -1) * order;
              });
            }
      return comments;
    }
  },
  methods: {
    detailed(id){
     this.$router.push({ path: `/comment/${id}` })
    },
    sortBy(key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
    }
  }
}
</script>

<style scoped>
th {
  background-color: #42b983;
  color: rgba(255, 255, 255, 0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
th.active {
  color: #fff;
}
th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
</style>
