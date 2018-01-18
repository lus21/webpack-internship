import storage from './storage';
export default function() {
	alert('HI');
};

export function increment() {
	const h1 = document.getElementById('count');
	h1.innerHTML = --storage.clicks;
}