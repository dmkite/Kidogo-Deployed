export const ADD_MESSAGE = 'ADD_MESSAGE'
export function addMessage(msg){
  return {
    type: ADD_MESSAGE,
    payload: msg
  }
}

export const TAKE_TEMP_PIC = 'TAKE_TEMP_PIC'
export function takeTempPic(uri){
  return {
    type: TAKE_TEMP_PIC,
    payload: uri
  }
}