// https://github.com/ooade/use-fetch-hook/blob/master/src/hooks.js

import { useEffect, useRef, useReducer } from 'react';

export const useFetch = (url) => {
	const cache = useRef({});

	const initialState = {
		status: 'idle',
		error: null,
		data: [],
		updateCache: (payload, url) => {
			updateCacheLocally(payload, url)
		}
	};

	const [state, dispatch] = useReducer((state, action) => {
		switch (action.type) {
			case 'FETCHING':
				return { ...initialState, status: 'fetching' };
			case 'FETCHED':
				return { ...initialState, status: 'fetched', data: action.payload };
			case 'FETCH_ERROR':
				return { ...initialState, status: 'error', error: action.payload };
			default:
				return state;
		}
	}, initialState);

	const updateCacheLocally = (payload, url) => {
		if(cache.current[url]){
			cache.current[url] = payload;
			dispatch({ type: 'FETCHED', payload: payload });
		}
	}

	useEffect(() => {
		let cancelRequest = false;
		if (!url) return;

		const fetchData = async () => {
			dispatch({ type: 'FETCHING' });
			if (cache.current[url]) {
				const data = cache.current[url];
				dispatch({ type: 'FETCHED', payload: data });
			} else {
				try {
					const response = await fetch(url);
					const data = await response.json();
					cache.current[url] = data;
					if (cancelRequest) return;
					dispatch({ type: 'FETCHED', payload: data });
				} catch (error) {
					if (cancelRequest) return;
					dispatch({ type: 'FETCH_ERROR', payload: error.message });
				}
			}
		};

		fetchData();

		return function cleanup() {
			cancelRequest = true;
		};
	}, [url]);

	return state;
};