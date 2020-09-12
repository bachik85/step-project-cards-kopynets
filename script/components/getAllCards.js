
async function getAllCard(){
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };
    const {data} = await axios.get('http://cards.danit.com.ua/cards', config);

    return data;
}

export {getAllCard}