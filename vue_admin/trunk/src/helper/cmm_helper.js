import SysCfg from '../config/SysCfg'
export function get_time_stamp(){
	let timestamp = new Date().getTime()
	return timestamp
}
export function local_save_get(key){
	key = SysCfg.localStorePrefix+key
	return localStorage.getItem(key)
}
export function local_save_set(key,data){
	key = SysCfg.localStorePrefix+key
	return localStorage.setItem(key,data)
}
export function local_save_remove(key){
	key = SysCfg.localStorePrefix+key
	return localStorage.removeItem(key)
}
