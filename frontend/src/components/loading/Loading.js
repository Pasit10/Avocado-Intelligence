const Loading = ({n = 3}) => {
    return (
        <div>
            {Array.from({ length: n }).map((_, i) => (
                <div key={i} className="spinner-grow spinner-grow-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            ))}
        </div>
    );
};

export default Loading;  