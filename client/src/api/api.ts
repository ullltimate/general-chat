import axios from "axios";

const urlAPI: string = 'https://general-chat-production.up.railway.app'

export const getMessages = async (setMessages: any, setDefaultTags:any, setOnTags: any) => {
    try {
        const response = await axios.get(`${urlAPI}/messages`);
        setMessages(response.data);
        setDefaultTags(Array.from(new Set(response.data.map((el:any)=>el.tags).flat())));
        setOnTags(Array.from(new Set(response.data.map((el:any)=>el.tags).flat())).concat([[]]))
    } catch (error: any) {
        console.log(error.response.data.message)
    }
}

export const addMessage = async (messageText: string, tags?: any) => {
    try {
        const response = await axios.post(`${urlAPI}/message`, {
           messageText,
           tags
        })
        console.log(response.data.message)
    } catch (error: any) {
        console.log(error.response.data.message)
    }
}

export const filterMessage = async (tags: any, setMessages: any) => {
    try {
        const response = await axios.post(`${urlAPI}/tags`, {
           tags
        })
        setMessages(response.data)
    } catch (error: any) {
        console.log(error.response.data.message)
    }
}