import React from 'react'
import {
    CardGroup
} from 'reactstrap'
import CardView from '../CardView/CardView';


class Home extends React.Component {
    render() {
        return(
            <div className="Home">
                <CardGroup className="cardCon">
                    <CardView />
                </CardGroup>
            </div>

        )
    }
}

export default Home