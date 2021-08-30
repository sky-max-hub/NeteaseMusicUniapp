// 缓存统一管理

let Storage = {}

const LATEST_PLAYED = 'latest_played'; //最后一个播放记录
const CURRENT_PLAYLIST = 'current_playlist'; // 当前播放列表
const IS_LOGIN = 'is_login'; // 登录状态
const PLAY_MODE = 'play_mode';//播放模式
const PHONE = 'phone';
const PASSWORD = 'password';

Storage.getPhone = function() {
	return get(PHONE);
}
Storage.getPassword = function() {
	return get(PASSWORD);
}
Storage.setPhone = function(v) {
	set(PHONE,v);
	return;
}
Storage.setPassword = function(v) {
	set(PASSWORD,v);
	return;
}
Storage.is_login = function() {
	console.log("判断是否已经登陆")
	return get(IS_LOGIN);
}

Storage.set_is_login = function(v) {
	set(IS_LOGIN, v);
	return;
}

Storage.get_played = function() {
	return get(LATEST_PLAYED);
}

Storage.set_played = function(v) {
	set(LATEST_PLAYED, v);
	return;
}
Storage.get_current_playlist = function() {
	return get(CURRENT_PLAYLIST);
}

Storage.set_current_playlist = function(v) {
	set(CURRENT_PLAYLIST, v);
	return;
}

Storage.get_play_mode = function() {
	return get(PLAY_MODE);
}

Storage.set_play_mode = function(v) {
	set(PLAY_MODE, v);
	return;
}

function set(k, v) {
	try {
	    uni.setStorageSync(k, v);
	} catch (e) {
	    // error
		console.log("缓存失败")
		console.log(e)
	}
	return;
}

function get(k) {
	try {
	    return uni.getStorageSync(k);
	} catch (e) {
		console.log("读取缓存失败")
	    console.log(e);
	}
}

module.exports = Storage;