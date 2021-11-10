<template>
<div id="content" class="bg-center bg-cover bg-no-repeat h-screen items-center justify-center flex flex-col">
		<div id="moka-w1wgf" class="items-center justify-center w-full p-8 flex flex-col">
			<div class="bg-gray-400 items-center justify-center md:w-1/2 w-full shadow-md p-5 h-auto rounded-lg blur-3 bg-opacity-50 flex flex-col col-span-12">
				<h4 class="border-red-500 h-20">
          {{ comment.name }}
				</h4>
				<h4 class="text-orange-300 text-2xl">
          {{ comment.body }}
        </h4>
				<h2 class="text-center mt-2 mb-20" >{{ comment.email }}</h2>
        <input name="action" onclick="history.back()" type="submit" value="Back" class="hover:text-gray-300 bg-yellow-800 text-white hover:bg-black w-56 p-4 text-2xl font-bold"/>
			</div>
		</div>
	</div>
</template>

<script>
  export default {
    name: 'ItemComment',
    async asyncData({ params, $axios  }) {
      const comment = await $axios.$get(`comment?id=${parseInt(params.slug)|| 1}`)
      return { comment }
    }
  }
</script>
