import React from 'react'
import { 
    Button,
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText
} from 'reactstrap';
import cardData from '../../data/cardData';
import './CardView.scss';


class CardView extends React.Component {
    state = {
        cardData: {},
        cardImages: {}
    }
    getCard = () => {
        cardData.getRandomCard()
        .then((resp) => {
            console.log(resp)
            this.setState({ cardData: resp, cardImages: resp.image_uris })
        })
        .catch(err => console.error(err));
    }
    componentDidMount() {
        this.getCard();
    }
    render() {
        const { cardData, cardImages } = this.state;
        return(
            <div className="CardView">
                <Card>
                    <CardImg top width="100%" className="card-img" src={cardImages.normal} />
                    <CardBody>
                    <CardTitle>{cardData.Name}</CardTitle>
                    <CardSubtitle>{cardData.type_line}</CardSubtitle>
                    <CardText>{cardData.oracle_text}</CardText>
                    <Button>Button</Button>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default CardView