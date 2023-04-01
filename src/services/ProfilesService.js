import { AppState } from "../AppState.js"
import { Account, Profile } from "../models/Account.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { postsService } from "./PostsService.js"

class ProfilesService {
  async getProfileById(profileId) {
    const res = await api.get(`/api/profiles/${profileId}`)
    AppState.activeProfile = new Profile(res.data)
    window.scrollTo(0, 0)
  }

  async updateProfileInfo(profileData) {
    const res = await api.put('/account', profileData)
    AppState.account = new Account(res.data)
    AppState.activeProfile = new Profile(res.data)
    for (let i = 0; i < AppState.posts.length; i++) {
      if (AppState.posts[i].creatorId == AppState.account.id) {
        AppState.posts[i].creator = AppState.account
      }
    }
  }
}

export const profilesService = new ProfilesService()