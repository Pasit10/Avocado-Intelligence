const constant = {
    BACKEND_ENV: process.env.REACT_APP_ENV,
    BACKEND_HOST: process.env.REACT_APP_BACKEND_HOST,
    BACKEND_PORT: process.env.REACT_APP_BACKEND_PORT,
    BACKEND_URL: `${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}`,
};


export default constant;