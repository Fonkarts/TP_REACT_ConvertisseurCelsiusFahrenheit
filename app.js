// Sert à préciser dans quel cas nous nous trouvons dans le composant
// "TemperatureInput"
const scaleNames = {
    c: "Celsius",
    f: "Fahrenheit"
}

// Conversion des Celsius en Fahrenheit
function toCelsius (fahrenheit) {
    return (fahrenheit - 32) * 5 / 9
}

// Conversion des Fahrenheit en Celsius
function toFahrenheit (celsius) {
    return (celsius * 9 / 5) +32
}

// Retourne un vide si l'entrée n'est pas un nombre ou sinon
// arrondit le résultat
function tryConvert (temperature, convert) {
    const value = parseFloat(temperature)
    if(Number.isNaN(value)) {
        return ""
    } 
    return Math.round(convert(value) * 100 / 100).toString()
}

function BoilingVerdict({celsius}) {
    if(celsius >= 100) {
        return <div className="alert alert-success">L'eau boue !</div>
    } 
    return <div className="alert alert-info">L'eau ne boue pas !</div>
}

class TemperatureInput extends React.Component {

    constructor (props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    // Récupère la valeur d'entrée et l'envoie dans la fonction du composant parent
    // via la props "onTemperatureChange"
    handleChange(e) {
        this.props.onTemperatureChange(e.target.value)
    }

    render() {
        // Accès à "temperature" via décomposition
        const {temperature} = this.props
        const name = "scale" + this.props.scale
        const scaleName = scaleNames[this.props.scale]
        return <div className="form-group">
            <label htmlFor={name}> Température en {scaleName}</label>
            <input type="text" id={name} value={temperature} onChange={this.handleChange} className="form-control"></input>
        </div>
    }

}

class Calculator extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            temperature: 20,
            scale: "c"
        }
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this)
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this)
    }

    handleCelsiusChange(temperature) {
        this.setState({
            scale: "c",
            temperature
        })
    }

    handleFahrenheitChange(temperature) {
        this.setState({
            scale: "f",
            temperature
        })
    }

    render() {
        const {temperature, scale} = this.state
        // Définit la temperature à renvoyer selon le champ depuis lequel la valeur est récupérée 
        const celsius = scale === "c" ? temperature : tryConvert(temperature, toCelsius)
        const fahrenheit = scale === "f" ? temperature : tryConvert(temperature, toFahrenheit)
        return <div className="container">
            <div className="form-group">
                <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange}/>
                <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange}/>
                <BoilingVerdict celsius={parseFloat(celsius)}/>
            </div>
        </div>

    }
}

ReactDOM.render(<Calculator/>, document.querySelector("#app"))