import React, { useState } from 'react';
import Chart from 'chart.js/auto';
import Songs from './Songs';
import Books from './Books';
import Podcast from './Podcast';
import Movie from './Movie';
import DrZen from './DrZen';
import Yoga from './Yoga';
import './Startt.css';
import soundFile from './voice.wav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
let tempEmo;
const Startt = () => {
    const [showDrZenComponent, setShowDrZenComponent] = useState(false);
    const [chartInstance, setChartInstance] = useState(null);
    const [suggestionsVisible, setSuggestionsVisible] = useState(false);
    const [emotionLabel, setEmotionLabel] = useState(null);
    const [selectedComponent, setSelectedComponent] = useState(null);
    const [loading, setLoading] = useState(false); // State to manage loading state

    const performQuery = async () => {
        const queryInput = document.getElementById('queryInput').value.trim();

        if (queryInput !== '') {
            try {
                setLoading(true); // Show loading state

                const response = await queryApi({ inputs: queryInput });
                const responseData = response[0];
                const data = responseData.map(({ label, score }) => ({ label, score }));
                tempEmo = data[0].label;
                const ctx = document.getElementById('myChart');
                const newChartInstance = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: data.map(row => row.label),
                        datasets: [{
                            label: data[0].label,
                            data: data.map(row => row.score),
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.8)',
                                'rgba(54, 162, 235, 0.8)',
                                'rgba(255, 206, 86, 0.8)',
                                'rgba(75, 192, 192, 0.8)',
                                'rgba(153, 102, 255, 0.8)',
                                'rgba(255, 159, 64, 0.8)'
                            ],
                            borderColor: [
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 99, 132, 1)',
                                'rgba(255, 159, 64, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(153, 102, 255, 1)'
                            ],
                            borderWidth: 2
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    font: {
                                        size: 30, // Adjust font size as needed
                                        family: 'Arial', // Specify font family
                                        style: 'italic', // Specify font style
                                        // Specify font weight
                                    },
                                    color: '#fff', // Specify font color
                                }
                            },
                            x: {
                                ticks: {
                                    font: {
                                        size: 30,
                                        family: 'Arial',
                                        style: 'italic',

                                    },
                                    color: '#fff',
                                }
                            },

                        }
                    }
                });

                setChartInstance(newChartInstance);
                setEmotionLabel(data[0].label);
                showSuggestions();
                showChart();
            } catch (error) {
                console.error('Error performing query:', error);
            } finally {
                setLoading(false); // Hide loading state regardless of success or error
            }
        } else {
            console.warn('Query input is empty');
        }
    };

    const handleButtonClick = (label) => {
        setEmotionLabel(label); // Set emotion label based on button clicked
        setSelectedComponent(label.toLowerCase()); // Set selected component based on button clicked

        // Scroll to the recommendations section
        document.getElementById('recommend').scrollIntoView({ behavior: 'smooth' });
    };

    const redirectToPage = (pageUrl) => {
        window.location.href = pageUrl;
    };

    const queryApi = async (data) => {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions",
            {
                headers: { Authorization: "Bearer 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" },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        const result = await response.json();
        return result;
    };

    const showChart = () => {
        document.getElementById('queryInput').style.display = 'none';
        document.getElementById('submitBtn').style.display = 'none';
        document.getElementById('submitBtn').style.display = 'none';
        document.getElementById('speechRecognitionBtn').style.display = 'none';
        document.getElementById('suggestionsSection').style.display = 'block';
    };

    const showSuggestions = () => {
        setSuggestionsVisible(true);
    };
    const [iconColor, setIconColor] = useState('initial');
    const [isPlaying, setIsPlaying] = useState(false);
    const startSpeechRecognition = () => {
        setIconColor('red');
        playSound();
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.start();
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                document.getElementById('queryInput').value = transcript;
                const inputEvent = new Event('input', { bubbles: true });
                document.getElementById('queryInput').dispatchEvent(inputEvent);
            };

            recognition.onerror = (event) => {
                console.error('Speech Recognition Error:', event.error);
            };

            recognition.onend = () => {
                console.log('Speech Recognition Ended');
            };
        } else {
            console.error('Speech Recognition not supported in this browser');
        }
    };
    const playSound = () => {
        const audio = new Audio(soundFile);
        audio.play();
        setIsPlaying(true);
        audio.onended = () => {
            setIsPlaying(false); // Reset state when sound ends
            setTimeout(() => {
                setIconColor('initial'); // Reset icon color to its original color after a delay
            }, 5000);
        }; // Reset state when sound ends
    };
    // Render the selected component based on button click
    const renderSelectedComponent = () => {
        switch (selectedComponent) {
            case 'songs':
                return <Songs emotionLabel={tempEmo} />;
            case 'books':
                return <Books emotionLabel={tempEmo} />;
            case 'podcast':
                return <Yoga emotionLabel={tempEmo} />;
            case 'movies':
                return <Movie emotionLabel={tempEmo} />;
            default:
                return null;
        }
    };
    const handleDrZenClick = () => {
        // Toggle visibility of DrZen component
        setShowDrZenComponent(!showDrZenComponent);
    };

    return (
        <div className="content">
            {/* <p>Take a moment to immerse yourself in the beauty of life's simple joys. Let the gentle whispers of nature soothe your soul, as you embrace the warmth of a sun-kissed breeze.</p>
            <p> Feel the rhythm of your heartbeat synchronize with the melody of the universe, reminding you of the infinite possibilities that lie ahead. Allow gratitude to fill your heart and gratitude to guide your path.</p> */}
            <div className="container">
                <div className="inputt">
                    <input type="text" id="queryInput" placeholder="How are you feeling?" />
                </div>
                <div className="input-container" id="textInputLabel">
                    <button id="submitBtn" onClick={performQuery} >
                        {loading ? (
                            <div>
                                <i className="fa fa-spinner fa-pulse fa-fw"></i>
                                <span className="sr-only">Loading...</span>
                            </div>
                        ) : (
                            <span>Analyze</span>
                        )}
                        {loading && "Analyzing..."}
                    </button>
                    <button id="speechRecognitionBtn" onClick={startSpeechRecognition}>
                        Voice Input <FontAwesomeIcon icon={faMicrophone} style={{ color: iconColor }} />
                    </button>
                </div>
                <div className="chartt">
                    <canvas id="myChart"></canvas>
                    <p id="firstemotionText">{emotionLabel && `Based on the analysis you seem to be feeling: ${tempEmo}`}</p>
                </div>
                {suggestionsVisible && (
                    <div id="suggestionsSection">
                        <p id="emotionText">Here are some suggestions based on your mood:</p>
                        <div className="suggestions-container">
                            <button className="button" onClick={() => handleButtonClick('Songs')}>
                                <img src="imgs/song.png" alt="Songs" />
                                <h2 className='textt'>Songs</h2>
                            </button>
                            <button className="button" onClick={() => handleButtonClick('Books')}>
                                <img src="imgs/book.png" alt="Books" />
                                <h2 className='textt'>Books</h2>
                            </button>
                            <button className="button" onClick={() => handleButtonClick('Podcast')}>
                                <img src="imgs/meditation.png" alt="Podcast" />
                                <h2 className='textt'>Meditaion and Yoga</h2>
                            </button>
                            <button className="button" onClick={() => handleButtonClick('Movies')}>
                                <img src="imgs/movie.png" alt="Movies" />
                                <h2 className='textt'>Movies</h2>
                            </button>
                            <button className="button" onClick={() => handleButtonClick('Podcasts')}>
                                <img src="imgs/podcast.png" alt="Soon..." />
                                <h2 className='textt'>Podcast (Soon...)</h2>
                            </button>

                        </div>
                        <a href="#" onClick={handleDrZenClick} className="dr-zen-button">
                            Chat with Dr. Zen 
                        </a>
                        {/* Display DrZen component only when showDrZenComponent is true */}
                        {showDrZenComponent && (
                            <div className="drzen-container">
                                <DrZen />
                            </div>
                        )}
                    </div>

                )}
            </div>
            <div id="recommend">
                {selectedComponent && renderSelectedComponent()}
            </div>
        </div>
    );
};

export default Startt;
