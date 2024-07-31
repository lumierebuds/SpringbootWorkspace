export type Member = {
    userNo: number,
    nickName: string, 
    profile: string,
    userStatus? : number
    
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

export type ChatMessage = {
    message: string,
    createDate: string,
    userNo: number, 
    nickName: string, 
    profile : string 

}