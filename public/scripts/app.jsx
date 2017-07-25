class SubmitBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: ''
    };
    this.saveAnswers = this.saveAnswers.bind(this);
  }

  saveAnswers(answers) {
    return new Promise((resolve, reject) => {
      const data = {
        comment: {answers}
      };

      $.ajax({
        url: this.props.url,
        dataType: 'JSON',
        type: 'POST',
        data: data,
        success: (comment) => {
          console.log("You saved data", data)
          resolve(comment)
        },
        error: (error) => {
          console.log(error)
          reject(error)
        }
      })
    })
  }

  render() {
    return (
      <div className="submitBox">
        <AnswerForm 
          saveAnswers={this.saveAnswers} />
      </div>
    );
  }
}

class AnswerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
  	this.setState({amount: e.target.value})
	}

  handleSubmit(e) {
    let amount = this.state.amount
    e.preventDefault()
    console.log("You submitted data", amount)
    this.setState({amount: amount})
    this.props.saveAnswers({amount: amount});
  }
  
	render() {
    return (
      <form 
      className="AnswerForm"
      onSubmit={this.handleSubmit}>
        <h2>Rating</h2>
      
        {/* This Radios component is specialized to include two fields in one */}
        <h4>How do you feel about bike paths in Noumea?</h4>
        <input 
        type="text" 
        value={this.state.amount} 
        onChange={this.handleChange} />
        <br /><br />
        
        <input 
        type="submit" 
        value="Submit"/>
      </form>
    );
  }
}

//This is where it all begins
ReactDOM.render(
  <SubmitBox url="../donations.json"/>,
  document.getElementById('content')
);

