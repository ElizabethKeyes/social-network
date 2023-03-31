import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},

  /** @type {import('./models/Account.js').Account} */
  account: {},

  /** @type {import('./models/Post.js').Post[]} */
  posts: [],

  /** @type {import('./models/Promo.js').Promo[]} */
  promos: [],

  /** @type {import('./models/Account.js').Profile|null} */
  activeProfile: null,

  nextPage: null,
  previousPage: null,

})
