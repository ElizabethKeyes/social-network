export class Profile {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.picture = data.picture
    this.bio = data.bio
    this.github = data.github
    this.linkedin = data.linkedin
    this.name = data.name
    this.coverImg = data.coverImg
    this.graduated = data.graduated || false
    this.resume = data.resume

  }
}
export class Account extends Profile {
  constructor(data) {
    super(data)
    this.email = data.email
  }
}
