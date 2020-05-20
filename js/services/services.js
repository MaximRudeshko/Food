const postData = async (url, data) => {
    let res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json()
}

async function getData(url){
    let res = await fetch(url)
    if(!res.ok){
        throw new Error(`${res.status}`)
    }
    return await res.json();
}

export {postData};
export {getData};