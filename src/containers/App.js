import React from 'react';
import SearchBox from '../components/SearchBox';
import CardList from '../components/CardList';
import Scroll from '../components/Scroll';
import errorBoundry from '../components/errorBoundry';
import './App.css';


class App extends React.Component {

    constructor() {
        super()
        this.state = {
                robots: [],
                searchfield: ''
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users').then(response => {
            return response.json();
        })
        .then(users =>  {
            this.setState({robots:users})
        })
    }

    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value})
    }

    render() {
        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })

        return (
            <div className = 'tc'>
                <h1>RoboFriends</h1>
                <SearchBox searchChange = {this.onSearchChange}/>
                <Scroll>
                    <errorBoundry>
                        <CardList robots = {filteredRobots}/>
                    </errorBoundry>
                </Scroll>
            </div>
        );
    }

}

export default App;