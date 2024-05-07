export function baseURL(){
    return process.env.NODE_ENV === 'development' ? 'http://localhost:5000/' : '/';
}
