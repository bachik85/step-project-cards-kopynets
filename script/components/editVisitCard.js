async function editVisitCard(body, cardId) {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };
    const {data} = await axios.put(`http://cards.danit.com.ua/cards/${cardId}`, body, config);
    return data;
}

export {editVisitCard};