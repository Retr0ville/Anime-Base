import React from 'react';


const RecCard = (props)=>
{
  return(
  <div className='card' style= {{backgroundColor:'green'}}>
        <a href={props.animeUrl} className='image' >
          <img alt='poster' src={props.imgUrl}/>
        </a>
    <div className='content'>
        <a className='header' href={props.animeUrl}>{props.animeTitle}</a>
        <a href={props.vidUrl} className='ui button red'>Watch now</a>

      <div style={{}}>
        <div className='meta'>
          <div className='date' align='right'>
  Air date: {(props.fromDate === null)? '' : 'from ' + props.fromDate.slice(0,7)}{(props.toDate === null)? '' : ', to ' + props.toDate.slice(0,7)}
          </div>
        </div>
        <div className='extra content' align='right' className= 'right floated'>
          <span >
              <div>Total episodes: {props.totalEpis} </div>
              <div>Seen episodes: {props.seenEpis || 0} </div>
              <div>Rating : {props.rating} </div>
          </span>
          
          <span>
            <i className='user icon'></i>
            Score:{(props.score === 0)? 'ungraded' : props.score}
          </span>
          </div>

        </div>

      </div>
    </div>
  )
};
export default RecCard;