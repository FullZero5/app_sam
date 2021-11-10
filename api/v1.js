async function getDataFromDB() {
    return (await require("axios").get(`https://jsonplaceholder.typicode.com/comments`))
      .data;
  }
  
  async function comments({page, limit}) {
    let res = await getDataFromDB();
    return res.slice((page - 1) * limit, page * limit);
  }
  
  async function comment({ id }) {
    let res = await getDataFromDB();  
    return res.filter(el => el.id == id)[0];
  }
  
  export { comments, comment };
