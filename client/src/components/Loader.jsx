export default function Loader() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="relative w-16 h-16">
                {/* Outer rotating ring */}
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 border-r-purple-500 animate-spin"></div>

                {/* Middle rotating ring - slower */}
                <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-blue-500 border-l-blue-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>

                {/* Inner pulsing dot */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                </div>
            </div>
        </div>
    );
}
