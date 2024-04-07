// src/routes/api/search.js

import Fuse from 'fuse.js';
import dataList from '$lib/cedict.json';
import { json } from '@sveltejs/kit';

const fuse = new Fuse(dataList, {
	keys: ['traditional', 'simplified', 'pinyin', 'definitions'],
	includeScore: true,
	threshold: 0.3
});

export async function POST({ request }) {
	try {
		const { searchQuery } = await request.json();
		const results = fuse.search(searchQuery);

		return json(results);
	} catch (error) {
		console.error('Error performing search:', error);
		return {
			status: 500,
			body: 'Error performing search'
		};
	}
}
