const electric = [{
	"id": 1,
	"name": "Guitarra 1",
	"price": "",
	"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae nunc finibus nisi varius dignissim. Praesent bibendum maximus semper. Nunc volutpat ligula velit, a scelerisque felis.",
	"image": "https://www.adorama.com/images/Large/wbs1b.jpg"
},
{
	"id": 2,
	"name": "Guitarra 2",
	"price": "",
	"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae nunc finibus nisi varius dignissim. Praesent bibendum maximus semper. Nunc volutpat ligula velit, a scelerisque felis.",
	"image": "https://www.adorama.com/images/Large/wbs1b.jpg"
},
{
	"id": 3,
	"name": "Guitarra 3",
	"price": "",
	"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae nunc finibus nisi varius dignissim. Praesent bibendum maximus semper. Nunc volutpat ligula velit, a scelerisque felis.",
	"image": "https://www.adorama.com/images/Large/wbs1b.jpg"
},
{
	"id": 4,
	"name": "Guitarra 4",
	"price": "",
	"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae nunc finibus nisi varius dignissim. Praesent bibendum maximus semper. Nunc volutpat ligula velit, a scelerisque felis.",
	"image": "https://www.adorama.com/images/Large/wbs1b.jpg"
},
{
	"id": 5,
	"name": "Guitarra 5",
	"price": "",
	"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae nunc finibus nisi varius dignissim. Praesent bibendum maximus semper. Nunc volutpat ligula velit, a scelerisque felis.",
	"image": "https://www.adorama.com/images/Large/wbs1b.jpg"
},
{
	"id": 6,
	"name": "Guitarra 6",
	"price": "",
	"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae nunc finibus nisi varius dignissim. Praesent bibendum maximus semper. Nunc volutpat ligula velit, a scelerisque felis.",
	"image": "https://www.adorama.com/images/Large/wbs1b.jpg"
}]

// `<div class="pd-item">
// 	<p>${data.name} ${(index + 1)}</p> 
// 	<img src="${data.image}" class="pd-image">
// 	</div>`)


var content = electric

const perPage = 4
const state = {
	page: 1,
	perPage: perPage,
	totalPages: Math.ceil(electric.length / perPage)
}

const html = {
	get(element) {
		return document.querySelector(element)
	}
}

const controls = {
	next() {
		state.page++

		const lastPage = state.page > state.totalPages

		if(lastPage) {
			state.page--
		}
		update()
	},
	prev() {
		state.page--

		if(state.page < 1) {
			state.page++
		}
		update()
	},
	goTo(page) {
		if (page < 1) {
			page = 1
		}

		state.page = page

		if(page > state.totalPages) {
			state.page = state.totalPages
		}
	},
	createListeners() {
		html.get('#controls .next').addEventListener('click', () => controls.next())
		html.get('#controls .prev').addEventListener('click', () => controls.prev())
	}
}

const list = {
	create(item) {
		const div = document.createElement('div')
		div.classList.add('pd-item')
		div.innerHTML = item.name

		const img = document.createElement('img')
		img.classList.add('pd-image')
		img.src = item.image
		img.id = item.id
		img.setAttribute("onclick", "includeOnClickFunction(this.id)")

		html.get("#content").appendChild(div).appendChild(img)
	},
	update() {
		html.get('#content').innerHTML = ""

		let page = state.page - 1

		let start = page * state.perPage
		let end = start + state.perPage

		const paginatedItems = content.slice(start, end)

		paginatedItems.forEach(list.create)
	}
}

function update() {
	list.update()
}

function init() {
	list.update()
	controls.createListeners()
}

function changeElement(data) {
	document.querySelector('.buy-item').style.opacity = 1
	document.querySelector('.item-properties .electric-image').src = data.image;
	document.querySelector('.electric-description .electric-title').innerText = data.name;
	document.querySelector('.electric-description .electric-text-information').innerText = data.description;
	document.querySelector('.buy-item .electric-text-description').innerText = data.description;
}

function includeOnClickFunction(id) {
	let dataElement;

	for (data in content)  {
		if(content[data].id == id) {
			dataElement = content[data];
			break;
		}
	}

	changeElement(dataElement)
}

init()