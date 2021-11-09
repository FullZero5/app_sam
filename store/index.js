export const state = () => ({
    comments: []
  })
  
  export const mutations = {
    addComments (state, comments) {
        state.comments = comments
      },
  }

  export const actions ={
    async getComments({ commit }){
        const { comments } = await $http.$get('https://jsonplaceholder.typicode.com/comments?_limit=10')
        commit('addComments', comments)
    }
 }