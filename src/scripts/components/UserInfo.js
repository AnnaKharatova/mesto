export class UserInfo {
  constructor(nameSelector, infoSelector) {
    this._name = document.querySelector(nameSelector)
    this._info = document.querySelector(infoSelector)
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      profession: this._info.textContent
    }
  }

  setUserInfo({ name, profession }) {
    this._name.textContent = name,
    this._info.textContent = profession
  }
}

