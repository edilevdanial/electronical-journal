import { createNews, fetchAllNews, fetchNewsById, updateNewsById } from '@modules/news/http'
import { ICreateNews, INews } from '@modules/news/interfaces'

class NewsService {
  public fetchAllNews = () => {
    return fetchAllNews().then(response => {
      console.log(response.data)

      return response.data
    })
  }

  public fetchNewsById = (newsId: number) => {
    return fetchNewsById(newsId).then(response => {
      console.log(response.data)

      return response.data
    })
  }

  public createNews = (news: ICreateNews) => {
    return createNews(news).then(response => {
      console.log(response.data)

      return response.data
    })
  }

  public updateNewsById = (news: INews) => {
    return updateNewsById(news).then(response => {
      console.log(response.data)

      return response.data
    })
  }
}

export default new NewsService()
