import React, { useState, useEffect, useRef } from 'react';
import {
    Users, Map as MapIcon, Trophy, Compass, ArrowRight, Check, X,
    Clock, Play, MapPin, ChevronRight, HelpCircle, LayoutGrid, AlertCircle, ChevronLeft
} from 'lucide-react';

const QUESTIONS = [
    { id: 1, type: 'mcq', text: "Which ground is located directly next to the Pokhar (Location 6)?", options: ["Basketball Court", "Kabaddi Ground", "Cricket Ground", "Badminton Court"], correctAnswer: "Kabaddi Ground", points: 20, penalty: -5 },
    { id: 2, type: 'text', text: "What is the location number of the Civil Department?", correctAnswer: "14", points: 20, penalty: 0 },
    { id: 3, type: 'mcq', text: "Find the hidden treasure! It's near a danger zone next to the Park Area. Where is it?", options: ["Faculty Quater (21)", "Professor Quater (23)", "Mandir (22)", "Radhey Hostel (12)"], correctAnswer: "Faculty Quater (21)", points: 20, penalty: -5 },
    { id: 4, type: 'text', text: "Which location is marked with number 8?", correctAnswer: "sudha shop", points: 20, penalty: 0 },
    { id: 5, type: 'mcq', text: "Which three locations form a cluster between the Main Gate and the Hostels?", options: ["Sudha, Canteen, Gym", "Bank, Workshop, EGD", "Pokhar, Net, Ground", "None of these"], correctAnswer: "Sudha, Canteen, Gym", points: 20, penalty: -5 },
    { id: 6, type: 'text', text: "What is the name of Location 1?", correctAnswer: "main building", points: 20, penalty: 0 },
    { id: 7, type: 'mcq', text: "The Volleyball Court is adjacent to which other major ground?", options: ["Kabaddi Ground", "Basketball Court", "Cricket Ground", "Badminton Court"], correctAnswer: "Cricket Ground", points: 20, penalty: -5 },
    { id: 8, type: 'text', text: "Which location number is the Gym?", correctAnswer: "10", points: 20, penalty: 0 },
    { id: 9, type: 'mcq', text: "If you walk south from the Main Building, which block of locations do you encounter first?", options: ["The Hostels", "The Canteen Block", "The Academic Labs", "The Sports Grounds"], correctAnswer: "The Sports Grounds", points: 20, penalty: -5 },
    { id: 10, type: 'text', text: "What is the name of Location 15?", correctAnswer: "bank", points: 20, penalty: 0 },
    { id: 11, type: 'mcq', text: "Which set of quarters is marked as a 'danger zone' on the map?", options: ["Faculty Quaters", "Professor Quaters", "Principal Quater", "All of the above"], correctAnswer: "Professor Quaters", points: 20, penalty: -5 },
    { id: 12, type: 'text', text: "What is the name of Location 22?", correctAnswer: "mandir", points: 20, penalty: 0 },
    { id: 13, type: 'mcq', text: "The MIITIE Building is located between which two other departments/buildings?", options: ["Bank and Civil Dept", "Workshop and EGD Lab", "Canteen and Gym", "Radhey Hostel and Park"], correctAnswer: "Bank and Civil Dept", points: 20, penalty: -5 },
    { id: 14, type: 'text', text: "Which location number is the Power House?", correctAnswer: "18", points: 20, penalty: 0 },
    { id: 15, type: 'mcq', text: "Which location acts as the main entrance to the campus?", options: ["Location 1", "Location 17", "Location 20", "Location 12"], correctAnswer: "Location 17", points: 20, penalty: -5 },
    { id: 16, type: 'text', text: "What is the name of Location 19?", correctAnswer: "egd lab", points: 20, penalty: 0 },
    { id: 17, type: 'mcq', text: "The Park Area is situated next to which religious structure?", options: ["Mandir", "Mosque", "Church", "Gurudwara"], correctAnswer: "Mandir", points: 20, penalty: -5 },
    { id: 18, type: 'text', text: "Which location number is the Badminton Court?", correctAnswer: "11", points: 20, penalty: 0 },
    { id: 19, type: 'mcq', text: "Which hostel is prominently featured on the map?", options: ["Krishna Hostel", "Radhey Hostel", "Shiv Hostel", "Ram Hostel"], correctAnswer: "Radhey Hostel", points: 20, penalty: -5 },
    { id: 20, type: 'text', text: "What is the name of Location 7?", correctAnswer: "cricket net", points: 20, penalty: 0 },
    { id: 21, type: 'mcq', text: "The Workshop Lab is situated directly behind which building?", options: ["Bank", "MIITIE Building", "Civil Department", "Canteen"], correctAnswer: "MIITIE Building", points: 20, penalty: -5 },
    { id: 22, type: 'text', text: "Which location number is the Cricket Ground?", correctAnswer: "2", points: 20, penalty: 0 },
    { id: 23, type: 'mcq', text: "Which location is closest to the Power House?", options: ["Basketball Court", "Main Gate", "Main Building", "Pokhar"], correctAnswer: "Basketball Court", points: 20, penalty: -5 },
    { id: 24, type: 'text', text: "What is the name of Location 9?", correctAnswer: "canteen", points: 20, penalty: 0 },
    { id: 25, type: 'mcq', text: "How many 'Professor Quaters' are explicitly numbered on the map?", options: ["2", "3", "4", "5"], correctAnswer: "3", points: 20, penalty: -5 },
    { id: 26, type: 'text', text: "Which location number is the Faculty Quater?", correctAnswer: "21", points: 20, penalty: 0 },
    { id: 27, type: 'mcq', text: "The Principal Quater is located next to which other quarters?", options: ["Faculty Quater", "Professor Quater 25", "Professor Quater 23", "None"], correctAnswer: "Professor Quater 25", points: 20, penalty: -5 },
    { id: 28, type: 'text', text: "What is the name of Location 4?", correctAnswer: "basketball court", points: 20, penalty: 0 },
    { id: 29, type: 'mcq', text: "Which location is centrally located between the Sports Grounds and the Academic blocks?", options: ["Canteen Block", "Pokhar", "Main Gate", "Mandir"], correctAnswer: "Canteen Block", points: 20, penalty: -5 },
    { id: 30, type: 'text', text: "Which location number is the Volleyball Court?", correctAnswer: "3", points: 20, penalty: 0 },
    { id: 31, type: 'mcq', text: "The 'Danger' skull symbol is associated with which types of locations?", options: ["Sports Grounds", "Academic Labs", "Residential Quarters", "Hostels"], correctAnswer: "Residential Quarters", points: 20, penalty: -5 },
    { id: 32, type: 'text', text: "What is the name of Location 16?", correctAnswer: "workshop lab", points: 20, penalty: 0 },
    { id: 33, type: 'mcq', text: "If you enter through the Main Gate and walk straight, which area do you hit first?", options: ["Kabaddi Ground", "Basketball Court", "Canteen", "Bank"], correctAnswer: "Kabaddi Ground", points: 20, penalty: -5 },
    { id: 34, type: 'text', text: "Which location number is the Kabaddi Ground?", correctAnswer: "5", points: 20, penalty: 0 },
    { id: 35, type: 'mcq', text: "The Cricket Net is located within the boundary of which larger ground?", options: ["Cricket Ground", "Kabaddi Ground", "Basketball Court", "Volleyball Court"], correctAnswer: "Kabaddi Ground", points: 20, penalty: -5 },
    { id: 36, type: 'text', text: "What is the name of Location 20?", correctAnswer: "park area", points: 20, penalty: 0 },
    { id: 37, type: 'mcq', text: "Which building is located at the very top (North) of the map?", options: ["Main Building", "Radhey Hostel", "Cricket Ground", "Mandir"], correctAnswer: "Main Building", points: 20, penalty: -5 },
    { id: 38, type: 'text', text: "Which location number is the Pokhar?", correctAnswer: "6", points: 20, penalty: 0 },
    { id: 39, type: 'mcq', text: "Which of the following is NOT part of the central 'Canteen Block'?", options: ["Sudha Shop", "Canteen", "Gym", "Bank"], correctAnswer: "Bank", points: 20, penalty: -5 },
    { id: 40, type: 'text', text: "What is the name of Location 13?", correctAnswer: "miitie building", points: 20, penalty: 0 }
];

const MOCK_TEAMS = [
    { id: 't1', name: 'Code Breakers', score: 140, time: 340 },
    { id: 't2', name: 'Map Hunters', score: 120, time: 310 },
    { id: 't3', name: 'Tech Geeks', score: 90, time: 420 },
];

const getAvatarUrl = (seed) => `https://api.dicebear.com/10.x/waves/svg?tags=animation&rotate=4&size=3&seed=${encodeURIComponent(seed)}`;

const ICONS = {
    login: 'https://cdn-icons-png.flaticon.com/128/9592/9592283.png',
    points: 'https://cdn-icons-png.flaticon.com/128/13604/13604570.png',
    leaderboard: 'https://cdn-icons-png.flaticon.com/128/4176/4176236.png',
    map: 'https://cdn-icons-png.flaticon.com/128/18575/18575830.png',
    quiz: 'https://cdn-icons-png.flaticon.com/128/11349/11349042.png',
    timer: 'https://cdn-icons-png.flaticon.com/128/10473/10473518.png',
    wrong: 'https://cdn-icons-png.flaticon.com/128/16206/16206622.png',
    correct: 'https://cdn-icons-png.flaticon.com/128/16799/16799608.png'
};

const LiveMap = () => {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const markerInstance = useRef(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        // 1. Load Leaflet CSS
        if (!document.getElementById('leaflet-css-dynamic')) {
            const link = document.createElement('link');
            link.id = 'leaflet-css-dynamic';
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            document.head.appendChild(link);
        }

        // 2. Load Vanilla Leaflet JS dynamically (Bypasses import dependency errors)
        if (!document.getElementById('leaflet-script-dynamic')) {
            const script = document.createElement('script');
            script.id = 'leaflet-script-dynamic';
            script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            script.onload = () => setScriptLoaded(true);
            document.head.appendChild(script);
        } else {
            if (window.L) setScriptLoaded(true);
            else {
                document.getElementById('leaflet-script-dynamic').addEventListener('load', () => setScriptLoaded(true));
            }
        }
    }, []);

    useEffect(() => {
        if (!scriptLoaded || !mapRef.current) return;

        // Initialize Map only once
        if (!mapInstance.current) {
            // Setup interactive map and remove default zoom so we can position it better
            mapInstance.current = window.L.map(mapRef.current, {
                zoomControl: false,
                attributionControl: false
            }).setView([20.5937, 78.9629], 5); // Default start position

            // Add the custom Stamen Toner tiles
            window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 20,
                attribution: '&copy; Stadia Maps'
            }).addTo(mapInstance.current);

            // Add zoom control manually to top right so it doesn't hide behind our bottom nav
            window.L.control.zoom({ position: 'topright' }).addTo(mapInstance.current);

            // Create custom marker using our app's styled map icon
            const customIcon = window.L.icon({
                iconUrl: ICONS.map,
                iconSize: [46, 46],
                iconAnchor: [23, 46],
                className: 'drop-shadow-xl animate-bounce-slow'
            });

            markerInstance.current = window.L.marker([20.5937, 78.9629], { icon: customIcon }).addTo(mapInstance.current);
        }

        if (!("geolocation" in navigator)) {
            setErrorMsg("Geolocation is not supported by your browser");
            return;
        }

        let isFirstLocation = true;

        // Start Live GPS Tracking
        const watchId = navigator.geolocation.watchPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                setErrorMsg(null);

                if (mapInstance.current && markerInstance.current) {
                    const newLatLng = new window.L.LatLng(latitude, longitude);
                    markerInstance.current.setLatLng(newLatLng);

                    if (isFirstLocation) {
                        mapInstance.current.setView(newLatLng, 17); // Zoom in tightly on the first GPS lock
                        isFirstLocation = false;
                    } else {
                        // Smoothly pan as the user walks around
                        mapInstance.current.panTo(newLatLng);
                    }
                }
            },
            (err) => {
                setErrorMsg("Please enable location permissions to track your movement.");
                console.error(err);
            },
            { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
        );

        // Ensure Leaflet resizes correctly within our flex container
        setTimeout(() => {
            if (mapInstance.current) mapInstance.current.invalidateSize();
        }, 300);

        return () => navigator.geolocation.clearWatch(watchId);
    }, [scriptLoaded]);

    return (
        <div className="w-full h-full relative flex flex-col bg-slate-100 z-0">
            {errorMsg && (
                <div className="absolute top-20 left-4 right-4 z-[1000] bg-rose-50 text-rose-600 font-bold p-4 rounded-xl border-2 border-rose-200 text-sm shadow-md text-center">
                    {errorMsg}
                </div>
            )}

            {/* Top Info Card */}
            {/* <div className="absolute top-4 left-4 right-4 z-[1000] pointer-events-none">
                <div className="bg-white/95 backdrop-blur-sm border-2 border-slate-200 border-b-4 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm pointer-events-auto">
                    <img src={ICONS.map} alt="Map" className="w-8 h-8 object-contain drop-shadow-sm" />
                    <div>
                        <h2 className="font-black text-slate-800 leading-tight">Live Campus Map</h2>
                        <p className="text-[10px] font-bold text-violet-500 tracking-wider uppercase">
                            {scriptLoaded ? "GPS Tracking Active" : "Loading Map Engine..."}
                        </p>
                    </div>
                </div>
            </div> */}

            {/* The Actual Interactive Map Container */}
            <div ref={mapRef} className="w-full h-full relative z-0">
                {!scriptLoaded && (
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="w-8 h-8 border-4 border-violet-200 border-t-violet-500 rounded-full animate-spin mb-3"></div>
                        <p className="text-violet-600 font-bold uppercase tracking-widest text-xs">Initializing Map...</p>
                    </div>
                )}
            </div>

            {/* Scoped CSS for map marker animation and bottom padding */}
            <style>{`
                .animate-bounce-slow {
                    animation: bounce 2s infinite;
                }
                .leaflet-bottom {
                    bottom: 80px !important; 
                }
                .leaflet-control-zoom {
                    margin-top: 80px !important;
                }
            `}</style>
        </div>
    );
};

const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false, type = "button" }) => {
    // Duolingo style: chunky borders, active states that compress the border
    const baseStyle = "w-full rounded-2xl font-bold text-lg py-3 px-6 transition-all duration-150 flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-violet-500 text-white border-b-4 border-violet-700 hover:bg-violet-400 active:border-b-0 active:translate-y-1",
        secondary: "bg-white text-slate-700 border-2 border-slate-200 border-b-4 hover:bg-slate-50 active:border-b-2 active:translate-y-0.5",
        success: "bg-emerald-500 text-white border-b-4 border-emerald-700 hover:bg-emerald-400 active:border-b-0 active:translate-y-1",
        danger: "bg-rose-500 text-white border-b-4 border-rose-700 hover:bg-rose-400 active:border-b-0 active:translate-y-1",
        outline: "bg-white text-slate-700 border-2 border-slate-200 border-b-4 hover:bg-slate-50 active:border-b-2 active:translate-y-0.5",
        disabled: "bg-slate-200 text-slate-400 cursor-not-allowed border-b-4 border-slate-300 translate-y-0"
    };

    return (
        <button
            type={type}
            onClick={disabled ? null : onClick}
            className={`${baseStyle} ${disabled ? variants.disabled : variants[variant]} ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

const Card = ({ children, className = '' }) => (
    <div className={`bg-white rounded-3xl border-2 border-slate-200 border-b-4 p-6 ${className}`}>
        {children}
    </div>
);

export default function TechVerseApp() {
    useEffect(() => {
        if (!document.getElementById('leaflet-css')) {
            const link = document.createElement('link');
            link.id = 'leaflet-css';
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            document.head.appendChild(link);
        }
    }, []);

    const [view, setView] = useState('register'); // register, app
    const [activeTab, setActiveTab] = useState('quiz'); // quiz, map, leaderboard
    const [myTeam, setMyTeam] = useState({ name: '', members: [], score: 0, time: 0 });
    const [memberInput, setMemberInput] = useState('');

    // Game State
    const [activeTeams, setActiveTeams] = useState(MOCK_TEAMS);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [textAnswer, setTextAnswer] = useState('');
    const [answerFeedback, setAnswerFeedback] = useState(null); // 'correct', 'wrong', null
    const [showIntermission, setShowIntermission] = useState(false); // NEW STATE for showing leaderboard between questions
    const [gameTimer, setGameTimer] = useState(0);
    const timerRef = useRef(null);

    const [qStates, setQStates] = useState(
        QUESTIONS.map((q, i) => ({
            index: i,
            status: i === 0 ? 'unlocked' : 'locked', // first question unlocked
            userAnswer: null
        }))
    );

    const handleAddMember = (e) => {
        e.preventDefault();
        if (memberInput.trim() && myTeam.members.length < 4) {
            setMyTeam({ ...myTeam, members: [...myTeam.members, memberInput.trim()] });
            setMemberInput('');
        }
    };

    const handleRegister = () => {
        if (myTeam.name.trim().length > 0) {
            setActiveTeams([...MOCK_TEAMS, { ...myTeam, id: 'my-team' }]);
            setView('app');
            if (!timerRef.current) {
                timerRef.current = setInterval(() => {
                    setGameTimer(prev => prev + 1);
                }, 1000);
            }
        }
    };

    const openQuestion = (index) => {
        const qState = qStates[index];
        if (qState.status === 'locked') return;

        setActiveQuestionIndex(index);
        setSelectedAnswer(null);
        setTextAnswer('');
        setAnswerFeedback(null);
        setShowIntermission(false); // Reset intermission

        if (qState.status === 'correct' || qState.status === 'wrong') {
            // Already answered (MCQ wrong or anything correct)
            if (QUESTIONS[index].type === 'text' && qState.status === 'wrong') {
                // Allow retry for text if it was previously marked wrong (though we clear feedback here)
            } else {
                setAnswerFeedback(qState.status);
                if (QUESTIONS[index].type === 'text') {
                    setTextAnswer(qState.userAnswer || '');
                } else {
                    setSelectedAnswer(qState.userAnswer || '');
                }
            }
        }
    };

    const closeQuestion = () => {
        setActiveQuestionIndex(null);
        setAnswerFeedback(null);
        setShowIntermission(false);
    };

    const handleContinue = () => {
        setShowIntermission(true);
    };

    const goToNextQuestion = () => {
        if (activeQuestionIndex + 1 < QUESTIONS.length) {
            openQuestion(activeQuestionIndex + 1);
        } else {
            closeQuestion();
            setActiveTab('leaderboard');
        }
    };

    const handleAnswerSubmit = (answer) => {
        const q = QUESTIONS[activeQuestionIndex];
        let isCorrect = false;

        if (q.type === 'mcq') {
            setSelectedAnswer(answer);
            isCorrect = answer === q.correctAnswer;
        } else {
            const normalizedInput = answer.trim().toLowerCase();
            const normalizedCorrect = q.correctAnswer.trim().toLowerCase();
            isCorrect = normalizedInput === normalizedCorrect;
        }

        setAnswerFeedback(isCorrect ? 'correct' : 'wrong');

        // Only update score/state if it's correct, OR if it's MCQ (MCQ wrong = locked and penalty)
        if (isCorrect || q.type === 'mcq') {
            setMyTeam(prev => ({
                ...prev,
                score: prev.score + (isCorrect ? q.points : q.penalty),
                time: gameTimer
            }));

            setQStates(prev => {
                const next = [...prev];
                next[activeQuestionIndex] = {
                    ...next[activeQuestionIndex],
                    status: isCorrect ? 'correct' : 'wrong',
                    userAnswer: answer
                };
                // Unlock next question
                if (activeQuestionIndex + 1 < next.length) {
                    if (next[activeQuestionIndex + 1].status === 'locked') {
                        next[activeQuestionIndex + 1].status = 'unlocked';
                    }
                }
                return next;
            });

            // Simulate other teams
            setActiveTeams(prevTeams => prevTeams.map(team => {
                if (team.id === 'my-team') {
                    return { ...team, score: myTeam.score + (isCorrect ? q.points : q.penalty), time: gameTimer };
                }
                const botCorrect = Math.random() > 0.5;
                return {
                    ...team,
                    score: team.score + (botCorrect ? q.points : 0),
                    time: gameTimer + Math.floor(Math.random() * 5)
                };
            }));
        }
    };

    const handleTextSubmit = (e) => {
        e.preventDefault();
        if (textAnswer.trim() === '') return;
        handleAnswerSubmit(textAnswer);
    };

    const handleRetryText = () => {
        setAnswerFeedback(null);
        setTextAnswer('');
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const renderLeaderboardList = () => {
        const allTeams = activeTeams.map(t => t.id === 'my-team' ? { ...t, score: myTeam.score, time: myTeam.time } : t);

        const sortedTeams = [...allTeams].sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return a.time - b.time;
        });

        return sortedTeams.map((team, index) => {
            const isMe = team.id === 'my-team';

            let rankStyle = isMe
                ? "bg-violet-100 border-violet-400 text-violet-900 ring-2 ring-violet-400"
                : "bg-white border-slate-200 text-slate-700";

            return (
                <div key={team.id} className={`flex items-center p-4 rounded-3xl border-2 border-b-4 ${rankStyle}`}>
                    <div className="w-8 text-center font-black text-xl opacity-80">{index + 1}</div>
                    <img src={getAvatarUrl(team.name)} alt={team.name} className="w-12 h-12 rounded-2xl mr-4 bg-white/50 border-2 border-white/50" />
                    <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-base truncate flex items-center gap-2">
                            {team.name} {isMe && <span className="bg-violet-500 text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-black">You</span>}
                        </h3>
                        <div className="flex items-center gap-1 text-sm font-bold opacity-75 mt-0.5">
                            <img src={ICONS.points} className="w-5 h-5 object-contain" alt="Points" />
                            <span className="flex items-center gap-1">{team.score}</span>
                        </div>
                    </div>
                </div>
            );
        });
    };

    const renderRegister = () => (
        <div className="flex flex-col h-full justify-center p-6 space-y-6 animate-in fade-in bg-violet-50">
            <div className="text-center space-y-2">
                <div className="mx-auto w-24 h-24 bg-violet-200 rounded-3xl border-b-4 border-violet-300 flex items-center justify-center mb-6 rotate-3">
                    <img src={ICONS.login} alt="Treasure" className="w-14 h-14 -rotate-3 object-contain" />
                </div>
                <h1 className=" text-3xl leading-none sm:text-4xl tracking-wider font-bold font-black text-slate-800 tracking-wider" style={{ fontFamily: "'Syne', sans-serif" }}>TechVerse '26</h1>
                <p className="text-violet-500 font-bold tracking-widest uppercase text-sm">Decode DCE Map</p>
            </div>

            <Card className="space-y-5">
                <div>
                    <label className="block text-sm font-bold text-slate-600 mb-2">Team Name</label>
                    <input
                        type="text"
                        value={myTeam.name}
                        onChange={(e) => setMyTeam({ ...myTeam, name: e.target.value })}
                        className="w-full border-2 border-slate-200 border-b-4 rounded-2xl p-4 font-bold text-slate-800 focus:border-violet-400 focus:ring-0 outline-none transition-colors bg-white"
                        placeholder="e.g. Map Marauders"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-600 mb-2">Team Members ({myTeam.members.length}/4)</label>
                    <form onSubmit={handleAddMember} className="flex gap-2 mb-3">
                        <input
                            type="text"
                            value={memberInput}
                            onChange={(e) => setMemberInput(e.target.value)}
                            className="flex-1 border-2 border-slate-200 border-b-4 rounded-2xl p-3 font-medium outline-none focus:border-violet-400 transition-colors bg-white"
                            placeholder="Member Name"
                            disabled={myTeam.members.length >= 4}
                        />
                        <Button
                            type="submit"
                            variant="secondary"
                            className="w-auto px-5"
                            disabled={myTeam.members.length >= 4 || !memberInput.trim()}
                        >
                            +
                        </Button>
                    </form>

                    <div className="flex flex-wrap gap-2">
                        {myTeam.members.map((m, i) => (
                            <span key={i} className="bg-violet-100 text-violet-700 px-3 py-1.5 rounded-xl text-sm font-bold border-2 border-violet-200 flex items-center gap-1">
                                {m}
                            </span>
                        ))}
                    </div>
                </div>
            </Card>

            <Button onClick={handleRegister} disabled={!myTeam.name.trim()} className="mt-4">
                START HUNT <ArrowRight className="w-6 h-6" />
            </Button>
        </div>
    );

    const renderMap = () => (
        <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden pb-16">
            <div className="flex-1 overflow-hidden relative border-t-2 border-slate-200">
                <LiveMap />
            </div>
            {/* 
            <div className="absolute top-4 left-4 right-4 z-10 pointer-events-none">
                <div className="bg-white/90 backdrop-blur-sm border-2 border-slate-200 border-b-4 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm pointer-events-auto">
                    <img src={ICONS.map} alt="Map" className="w-8 h-8 object-contain drop-shadow-sm" />
                    <div>
                        <h2 className="font-black text-slate-800 leading-tight">Live Campus Map</h2>
                        <p className="text-[10px] font-bold text-violet-500 tracking-wider uppercase">GPS Tracking Active</p>
                    </div>
                </div>
            </div> */}
        </div>
    );

    const renderQuizGrid = () => (
        <div className="flex flex-col h-full bg-slate-50 pb-16">
            <div className="bg-white px-6 py-4 flex justify-between items-center border-b-2 border-slate-200 z-10">
                {/* <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Your Score</p>
          <h2 className="text-xl font-black text-violet-600">{myTeam.score} PTS</h2>
        </div> */}
                <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border-2 border-slate-200 border-b-4">
                    <img src={ICONS.points} className="w-5 h-5 object-contain" alt="Points" />
                    <span className="font-black text-slate-700 text-lg">{myTeam.score}</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border-2 border-slate-200 border-b-4">
                    <img src={ICONS.timer} className="w-5 h-5 object-contain" alt="Timer" />
                    <span className="font-black text-slate-700 text-lg">{formatTime(gameTimer)}</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                {/* <h3 className="text-lg font-bold text-slate-700 mb-6 flex items-center gap-2">
          <LayoutGrid className="w-5 h-5 text-violet-500" /> Map Clues
        </h3> */}

                {/* Duolingo style circular grid */}
                <div className="grid grid-cols-4 gap-x-4 gap-y-6 pb-6">
                    {qStates.map((q) => {
                        let btnStyle = "";
                        if (q.status === 'locked') {
                            btnStyle = "bg-slate-200 text-slate-400 border-slate-300 opacity-80 cursor-not-allowed";
                        } else if (q.status === 'unlocked') {
                            btnStyle = "bg-white text-violet-500 border-slate-200 hover:bg-violet-50 active:translate-y-1 active:border-b-2";
                        } else if (q.status === 'correct') {
                            btnStyle = "bg-emerald-500 text-white border-emerald-700 active:translate-y-1 active:border-b-2";
                        } else if (q.status === 'wrong') {
                            btnStyle = "bg-rose-500 text-white border-rose-700 active:translate-y-1 active:border-b-2";
                        }

                        return (
                            <button
                                key={q.index}
                                onClick={() => openQuestion(q.index)}
                                disabled={q.status === 'locked'}
                                className={`w-14 h-14 mx-auto rounded-full border-2 border-b-4 flex flex-col items-center justify-center font-black text-xl transition-all ${btnStyle}`}
                            >
                                {q.index + 1}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );

    const renderActiveQuestion = () => {
        const q = QUESTIONS[activeQuestionIndex];
        const isAnswered = answerFeedback !== null;
        const isCompleted = (q.type === 'mcq' && isAnswered) || (q.type === 'text' && answerFeedback === 'correct');

        if (showIntermission) {
            return (
                <div className="flex flex-col h-full bg-slate-50 absolute inset-0 z-50 animate-in slide-in-from-right duration-300">
                    {/* <div className="bg-white px-6 py-6 text-center border-b-2 border-slate-200 z-10 shadow-sm">
            <h2 className="text-2xl font-black text-slate-800 flex items-center justify-center gap-3">
              <img src={ICONS.leaderboard} className="w-8 h-8 object-contain" alt="Trophy" /> Current Standings
            </h2>
          </div> */}
                    <div className="flex-1 p-6 overflow-y-auto space-y-4">
                        {renderLeaderboardList()}
                    </div>
                    <div className="bg-white p-6 border-t-2 border-slate-200 z-10 pb-safe">
                        <Button onClick={goToNextQuestion} className="w-full py-4 text-xl">
                            NEXT QUESTION
                        </Button>
                    </div>
                </div>
            );
        }

        return (
            <div className="flex flex-col h-full bg-white absolute inset-0 z-50 animate-in slide-in-from-right-full duration-300">

                {/* Top Progress / Back Bar */}
                <div className="bg-white px-6 py-4 flex justify-between items-center border-b-2 border-slate-200 z-10 gap-3">
                    <button onClick={closeQuestion} className="bg-slate-100 px-3 py-1.5 text-slate-400 hover:text-slate-600 transition-colors rounded-xl border-2 border-slate-200 border-b-4">
                        <ChevronLeft className="w-7 h-7 stroke-[3]" />
                    </button>
                    <div className="flex-1 h-4 bg-slate-100 rounded-full overflow-hidden border-2 border-slate-200">
                        <div
                            className="h-full bg-emerald-500 transition-all duration-500"
                            style={{ width: `${((activeQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}
                        />
                    </div>
                    <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-xl border-2 border-slate-200 border-b-4">
                        <img src={ICONS.timer} className="w-5 h-5 object-contain" alt="Timer" />
                        <span className="font-black text-slate-700 text-lg">{formatTime(gameTimer)}</span>
                    </div>
                </div>

                {/* Question Area */}
                <div className="flex-1 px-6 pb-32 flex flex-col overflow-y-auto">

                    {/* Custom Bordered Question Card */}
                    <Card className="border-4 border-slate-200 shadow-sm mt-6 mb-8 p-6">
                        <h2 className="text-xl font-black text-slate-800 leading-snug">
                            {q.text}
                        </h2>
                        <div className="mt-5 pt-4 border-t-2 border-dashed border-slate-300 flex justify-between items-center text-sm font-black">
                            <span className="text-emerald-500 tracking-wide">CORRECT: +{q.points}</span>
                            <span className="text-rose-500 tracking-wide">WRONG: {q.penalty}</span>
                        </div>
                    </Card>

                    {/* Options / Input Area */}
                    <div className="mt-auto space-y-4">
                        {q.type === 'mcq' ? (
                            <div className="grid gap-4">
                                {q.options.map((opt, idx) => {
                                    const labels = ['A', 'B', 'C', 'D'];
                                    let variant = 'outline';
                                    if (isCompleted) {
                                        if (opt === q.correctAnswer) variant = 'success';
                                        else if (opt === selectedAnswer) variant = 'danger';
                                        else variant = 'disabled';
                                    } else if (selectedAnswer === opt) {
                                        variant = 'primary';
                                    }

                                    return (
                                        <Button
                                            key={idx}
                                            variant={variant}
                                            onClick={() => handleAnswerSubmit(opt)}
                                            disabled={isCompleted}
                                            className="py-4 text-left justify-start px-4 items-center gap-4"
                                        >
                                            <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg shrink-0 border-2
                          ${variant === 'outline' || variant === 'primary' ? 'bg-slate-100 border-slate-200 text-slate-500' : ''}
                          ${variant === 'success' ? 'bg-emerald-600 border-emerald-700 text-white' : ''}
                          ${variant === 'danger' ? 'bg-rose-600 border-rose-700 text-white' : ''}
                          ${variant === 'disabled' ? 'bg-slate-300 border-slate-400 text-slate-500' : ''}
                      `}>
                                                {labels[idx]}
                                            </span>
                                            <span className="flex-1 font-bold text-lg leading-tight">{opt}</span>
                                        </Button>
                                    );
                                })}
                            </div>
                        ) : (
                            <form onSubmit={handleTextSubmit} className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    value={textAnswer}
                                    onChange={(e) => setTextAnswer(e.target.value)}
                                    disabled={isCompleted || answerFeedback === 'wrong'} // disable while showing wrong feedback
                                    placeholder="Type your answer..."
                                    className={`w-full border-2 border-b-4 rounded-2xl p-5 font-bold text-lg outline-none transition-colors text-center
                    ${!isCompleted ? 'bg-white border-slate-200 text-slate-800 focus:border-violet-400' : ''}
                    ${answerFeedback === 'correct' ? 'bg-emerald-50 border-emerald-500 text-emerald-900' : ''}
                    ${answerFeedback === 'wrong' ? 'bg-rose-50 border-rose-500 text-rose-900' : ''}
                  `}
                                />
                                {!isAnswered && (
                                    <Button type="submit" disabled={textAnswer.trim() === ''}>
                                        CHECK
                                    </Button>
                                )}
                            </form>
                        )}
                    </div>
                </div>

                {/* Duolingo Style Bottom Feedback Sheet */}
                {answerFeedback && (
                    <div className={`fixed inset-x-0 bottom-0 p-6 pt-8 animate-in slide-in-from-bottom-full duration-300 z-50 rounded-t-3xl border-t-4 max-w-md mx-auto
               ${answerFeedback === 'correct' ? 'bg-emerald-100 border-emerald-300' : 'bg-rose-100 border-rose-300'}
           `}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-sm`}>
                                <img src={answerFeedback === 'correct' ? ICONS.correct : ICONS.wrong} className="w-12 h-12 object-contain" alt="Status" />
                            </div>
                            <h3 className={`text-2xl font-black ${answerFeedback === 'correct' ? 'text-emerald-700' : 'text-rose-700'}`}>
                                {answerFeedback === 'correct' ? 'Awesome!' : 'Incorrect'}
                            </h3>
                        </div>

                        {/* Correct Answer reveal removed as per request */}

                        {answerFeedback === 'wrong' && q.type === 'text' ? (
                            <Button variant="danger" onClick={handleRetryText} className="py-4 text-lg">
                                TRY AGAIN
                            </Button>
                        ) : (
                            <Button variant={answerFeedback === 'correct' ? 'success' : 'danger'} onClick={handleContinue} className="py-4 text-lg">
                                CONTINUE
                            </Button>
                        )}
                    </div>
                )}
            </div>
        );
    };

    const renderLeaderboard = () => {
        return (
            <div className="flex flex-col h-full bg-slate-50 pb-16">
                {/* <div className="bg-white px-6 py-6 text-center border-b-2 border-slate-200 z-10 shadow-sm">
          <h2 className="text-2xl font-black text-slate-800 flex items-center justify-center gap-3">
            <img src={ICONS.leaderboard} className="w-8 h-8 object-contain" alt="Trophy" /> Leaderboard
          </h2>
        </div> */}

                <div className="flex-1 p-6 overflow-y-auto space-y-4">
                    {renderLeaderboardList()}
                </div>
            </div>
        );
    };

    return (
        <div className="bg-slate-900 flex justify-center font-sans selection:bg-violet-200">
            <style>{`
            html {
            filter: invert(1) !important;
            }
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
      `}</style>
            <div className="w-full max-w-md bg-white h-[100dvh] flex flex-col relative shadow-2xl overflow-hidden">

                {view === 'register' ? (
                    renderRegister()
                ) : (
                    <>
                        {/* Main Content Area */}
                        <div className="flex-1 relative overflow-hidden">
                            {activeTab === 'quiz' && renderQuizGrid()}
                            {activeTab === 'map' && renderMap()}
                            {activeTab === 'leaderboard' && renderLeaderboard()}

                            {/* Full Screen Overlay for Active Question */}
                            {activeQuestionIndex !== null && renderActiveQuestion()}
                        </div>

                        {/* Bottom Navigation (Hidden when a question is open) */}
                        {activeQuestionIndex === null && (
                            <div className="absolute bottom-0 inset-x-0 bg-white border-t-2 border-slate-200 flex justify-around items-center h-16 px-2 z-[2000] pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                                <button
                                    onClick={() => setActiveTab('quiz')}
                                    className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${activeTab === 'quiz' ? 'text-violet-600' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    <img src={ICONS.quiz} className={`w-6 h-6 object-contain ${activeTab === 'quiz' ? '' : 'grayscale opacity-50'}`} alt="Quiz" />
                                    <span className="text-xs font-black tracking-wide">QUIZ</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('map')}
                                    className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${activeTab === 'map' ? 'text-violet-600' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    <img src={ICONS.map} className={`w-6 h-6 object-contain ${activeTab === 'map' ? '' : 'grayscale opacity-50'}`} alt="Map" />
                                    <span className="text-xs font-black tracking-wide">MAP</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('leaderboard')}
                                    className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${activeTab === 'leaderboard' ? 'text-violet-600' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    <img src={ICONS.leaderboard} className={`w-6 h-6 object-contain ${activeTab === 'leaderboard' ? '' : 'grayscale opacity-50'}`} alt="Ranks" />
                                    <span className="text-xs font-black tracking-wide">RANKS</span>
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
