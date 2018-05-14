'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
    _inherits(Stopwatch, _React$Component);

    function Stopwatch(props) {
        _classCallCheck(this, Stopwatch);

        var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));

        _this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
            timesArray: [] //pusta tablica timesArray do której wpychamy czasy!
        };

        _this.start = _this.start.bind(_this); //w ES6 zmieniamy this 'ręcznie' w konstruktorze, żeby this użyte w metodach 
        _this.step = _this.step.bind(_this); //nie traciło kontekstu, wskazywało na komponent === Stopwatch
        _this.stop = _this.stop.bind(_this);
        _this.reset = _this.reset.bind(_this);
        _this.clear = _this.clear.bind(_this);
        _this.round = _this.round.bind(_this);
        return _this;
    }

    _createClass(Stopwatch, [{
        key: 'reset',
        value: function reset() {
            //metoda reset, zeruje stoper
            this.setState({ // za pomocą metody setState ustawiamy stan
                times: {
                    minutes: 0,
                    seconds: 0,
                    miliseconds: 0
                }
            });
        }
    }, {
        key: 'format',
        value: function format(times) {
            // format czasu === 00:00:00 
            return pad0(times.minutes) + ':' + pad0(times.seconds) + ':' + pad0(Math.floor(times.miliseconds));
        }
    }, {
        key: 'start',
        value: function start() {
            var _this2 = this;

            if (!this.state.running) {
                this.setState({
                    running: true
                });
                this.watch = setInterval(function () {
                    return _this2.step();
                }, 10);
            }
        }
    }, {
        key: 'step',
        value: function step() {
            if (!this.state.running) {
                return;
            }
            this.calculate();
        }
    }, {
        key: 'calculate',
        value: function calculate() {
            // przelicza minuty na sekundy, sekundy na milisekundy
            var times = this.state.times;
            times.miliseconds += 1;
            if (times.miliseconds >= 100) {
                times.seconds += 1;
                times.miliseconds = 0;
            }
            if (times.seconds >= 60) {
                times.minutes += 1;
                times.seconds = 0;
            }
            this.setState({
                times: times
            });
        }
    }, {
        key: 'stop',
        value: function stop() {
            //zatrzymanie timera
            this.setState({
                running: false
            });
            clearInterval(this.watch);
        }
    }, {
        key: 'round',
        value: function round() {
            //kolejna runda
            var savedTimes = this.state.timesArray;
            savedTimes.push(this.state.times);
            this.setState({
                savedTimes: savedTimes
            });
            this.reset();
        }
    }, {
        key: 'clear',
        value: function clear() {
            // czyszczenie zegara
            this.reset();
            this.setState({
                timesArray: [] //pusta tablica na setState
            });
            this.stop();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return React.createElement(
                'div',
                { className: 'timer' },
                React.createElement(
                    'nav',
                    { className: 'controls' },
                    React.createElement(
                        'a',
                        { className: 'button', id: 'start', onClick: this.start },
                        'Start'
                    ),
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', id: 'stop', onClick: this.stop },
                        'Stop'
                    ),
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', id: 'reset', onClick: this.reset },
                        'Reset'
                    ),
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', id: 'round', onClick: this.round },
                        'Round'
                    ),
                    React.createElement(
                        'a',
                        { href: '#', className: 'button', id: 'clear', onClick: this.clear },
                        'Clear'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'stopwatch' },
                    this.format(this.state.times)
                ),
                React.createElement(
                    'ul',
                    { className: 'results' },
                    this.state.timesArray.map(function (time, index) {
                        return React.createElement(
                            'li',
                            { key: index },
                            'Next Beer!! ' + _this3.format(time) + ' Yeahhh'
                        );
                    })
                )
            );
        }
    }]);

    return Stopwatch;
}(React.Component);

function pad0(value) {
    // ma za zadanie dodać 0 do liczb jednocyfrowych
    var result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

ReactDOM.render(React.createElement(Stopwatch, null), document.getElementById('app'));
