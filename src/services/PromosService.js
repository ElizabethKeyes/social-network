import { AppState } from "../AppState.js"
import { Promo } from "../models/Promo.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PromosService {
  async getPromos() {
    const res = await api.get('/api/ads')
    AppState.promos = res.data.map(p => new Promo(p))
    logger.log('[CLASSED PROMOS]', AppState.promos)
  }
}

export const promosService = new PromosService()