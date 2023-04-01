export class Profile {
  constructor(data) {
    this.id = data.id || data._id
    this.name = data.name
    this.picture = data.picture
    this.bio = data.bio
    this.github = data.github
    this.linkedin = data.linkedin
    this.name = data.name
    this.coverImg = data.coverImg
    this.graduated = data.graduated || false
    this.resume = data.resume
    this.class = data.class

  }
}
export class Account extends Profile {
  constructor(data) {
    super(data)
    this.email = data.email
  }
}
