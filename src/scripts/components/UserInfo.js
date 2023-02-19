export class UserInfo {
  constructor(nameSelector, infoSelector, avatarSelector) {
    this._name = document.querySelector(nameSelector)
    this._info = document.querySelector(infoSelector)
    this._avatar = document.querySelector(avatarSelector)

  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      profession: this._info.textContent
    }
  }

  setUserInfo(userData) {
    this._name.textContent = userData.name,
    this._info.textContent = userData.about
    this._userId = userData._id
  }

  editUserInfo({name, profession}) {
    this._name.textContent = name,
    this._info.textContent = profession
  }

  editAvatar(userData) {
    this._avatar.src = userData.avatar
  }

  getUserId() {
    return this._userId
  }
}



