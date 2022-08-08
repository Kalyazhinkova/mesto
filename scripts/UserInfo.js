export default class UserInfo {
  constructor (nameSelector, descriptionSelector) {
    this._userName = document.querySelector(nameSelector);
    this._userDescription = document.querySelector(descriptionSelector);
  }

  getUserInfo(){
    return {userName: this._userName.textContent, userDescription: this._userDescription.textContent,};
    // this._userInfo = {
    //  userName: this._userName.textContent,
    //  userDescription: this._userDescription.textContent
    // };
    // return this._userInfo;
  }

  setUserInfo({name, description})
  {
    this._userName.textContent = name;
    this._userDescription.textContent = description;
  }
}