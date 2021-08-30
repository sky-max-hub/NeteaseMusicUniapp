let User = {};
//验证手机号是否注册过
User.check_phone = function(phone, cb,cb2) {
	let url = config.API.CHECK_PHONE;
	let params = {
		phone: phone
	}
	
	request.get(url, params, (res)=> {
		if (res.statusCode == 200) {
			cb && cb(res.data)
		}else {
			console.log('failed');
		}
	})
}

//登陆
User.login = function(phone, password, cb) {
	let url = config.API.CELLPHONE_LOGIN;
	let params = {
		phone: phone,
		password: password
	}
	
	request.get(url, params, (res)=> {
		if (res.data) {
			let data = res.data
			console.log(data)
			if (data.code == 200) {
				// get_status((status)=> {
				// 	cb && cb(status);
				// },data.profile.userId);
				cb&&cb(data);
			}else {
				// console.log("登录错误")
				helper.toast('none', data.msg, 3000, false, 'bottom');
			}
		}else {
			console.log(res);
		}
	})
}
//用户注册
User.reg = function(phone, password, captcha, cb) {
	let url = config.API.PHONE_REG;
	let params = {
		phone: phone,
		password: password,
		captcha: captcha
	}
	request.post(url, params, (res)=> {
		console.log(res);
		cb && cb(res.data)
	})
}
//用户登出
User.logout = function(cb) {
	let url = config.API.LOGOUT;

	
	request.get(url, {}, (res)=> {
		
		if (res.statusCode == 200) {
			cb && cb(res.data)
		}else {
			console.log('failed');
		}
	})
}
//用户发出验证码
User.send_captcha = function(phone, cb) {
	let url = config.API.SEND_CAPTCHA;
	
	request.post(url, {phone: phone}, (res)=> {
		console.log(res);
		cb && cb(res.data)
	})
}
User.verify_captcha = function(phone, captcha, cb) {
	let url = config.API.VERIFY_CAPTCHA;
	let params = {
		phone: phone,
		captcha: captcha
	}
	
	request.get(url, params, (res)=> {
		console.log(res);
		cb && cb(res.data)
	})
}

//登录检查
User.check_login = function(cb) {
	
	get_status((res)=> {
		cb && cb(res);
	})
}

//获取用户mv,歌单, dj, 收藏数量
User.get_subcount = function(cb) {
	let url = config.API.SUBCOUNT;
	
	request.post(url, {}, (res)=> {
		let data = res.data;
		cb && cb(data);
	})
}

//获取用户资料
User.get_user_detail = function(uid, cb) {
	let url = config.API.USER_DETAIL;
	let params = {
		uid: uid
	}
	request.post(url, params, (res)=> {
		
		let data = res.data;
		if (data.code == 200) {
			
			cb && cb(data)
		}else {
			console.log('failed');
		}
	})
}

//获取用户歌单列表
User.get_playlist = function(uid, cb) {
	let url = config.API.USER_PLAYLIST;
	let params = {
		uid: uid
	}
	request.post(url, params, (res)=> {
		let data = res.data;
		if (data.code == 200) {
			cb && cb(data)
		}else {
			console.log('failed');
		}
	})
}
//获取用户喜欢的所有歌曲
User.get_likelist = function(uid, cb) {
	let url = config.API.USER_LIKE_LIST;
	let params = {
		uid: uid
	}
	request.post(url, params, (res)=> {
		let data = res.data;
		if (data.code == 200) {
			cb && cb(data)
		}else {
			console.log('failed');
		}
	})
}

User.like = function(music_id, like, cb) {
	let url = config.API.LIKE;
	let params = {
		id: music_id,
		like: like
	}
	request.post(url, params, (res)=> {
		let data = res.data;
		if (data.code == 200) {
			cb && cb(data)
		}else {
			console.log('failed');
		}
	})
}

//获取用户状态
function get_status(cb,userId) {
	let ts = new Date().getTime();
	let url = config.API.LOGIN_STATUS;
	
	request.get(url, {id: userId}, (res)=> {
		let data = res.data;
		console.log(data)
		if (data && data.code == 200) {
			cb && cb(data)
		}else {
			console.log('获取状态失败');
			cb && cb(false);
		}
	})
}



import config from '../config/config.js';
import request from '../utils/request.js';
import helper from '../helper/helper.js';


module.exports = User;