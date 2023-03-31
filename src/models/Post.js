import { Profile } from "./Account.js"

export class Post {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.creator = new Profile(data.creator)
    this.imgUrl = data.imgUrl
    this.likes = data.likes
    this.likeIds = data.likeIds
    this.createdAt = new Date(data.createdAt).toLocaleDateString()
    this.body = data.body
  }
}