import React, {Component} from 'react';

class NewJob extends Component {

    constructor(props) {
        super(props);

        this.state = {
            jobtitle: "",
            category: "",
            area: "",
            description: this.props.answers,
        };

        this.onChange = this.onChange.bind(this);
        this.onChangeJobTitle = this.onChangeJobTitle.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeArea = this.onChangeArea.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    onChange(event) {
        this.setState({
            input: event.target.value
        });
    }

    onChangeJobTitle(event) {
        this.setState({
            name: event.target.value
        });
    }

    onChangeCategory(event) {
        this.setState({
            category: event.target.value
        });
    }

    onChangeArea(event) {
        this.setState({
            area: event.target.value
        });
    }

    onChangeDescription(event) {
        this.setState({
            description: event.target.value
        });
    }
 

    handleInput(event) {
        this.props.addJob(this.state.jobtitle, this.state.category, this.state.area, this.state.description);
    }


    render() {
        return (
            <div className="front-new-question-box">
                <form>
                    <label>Jobtitel</label>
                    <br />
                    <input type="text" onChange={this.onChangeJobTitle} className="form-control" id="jobtitle" placeholder="Jobtitel"></input>
                    <br />
                    <label>Job kategori</label>
                    <br />
                    <input type="text" onChange={this.onChangeCategory} className="form-control" id="category" placeholder="Job kategori"></input>
                    <br />
                    <label>Geografi</label>
                    <br />
                    <input type="text" onChange={this.onChangeArea} className="form-control" id="area" placeholder="Område"></input>
                    <br />
                    <label>Job beskrivelse</label>
                    <br />
                    <textarea onChange={this.onChangeDescription} className="form-control" id="description" placeholder="Job beskrivelse"></textarea> 

                    <button onClick={this.handleInput}
                            type="submit" id="submitButton"> Tilføj et job
                    </button>
                    <p className="message text-danger">{this.state.message}</p>   
                </form>
            </div>
        );
    }
}
export default NewJob;
