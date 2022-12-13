import axios from "axios";
export class getMessages {
    static serverURL = 'http://localhost:9001'
    static createMessage(message){
        let dataURL = `${this.serverURL}/messages`;
        return axios.get(dataURL,message)
    }

    static replyMessage(message){
        let dataURL = `${this.serverURL}/messages`;
        return axios.post(dataURL,message)
    }
}
//  export const getMessages = async()=> {
//     return await axios.get(`${process.env.REACT_APP_API}`);
//  }
