export function get_time_stamp(){
	let timestamp = new Date().getTime()
	return timestamp
}
export function local_save_get(key){
	return localStorage.getItem(key)
}
export function local_save_set(key,data){
	return localStorage.setItem(key,data)
}
export function local_save_remove(key){
	return localStorage.removeItem(key)
}
