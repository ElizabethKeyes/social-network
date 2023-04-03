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
    AppState.likeIds = res.data.likeIds
    const index = AppState.posts.findIndex(p => p.id == postId)
    const foundPost = AppState.posts[index]
    AppState.posts.splice(index, 1, new Post(res.data))
  }

  async createPost(postData) {
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
  }

}

export const postsService = new PostsService()