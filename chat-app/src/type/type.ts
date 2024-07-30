

export type Member = {
    userNo: number,
    nickName: string, 
    profile : string
}

export const initMember: Member = {
    userNo: 0,
    nickName: '',
    profile:''
}

export type ChatRoom = {
    chatRoomNo: number,
    title: string,
    nickName: string,
    cnt: number
}