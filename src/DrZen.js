import React, { useState, useRef, useEffect } from 'react'; // Import useEffect
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";
import './DrZen.css'; // Import CSS file for styles

const MODEL_NAME = "gemini-1.5-pro-latest";
const API_KEY = "AIzaSyBIaNmMNRlrIFpVXmyuaNQ20-yE72-4OkE"; // Replace with your actual API key

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

const generationConfig = {
    temperature: 0.7, // Adjust temperature for diversity of responses
    topK: 50, // Adjust top-k for diversity of responses
    topP: 0.95,
    maxOutputTokens: 6192,
};

const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
];

const DrZen = () => {
    const [inputText, setInputText] = useState('');
    const [responseText, setResponseText] = useState('');
    const [isTyping, setIsTyping] = useState(false); // Add state for typing effect
    const chatHistoryRef = useRef([]); // Use useRef to maintain chat history

    const handleSendMessage = async () => {
        if (inputText.trim() !== '') {
            const introText = "Pretend that you are Dr. Zen, an AI therapist who is working at SentimentZen. Your work is to make the user get over the negative emotion and make him feel good always tell him ways to feel better when user writes their feelings with you. Answer the question only if it is in your domain and dont ask any question with the user. Don't give answer for question's that don't involve emotions, Always introduce yourself before giving your answer. Here is the user input: ";

            const combinedInput = introText + inputText;

            const chat = model.startChat({
                generationConfig,
                safetySettings,
                history: chatHistoryRef.current, // Pass chat history
            });

            setIsTyping(true); // Set typing state to true

            const result = await chat.sendMessage(combinedInput);
            const response = result.response;

            setIsTyping(false); // Set typing state to false
            setResponseText(response.text());

            // Update chat history with the new message
            chatHistoryRef.current = result.history;
        }
    };

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    useEffect(() => {
        // Clear response text when input text changes
        setResponseText('');
    }, [inputText]);

    return (
        <div className="zen-chat-container">
            {isTyping && (
                <div className="zen-response-container">
                    <p><strong>Dr. Zen:</strong> Typing...</p>
                </div>
            )}
            {responseText && (
                <div className="zen-response-container">
                    <p><strong>Dr. Zen:</strong> {responseText}</p>
                </div>
            )}
            <div className="zen-input-container">
                <input
                    type="text"
                    value={inputText}
                    onChange={handleInputChange}
                    placeholder="Tell me what are you feeling..."
                />
                <button className='zen-button' onClick={handleSendMessage}>
                    {isTyping ? (
                        <div>
                            <i className="fa fa-spinner fa-pulse fa-fw"></i>
                            <span className="sr-only">Loading...</span>
                        </div>
                    ) : (
                        <span>Send</span>
                    )}
                </button>
            </div>

        </div>
    );
};

export default DrZen;
