const refs = {
	startBtn: document.querySelector('.js-start'),
	lapBtn: document.querySelector('.js-take-lap'),
	resetBtn: document.querySelector('.js-reset'),
	clockFace: document.querySelector('.js-time'),
	laps: document.querySelector('.js-laps')
}

const timer = {
	id: null,
	startTime: null, 
	isActiv: false,
	start() {
		if(this.isActiv) {
			return;	
		} 

		this.isActiv = true;
		this.startTime = Date.now();

		this.id = setInterval(() => {
			this.currentTime = Date.now();
			this.deltaTime = this.currentTime - this.startTime;
			updateClockFace(this.deltaTime);
		}, 100)
	},
	reset() {
		clearInterval(this.id);
		this.isActiv = false;
		refs.startBtn.textContent = 'Start';
		this.deltaTime = 0;
		updateClockFace(this.deltaTime);
	},
	lap() {
		refs.laps.insertAdjacentHTML('afterbegin',
		`<li class="laps-item">
  			<p>${refs.clockFace.textContent}</p>
  		</li>`);
	},
	pause() {
		clearInterval(this.id);
		this.isActiv = false;
		// продолжить таймер 123

	}
}

function updateClockFace(time) {
	const hours = pad(
		Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
	);
	const mins = pad(
		Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
	);
	const sec = pad(
		Math.floor((time % (1000 * 60)) / (1000))
	);

	const ms = String(pad(
		Math.floor((time % (1000 * 60)) / (100))
	)).slice(-1);

	refs.clockFace.textContent = `${hours}:${mins}:${sec}.${ms}`;
}

function pad(value) {
	return String(value).padStart(2, '0');
}

refs.startBtn.addEventListener('click', handleStartBtnClick);
refs.lapBtn.addEventListener('click', timer.lap.bind(timer));
refs.resetBtn.addEventListener('click', timer.reset.bind(timer));

function handleStartBtnClick() {
	if(!timer.isActiv) {
		timer.start();
		this.textContent = 'Pause';
	} else {
		timer.pause();
		this.textContent = 'Continue';
	}
}

