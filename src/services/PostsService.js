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
  }

  async getPostsByProfileId(profileId) {
    const res = await api.get('/api/posts', { params: { creatorId: profileId } })
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.nextPage = res.data.older
    AppState.previousPage = res.data.newer
    logger.log('[ALL POSTS FROM PROFILE]', res.data)
  }

  async changePage(url) {
    const res = await api.get(url)
    AppState.posts = res.data.posts.map(p => new Post(p))
    AppState.nextPage = res.data.older
    AppState.previousPage = res.data.newer
    window.scrollTo(0, 0)
  }

  async likePost(postId) {
    const res = await api.post(`/api/posts/${postId}/like`)
    logger.log('[LIKED POST]', res.data)
    AppState.likeIds = res.data.likeIds
    const index = AppState.posts.findIndex(p => p.id == postId)
    const foundPost = AppState.posts[index]
    AppState.posts.splice(index, 1, new Post(res.data))
    logger.log('[AFTER SPLICE]', AppState.posts)
  }

  async createPost(postData) {
    logger.log('[POSTDATA]', postData)
    const res = await api.post(`api/posts`, postData)
    logger.log(res.data)
  }

  togglePhotoInput() {
    AppState.photoInput = !AppState.photoInput
  }
}

export const postsService = new PostsService()