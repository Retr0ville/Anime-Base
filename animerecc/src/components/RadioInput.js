import React from 'react';

class RadioInput extends React.Component {
  render(){
    return(
      <div className='ui input' style={{padding:'3px'}}>
        <input type='radio'
         id={this.props.id}
         value={this.props.value} 
         name='status'
         onChange={this.props.onChange}/>

        <label className='ui label'  style={{color:'green'}} htmlFor={this.props.id}> {this.props.label} </label>
      </div>
    );
  }
};
export default RadioInput