export default class UserInfo {
  constructor (nameSelector, descriptionSelector, avatarSelector) {
    this.userName = document.querySelector(nameSelector);
    this.userDescription = document.querySelector(descriptionSelector);
    this.avatar = document.querySelector(avatarSelector);
    this._currentUser = {};
  }

  getUserInfo(){
    return this._currentUser;
  }

  setUserInfo(currentUser)
  { 
    this._currentUser = currentUser;
    this.userName.textContent = currentUser.name;
    this.userDescription.textContent = currentUser.about;
  }
  
  setAvatar({avatar}) {
    this.avatar.src = avatar;
  }
}