import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL =  'https://general-chat-production.up.railway.app/';

export const socket = io(URL);