import api from '@services/api'
import { ICreateNews, INews } from '@modules/news/interfaces'

export function fetchAllNews() {
  return api.get('/api/news')
}

export function fetchNewsById(newsId: number) {
  return api.get('/api/news/' + newsId)
}

export function updateNewsById(news: INews) {
  return api.post('/api/news/' + news.id, news)
}

export function createNews(news: ICreateNews) {
  return api.post('/api/create-news/', news)
}
