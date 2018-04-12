# react-native-test-2018

My first testing project for React Native

## Features
* Fetch posts from an Instagram account
* Backend data processing by PHP
* Display posts in React Native project
* Can sort by like-count or comment-count
* Can show large size picture on modal window

![](https://github.com/xhalexhuang/react-native-test-2018/raw/master/picture/picture01.jpg)

![](https://github.com/xhalexhuang/react-native-test-2018/raw/master/picture/picture02.jpg)

## Remarks
#### Initialize Project (for example, create project 'mytest' on c:\rn)
```
cd c:\rn
react-native init mytest
```

#### Copy files
* Copy folder 'src' with files inside into folder 'mytest'
*	Copy file 'App.js' into folder 'mytest' (overwrite old file 'App.js')

#### Run project
```
cd c:\rn\mytest
react-native run-android
```
#### To change Instagram account ID on App.js
```javascript
...
constructor(props){
	super(props);
	this.state = {
	  isLoading: true,
	  account_id: 'caradelevingne',  // You can change the Instagram account ID
	  sort_id : 'like',
	  modalVisible : false,
	  modalImageUrl : "",
	}
}
...
```
