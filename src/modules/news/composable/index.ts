import NewsService from '@modules/news/service'
import { onMounted, ref } from 'vue'
import { ICreateNews, INews } from '@modules/news/interfaces'

const newsList = ref<INews[]>([])
const currentNews = ref<INews>()
const createNewsModel = ref<ICreateNews>({
  description: '',
  name: '',
  preview: '',
})

export function useNews() {
  onMounted(() => {
    if (newsList.value.length === 0) {
      fetchAllNews()
    }
  })

  function fetchAllNews() {
    NewsService.fetchAllNews().then(response => {
      console.log(response.data)
      newsList.value = response
    })
  }

  function updateNewsById() {
    if (!currentNews.value) return

    NewsService.updateNewsById(currentNews.value).then(response => {
      console.log(response.data)
    })
  }

  function createNews() {
    if (!createNewsModel.value) return

    NewsService.createNews(createNewsModel.value).then(response => {
      console.log(response.data)
    })
  }

  function fetchNewsById(newsId: number) {
    NewsService.fetchNewsById(newsId).then(response => {
      console.log(response)
      currentNews.value = response
    })
  }

  return {
    newsList,
    fetchAllNews,
    updateNewsById,
    fetchNewsById,
    currentNews,
    createNews,
    createNewsModel,
  }
}
