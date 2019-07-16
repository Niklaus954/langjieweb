const fetchHostInfoListAsync = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 2000);
    });
}

export default fetchHostInfoListAsync;