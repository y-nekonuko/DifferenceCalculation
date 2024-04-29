import React, { useState } from 'react';
import { Button, Card, Form, Container, Row, Col } from 'react-bootstrap';
import Icon from '@mdi/react';
import { mdiStar, mdiStarOutline, mdiPlus } from '@mdi/js';
import 'bootstrap/dist/css/bootstrap.min.css';

function PriceComparisonApp() {
  const [cards, setCards] = useState([]);

  const handleAddCard = () => {
    const isFirstCard = cards.length === 0;
    const newCard = {
      isReference: isFirstCard,
      memo: '',
      price: '',
    };
    setCards([...cards, newCard]);
  };

  const handleDeleteCard = (index) => {
    const updatedCards = [...cards];
    updatedCards.splice(index, 1);
    setCards(updatedCards);
  };

  const handleToggleReference = (index) => {
    const updatedCards = cards.map((card, idx) => {
      if (index === idx) {
        return {
          ...card,
          isReference: true,
        };
      } else if (card.isReference) {
        return {
          ...card,
          isReference: false,
        };
      }
      return card;
    });
    setCards(updatedCards);
  };

  const handleMemoChange = (index, event) => {
    const updatedCards = [...cards];
    updatedCards[index].memo = event.target.value;
    setCards(updatedCards);
  };

  const handlePriceChange = (index, event) => {
    const updatedCards = [...cards];
    updatedCards[index].price = event.target.value;
    setCards(updatedCards);
  };

  const formatPrice = (price) => {
    return price.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  const calculatePriceDifference = (index) => {
    const currentCard = cards[index];
    if (currentCard.isReference) return '--- 円';
    
    const referenceCard = cards.find((card) => card.isReference);
    if (!referenceCard) return '--- 円';

    const currentPrice = parseFloat(currentCard.price);
    const referencePrice = parseFloat(referenceCard.price);
    const difference = currentPrice - referencePrice;
    return isNaN(difference) ? '--- 円' : formatPrice(difference.toFixed(0)) + ' 円';
  };

  return (
    <Container className="mt-5">
      {cards.map((card, index) => (
        <Card key={index} className="mb-3 shadow">
          <Card.Body>
            <Form.Group>
              <div className="d-flex">
                <input
                  type="radio"
                  id={`isReference-${index}`}
                  checked={card.isReference}
                  onChange={() => handleToggleReference(index)}
                  style={{ display: 'none' }}
                />
                <label
                  htmlFor={`isReference-${index}`}
                  className="m-0"
                  style={{ cursor: 'pointer' }}
                >
                  <div className="d-flex align-items-center justify-content-start">
                    <Icon
                      path={card.isReference ? mdiStar : mdiStarOutline}
                      size={1}
                      color={card.isReference ? 'black' : 'gray'}
                    />
                  </div>
                </label>
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>メモ</Form.Label>
              <Form.Control
                type="text"
                value={card.memo}
                onChange={(e) => handleMemoChange(index, e)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>価格</Form.Label>
              <Form.Control
                type="number"
                value={card.price}
                onChange={(e) => handlePriceChange(index, e)}
              />
            </Form.Group>
            <p>
              差額: {calculatePriceDifference(index)}
            </p>
            <Button
              variant="danger"
              onClick={() => handleDeleteCard(index)}
            >
              削除
            </Button>
          </Card.Body>
        </Card>
      ))}
      <Row className="fixed-bottom justify-content-center mb-3">
        <Col xs="auto">
          <Button variant="primary" onClick={handleAddCard} className="rounded-circle p-3 shadow">
            <Icon path={mdiPlus} size={1} color="white" />
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default PriceComparisonApp;
