var SubmitBox = React.createClass({
	onSubmit: function(answers) {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			type: 'POST',
			data: answers,
			success: function(data) {
				this.setState({data: data});
				console.log("Added data", data)
			}.bind(this),
			error: function(xhr, status, err) {
			  console.error(this.props.url, status, err.toString());
			}.bind(this)
		})
	},
  getInitialState: function() {
    return {data: []};
  },
  render: function() {
    return (
      <div className="submitBox">
        <AnswerForm onAnswerSubmit={this.onSubmit} />
      </div>
    );
  }
});

var AnswerForm = React.createClass({
  getInitialState: function() {
    return {
      participant: ""
    };
  },

  handleSubmit: function(e) {
  	
  	this.props.onAnswerSubmit({participant: participant, amount: amount});
  	this.setState({
  		participant: "",
  		amount: undefined
  	})
	},

	setParticipant: function(e) {
		this.setState({
			participant: Math.random()
		})
	},
	render: function() {
    return (
      <form className="answerForm" onSubmit={this.handleSubmit}>
        <h2>Rating</h2>
      
        {/* This Radios component is specialized to include two fields in one */}
        <h4>How do you feel about bike paths in Noumea?</h4>
        <Radios
          values={[Love, Like, Neutral, Dislike, Strongly Dislike]}
          name="amount"
				/>
        <br /><br />
      
        <input type="submit" value="Submit" />
      </form>
    );
  }
});

var Radios = React.createClass({

  handleClick: function(displayClass, e) {
    this.setState({displayClass: displayClass});
  },
  render: function() {
    var rows = [];
    var label = "";
    
    //we have passed in all the options for the radios, so we traverse the array
    for (var i = 0; i < this.props.values.length; i++) {
      //We do this little replace for when we want to display the value as part of
      //additional text. Otherwise, we would just put '[VALUE]' when passing
      //the itemLabel prop from the parent component, or leave out '[VALUE]' entirely
      label = this.props.values[i];
      
      rows.push(<input
        key={this.props.name + '-' + i}
        type="radio"
        ref={this.props.name + '-' + this.props.values[i]}
        name={this.props.name}
        value={this.props.values[i]}
        onClick={this.handleClick.bind(this, 'invisible')} />,
        
        <label key={this.props.name + '-label-' + i} htmlFor={this.props.values[i]}>{label}</label>,
      
        <br key={this.props.name + '-br-' + i} />);
    }
    
    //Return all those rows
    return (
      <div className="radios">
        {rows}
      </div>
    );
  }
});

//This is where it all begins
ReactDOM.render(
  <SubmitBox url="/donations.json" />,
  document.getElementById('content')
);

