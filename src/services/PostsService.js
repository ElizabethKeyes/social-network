import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PostsService {
  async getAllPosts() {
    const res = await api.get('/api/posts')
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.nextPage = res.data.older
    AppState.previousPage = res.data.newer
    logger.log('[ALL POSTS]', res.data)
    logger.log('[ALL CLASSED POSTS]', AppState.posts)
  }

  async getPostsByProfileId(profileId) {
    const res = await api.get('/api/posts', { params: { creatorId: profileId } })
    AppState.posts = res.data.posts.map(p => new Post(p))
  }

  async changePage(url) {
    const res = await api.get(url)
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.nextPage = res.data.older
    AppState.previousPage = res.data.newer
    window.scrollTo(0, 0)
  }
}

export const postsService = new PostsService()