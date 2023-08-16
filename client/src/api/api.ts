import axios from "axios";

const urlAPI: string = 'http://localhost:4000'

export const getMessages = async (setMessages: any) => {
    try {
        const response = await axios.get(`${urlAPI}/messages`);
        setMessages(response.data);
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