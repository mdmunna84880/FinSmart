import axios from 'axios';

/** Test script for the chat message API endpoint. */
const testChatApi = async () => {
    try {
        const response = await axios.post('http://localhost:8000/api/chat/message', {
            message: "Hello",
            sessionId: null
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
    }
};

testChatApi();
