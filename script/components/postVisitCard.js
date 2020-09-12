async function postVisitCard(body) {
	const config = {
		headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
	};
    const {data} = await axios.post('http://cards.danit.com.ua/cards', body, config);
    return data;
}

export {postVisitCard};