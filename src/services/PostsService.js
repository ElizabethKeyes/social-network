import { AppState } from "../AppState.js"
import { Profile } from "../models/Account.js"
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
    AppState.posts.unshift(new Post(res.data))
  }

  togglePhotoInput() {
    AppState.photoInput = !AppState.photoInput
  }

  async deletePost(postId) {
    const res = await api.delete(`/api/posts/${postId}`)
    AppState.posts = AppState.posts.filter(p => p.id != postId)
  }

  async searchContent(query) {
    const res = await api.get(`/api/posts?query=${query}`)
    const res2 = await api.get(`/api/profiles?query=${query}`)
    AppState.searchedProfiles = res2.data.map(p => new Profile(p))
    AppState.posts = res.data.posts.map(p => new Post(p))
    logger.log('[SEARCHED POSTS]', AppState.posts)
    logger.log('[SEARCHED PROFILES]', AppState.searchedProfiles)
  }

}

export const postsService = new PostsService()