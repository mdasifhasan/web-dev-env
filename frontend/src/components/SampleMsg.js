import React from 'react';
import axios from 'axios';

class SampleMsg extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            msg : "Hi!"
        }
    }

    componentDidMount() {
        axios.get("/api")
            .then(res => {
                console.log("res");
                this.setState({
                    msg:res.data
                })
            })
            .catch(err => {

            })
    }

    render(){
        return (
          <div>{this.state.msg}</div>
        );
    }

}

export default SampleMsg;