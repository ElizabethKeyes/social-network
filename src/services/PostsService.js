import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PostsService {
  async getAllPosts() {
    const res = await api.get('/api/posts')
    AppState.posts = res.data.posts.map(p => new Post(p))
  }

  async getPostsByProfileId(profileId) {
    const res = await api.get('/api/posts', { params: { creatorId: profileId } })
    AppState.posts = res.data.posts.map(p => new Post(p))
  }
}

export const postsService = new PostsService()