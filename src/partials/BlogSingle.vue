<template>
  <section class="relative blog">
    <div class="max-w-6xl px-4 mx-auto sm:px-6">
      <div class="pt-32 pb-12 md:pt-40 md:pb-20">
        <div class="max-w-3xl mx-auto">
          <article>
            <header class="mb-8">
              <!-- Title and excerpt -->
              <div class="text-center md:text-left">
                <h1 class="mb-4 h1" data-aos="fade-up">
                  {{ blogInfo.title }}
                </h1>
              </div>
              <!-- Article meta -->
              <div class="mt-3 md:flex md:items-center md:justify-between">
                <!-- Author meta -->
                <div
                  class="flex items-center justify-center"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <div>
                    <span
                      class="text-3xl font-bold text-gray-200 transition duration-150 ease-in-out hover:text-gray-100"
                      >G1</span
                    >
                    <span class="text-gray-700"> - </span>
                    <span class="text-lg text-gray-500">{{ blogInfo.date }}</span>
                  </div>
                </div>
                <!-- Article tags -->
                <div
                  class="flex justify-center mt-4 md:mt-0"
                  data-aos="fade-up"
                  data-aos-delay="600"
                >
                  <ul class="flex flex-wrap -m-1 text-xs font-medium">
                    <template v-if="blogInfo.tags">
                      <li v-for="(item, key) in blogInfo.tags" :key="key" class="m-1">
                        <template v-for="(sub, index) in item" :key="index">
                          <a
                            class="inline-flex px-3 py-1 ml-2 text-center text-gray-100 transition duration-150 ease-in-out rounded-full"
                            :class="{
                              'bg-purple-600 hover:bg-purple-700': index % 2 === 0,
                              'bg-pink-600 hover:bg-pink-700 mt-2': index % 2 !== 0,
                            }"
                            >{{ sub }}</a
                          >
                        </template>
                      </li>
                    </template>
                  </ul>
                </div>
              </div>
            </header>

            <!-- Article content -->
            <div class="text-lg text-gray-400" v-html="blogInfo.content"></div>
          </article>
        </div>

        <!-- Related articles -->
        <aside class="mt-20">
          <News :post-id="postId" />
        </aside>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import News from './../partials/News.vue';

export default {
  name: 'BlogSingle',
  components: {
    News,
  },
  data() {
    return {
      postId: '',
      blogInfo: {},
    };
  },
  computed: {},
  watch: {
    $route(to, from) {
      if (to.fullPath != from.fullPath) {
        this.postId = to.query.postId;
        this.getBlogDetail();
      }
    },
  },
  mounted() {
    const query = this.$route.query;
    if (query) this.postId = query.postId;
    this.getBlogDetail();
  },
  methods: {
    getBlogDetail() {
      axios
        .get(
          `https://www.tistory.com/apis/post/read?access_token=0b7bbfa7570be764ea2cad5f2bf14f13_e4d18326293413702f78de129e7bbe09&output=json&blogName=yogaproject&postId=${this.postId}`
        )
        .then((res) => {
          const result = res;
          const item = result.data.tistory.item;
          this.blogInfo = item;
        });
    },
  },
};
</script>
<style scope="this api replaced by slot-scope in 2.5.0+">
.blog span {
  color: darkgray !important;
  font-weight: bold;
  background: none !important;
}
.blog iframe {
  width: 100% !important;
}
</style>
