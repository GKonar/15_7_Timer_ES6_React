class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            timesArray: [] //pusta tablica timesArray do której wpychamy czasy!
        };
        
        this.start = this.start.bind(this); //w ES6 zmieniamy this 'ręcznie' w konstruktorze, żeby this użyte w metodach 
        this.step = this.step.bind(this);   //nie traciło kontekstu, wskazywało na komponent === Stopwatch
        this.stop = this.stop.bind(this);
        this.reset = this.reset.bind(this);
        this.clear = this.clear.bind(this);
        this.round = this.round.bind(this);
    }
  
    reset() {   //metoda reset, zeruje stoper
        this.setState({ // za pomocą metody setState ustawiamy stan
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        }); 
    }



    format(times) { // format czasu === 00:00:00 
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    start() {
        if (!this.state.running) {
            this.setState({                                  
                running: true
            });                                 
            this.watch = setInterval(() => this.step(), 10);   
        }                                                       
    }

    step() {
        if (!this.state.running) {
            return;
        } 
        this.calculate(); 
    }

    calculate() { // przelicza minuty na sekundy, sekundy na milisekundy
        const times = this.state.times;
        times.miliseconds += 1;
        if (times.miliseconds >= 100) {
            times.seconds += 1;
            times.miliseconds = 0;
        }
        if (times.seconds >= 60) {
            times.minutes +=1;
            times.seconds = 0;
        } 
        this.setState({
           times 
        });
    }

    stop() { //zatrzymanie timera
        this.setState({
            running: false
        })
        clearInterval(this.watch);
    }

    round() { //kolejna runda
        const savedTimes = this.state.timesArray;
        savedTimes.push(this.state.times); 
        this.setState({
            savedTimes
        });
        this.reset();
    }

    clear() { // czyszczenie zegara
      this.reset();
      this.setState({
        timesArray: [] //pusta tablica na setState
      });
      this.stop();
    }

    render() {
        return (
            <div className='timer'>
                <nav className='controls'>
                    <a className='button' id='start' onClick={this.start}>Start</a>
                    <a href='#' className='button' id='stop' onClick={this.stop}>Stop</a>
                    <a href='#' className='button' id='reset' onClick={this.reset}>Reset</a>
                    <a href='#' className='button' id='round' onClick={this.round}>Round</a>
                    <a href='#' className='button' id='clear' onClick={this.clear}>Clear</a>
                </nav>
                <div className='stopwatch'>{this.format(this.state.times)}</div>
                <ul className='results'>
                    {this.state.timesArray.map((time, index) => <li key={index}>{'Next Beer!! ' + this.format(time) + ' Yeahhh'}</li>)}
                </ul>
            </div>
        )
    }
}

function pad0(value) {  // ma za zadanie dodać 0 do liczb jednocyfrowych
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

ReactDOM.render(
  <Stopwatch />,
  document.getElementById('app')
);








