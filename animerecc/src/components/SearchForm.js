import React from 'react';
import RadioInput from './RadioInput';

class SearchForm extends React.Component {
  state = {currSearchTerm:'', currCategory:'all'};
 onFormSubmit= (event) =>{
   event.preventDefault();
   this.props.onSubmit(this.state.currSearchTerm, this.state.currCategory)
 }
  render(){
    
    return(
  <div className ='ui container' style={{padding:20}}>
    <form onSubmit={this.onFormSubmit} className='ui form'>
    
    <div className='ui input' style={{padding:1,  margin:'10px'}}> 
      <label className='ui label' htmlFor='animeUser' style={{paddingTop :'11px'}}>
        Enter MAL username:
      </label>
      <input className='ui'  id= 'animeUser' type='text/html' placeholder='Sophika Konstandin' value={this.state.currSearchTerm} onChange={e =>this.setState({currSearchTerm:e.target.value})}/>
      
      <button className='ui Submit button green' style={{marginLeft :2}}>
        Get History
      </button>
    </div>
    <br/>
    <RadioInput id='all' value='all' label='All' onChange={e =>this.setState({currCategory:e.target.value})}/>
      <RadioInput id='completed' value='completed' label='completed'onChange={e =>this.setState({currCategory:e.target.value})} />
      <RadioInput id='watching' value='watching' label='Watching'onChange={e =>this.setState({currCategory:e.target.value})} />
      <RadioInput id='onHold' value='onhold' label='On hold'onChange={e =>this.setState({currCategory:e.target.value})} />
      <RadioInput id='dropped' value='dropped' label='Dropped'onChange={e =>this.setState({currCategory:e.target.value})} />
      <RadioInput id='ptw' value='ptw' label='Plan to Watch'onChange={e =>this.setState({currCategory:e.target.value})} />
    </form>
    </div>
    );
};
};
export default SearchForm;