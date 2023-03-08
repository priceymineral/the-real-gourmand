import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardImg, CardText, CardTitle, CardBody, ListGroup, ListGroupItem } from "reactstrap"
import { NavLink } from "react-router-dom"


const RestaurantIndex = ({ restaurants }) => {
  const [endIndex, setEndIndex] = useState(4)
  const [todaysPick, setTodaysPick] = useState(restaurants[0])
  const visibleRestaurants = restaurants.slice(0, endIndex)

  const handleLoadMore = () => {
    setEndIndex(prevEndIndex => prevEndIndex + 4)
  }

  const navigate = useNavigate()
  const toRestaurant = () => {
    navigate(`/restaurantshow/${todaysPick?.id}`)
  }
  useEffect(() => {
  }, [])

  return (
    <>
      <main className="page-body">
        <h3 style={{ marginLeft: '10vw' }}>Our Restaurants</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {todaysPick && (<Card className="my-2 res-index-card gradient-border" style={{ margin: '1rem', height: 'fit-content' }}>
            <CardImg
              alt="Card image cap"
              src={todaysPick.images}
              style={{
                height: '230px'
              }}
              top
              width="100%"
            />
            <CardBody>
              <CardTitle tag="h5">
                <span className="card-text">Feeling adventurous? Try this random pick:{' '}</span>
                  <span onClick={toRestaurant} className="restaurant-name">
                    {todaysPick.name}
                  </span>
              </CardTitle>
              <CardText>
                Cuisine:
                {` ${todaysPick?.cuisine}`}
              </CardText>
              <CardText>
                {(todaysPick?.avg_rating >= 1 && todaysPick?.avg_rating < 2) && ' ★☆☆☆☆'}
                {(todaysPick?.avg_rating >= 2 && todaysPick?.avg_rating < 3) && ' ★★☆☆☆'}
                {(todaysPick?.avg_rating >= 3 && todaysPick?.avg_rating < 4) && ' ★★★☆☆'}
                {(todaysPick?.avg_rating >= 4 && todaysPick?.avg_rating < 5) && ' ★★★★☆'}
                {todaysPick?.avg_rating === 5 && ' ★★★★★'}
              </CardText>
              <CardText>
                Price: {todaysPick.price_range}
              </CardText>
            </CardBody>
          </Card>)}
        </div>

        <h3 style={{ marginLeft: '10vw' }}>See the rest:</h3>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', width: '1300px' }}>
          {visibleRestaurants?.map((restaurant, index) => {
            return (
              <Card
                className="gradient-border"
                style={{
                  display: 'inline-flex',
                  margin: '15px',
                  width: '256px',
                  height: '450px',
                  justifyContent: 'space-around'
                }}
                key={index}
              >
                <div style={{
                  height: '45%',
                  width: '100%',
                  overflow: 'hidden'
                }}>
                  <img
                    alt="Card"
                    src={restaurant.images}
                    style={{ height: '100%', width: '100%' }}
                  />
                </div>
                <CardBody style={{ height: '10%', padding:'5%', textIndent:'5px' }}>
                  <CardTitle tag="h5" className="card-text">
                    {restaurant.name}
                  </CardTitle>
                </CardBody>
                <ListGroup flush>
                  <ListGroupItem>
                    {restaurant.cuisine}
                  </ListGroupItem>
                  <ListGroupItem>                    
                    {(restaurant.avg_rating >= 1 && restaurant.avg_rating < 2) && ' ★☆☆☆☆'}
                    {(restaurant.avg_rating >= 2 && restaurant.avg_rating < 3) && ' ★★☆☆☆'}
                    {(restaurant.avg_rating >= 3 && restaurant.avg_rating < 4) && ' ★★★☆☆'}
                    {(restaurant.avg_rating >= 4 && restaurant.avg_rating < 5) && ' ★★★★☆'}
                    {restaurant.avg_rating === 5 && ' ★★★★★'}
                  </ListGroupItem>
                  <ListGroupItem>
                     {restaurant.number_of_reviews} reviews
                  </ListGroupItem>
                  <ListGroupItem>
                    {restaurant.price_range || '(None Provided)'}
                  </ListGroupItem>
                </ListGroup>
                <CardBody style={{
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  <button className="button">
                    <NavLink to={`/restaurantshow/${restaurant.id}`} style={{ textDecoration: 'none' }} className='menuLink'>
                      See More
                    </NavLink>
                  </button>
                </CardBody>
              </Card>
            )
          })}
        </div>
      </main>
      <br />
      <br />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '5vw', position: 'relative', bottom: '4vh' }}>
        {(endIndex < restaurants.length) && (<button className="button" onClick={handleLoadMore}>Load More</button>)}
      </div>
    </>
  )
}

export default RestaurantIndex