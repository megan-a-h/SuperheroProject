/* This is the code for a project using the superhero API. This page displays all of the superhero names with a search function to pull more information about any character in the list.  I used React, Javascript and JSX for this project.  This page is made up of four react components: Superhero, which pulls the API, SuperheroListDisplay which displays all the names in the array as a list along with the publisher, gender and race for each character, SuperheroSearch which takes in information from the search box and then passes that infomration as props to the SuperheroSearchDisplay component which displays more information about the character.   */

'use strict';

/*Superhero React component brings in the superhero api array and passes it as props to two other components.  This component is rendered to the DOM at the bottom of the page.   */
   class Superhero extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     error: null,
     isLoaded: false,
     superheroes: []
   };
 }

 /*Component did mount function is used to fetch the api and load the superheroes array */
 componentDidMount() {
   fetch("https://akabab.github.io/superhero-api/api/all.json")
     .then(res => res.json())
     .then(
       (result) => {
         this.setState({
           isLoaded: true,
           superheroes: result
         });
       },
       (error) => {
         this.setState({
           isLoaded: true,
           error
         });
       }
     )
 }


 render() {
   const { error, isLoaded, superheroes } = this.state;
   if (error) {
     return <div>Error: {error.message}</div>;
   } else if (!isLoaded) {
     return <div>Loading...</div>;
   } else {
    
   
     return (
        <div>
   {/*Array of superheroes is passed as props to the search and list display components */}
       <SuperheroSearch heroArray={superheroes} />
       <SuperheroListDisplay heroArray={superheroes} />
       </div>
     );
   }
 }
}

/*SuperheroListDisplay displays the full list of superheroes */
class SuperheroListDisplay extends React.Component {
 constructor(props) {
   super(props);
   
   
 }

render() {
   
     return (
        
     /*heroArray was passed as props from the Superhero component.  The map function is used to populate the table*/
         <div>
           <table style={{margin:"auto"}} class="text-center">
           <thead>
               <tr >
                   <th>Name</th>
                   <th>Publisher</th>
                   <th>Gender</th>
                   <th>Race</th>
               </tr>
           </thead>
           <tbody>
         {this.props.heroArray.map(hero => (
           <tr key={hero.id}>
           <td >
             {hero.name} 
           </td>
           <td >
             {hero.biography.publisher} 
           </td>
           <td>
             {hero.appearance.gender} 
           </td>
           <td >
             {hero.appearance.race} 
           </td>
           </tr>
            ))}
            </tbody>
           </table>
          
          </div>

     );
   }
 
}

/*SuperheroSearch gets the input from the user and checks for a match in the superhero array.  If a match is found the index of the selected character, that character's name and the array are passed as props to the SuperheroSearchDisplay Component */
class SuperheroSearch extends React.Component {
 constructor(props) {
   super(props); 
   this.state = {
     input: '',
     name: '',
     index: ''
   };
   this.handleChange = this.handleChange.bind(this);
   this.selectHero = this.selectHero.bind(this);
 }


   handleChange(event){
       this.setState({
           input: event.target.value
       });
   }


   selectHero(event){
       event.preventDefault();
      /*newEntry will be used to check if the user's input has match in the heroArray.  newEntry is set to false if the if statement below evaluates true.  If newEntry is true after running through the array then the name variable will be set to an error message */
       var newEntry = true;

       /*for statement to iterate through array.  If a match is found then the state variable name is set to the name of the hero and the index is set to the index value where the hero is located */
       for(let i=0; i<this.props.heroArray.length; i++)
       {
          
           if(this.state.input.toLowerCase().trim() == this.props.heroArray[i].name.toLowerCase())
           {
               this.setState({
                   name: this.props.heroArray[i].name,
                   index: i
               });
               newEntry = false;
           }
       }
       if (newEntry == true){
           this.setState({
                   name: "Please check your entry.  Hero not found."
               });
       }

}

render() {
   /*If statement checks to see if the state variable name is empty as it is on the first load of the page or if it has the error message.  In either situation the SuperheroSearchDisplay component should not be used since there will be no props to send into it and error would occur.  When name has a valid superhero name the heroArray, hero name and index of their location is passed as props to the Display component  */  
   if(this.state.name != '' && this.state.name != "Please check your entry.  Hero not found.")
   {
     return (
        
         <div className="text-center">
           <form onSubmit={this.selectHero}>
               <input value={this.state.input}
               onChange={this.handleChange} class="heroInput"/>
               <button type='submit' class="btn  phonoButton">Submit</button>
           </form>
          <br />
          
          <SuperheroSearchDisplay heroArray={this.props.heroArray} thisHero={this.state.name} thisIndex={this.state.index} /> 
          </div>

     );
       }

       else
       {
   /* If there is no valid name in the name state varible then just the search function is displayed with an h4 element added to display the error message if the user doesn't enter a name with a match.  On page load it is an empty string and displays nothing */
     return (
        
         <div className="text-center">
           <form onSubmit={this.selectHero}>
               <input value={this.state.input}
               onChange={this.handleChange} class="heroInput"/>
               <button type='submit' class="btn  phonoButton">Submit</button>
           </form>
          <br />
          <h4>{this.state.name}</h4>
          </div>
   
       );
       }
   }
 
}


/*SuperheroSearch display componenet displays the biographical information and a photo for the hero the user typed into the search bar */
class SuperheroSearchDisplay extends React.Component {
 constructor(props) {
   super(props); 
   this.state = {

   };

 }
  
render() {

   
     return (
        
         <div className="text-center">
           <h4>Superhero Name: {this.props.thisHero}</h4>
           <br />
           <div className="row">
               <div className="col-sm-2"></div>
          <img className="col-lg-2 img-fluid" style={{objectFit: "contain", maxHeight: "300px"}} alt="Image of Superhero" src={this.props.heroArray[this.props.thisIndex].images.sm} /> 
          
          <div className="col-lg-3">
           <br/>    
           
           <p>
                 <strong> Full Name</strong>: {this.props.heroArray[this.props.thisIndex].biography.fullName}
               </p>
               <p>
                   <strong>Alter Egos</strong>: {this.props.heroArray[this.props.thisIndex].biography.alterEgos}
               </p>
               <p>
                   <strong>Birthplace</strong>: {this.props.heroArray[this.props.thisIndex].biography.placeOfBirth}
               </p>
               <p>
                   <strong>First Appearance</strong>: {this.props.heroArray[this.props.thisIndex].biography.firstAppearance}
               </p>
               <p>
                   <strong>Occupation</strong>: {this.props.heroArray[this.props.thisIndex].work.occupation}
               </p>
           </div>

          <div className="col-lg-3">
           <br/> 
               <p><strong>Power Stats:</strong></p>
               <p>
                   <strong>Intelligence</strong>: {this.props.heroArray[this.props.thisIndex].powerstats.intelligence}
               </p>
               <p>
                   <strong>Strength</strong>: {this.props.heroArray[this.props.thisIndex].powerstats.strength}
               </p>
               <p>
                   <strong>Speed</strong>: {this.props.heroArray[this.props.thisIndex].powerstats.speed}
               </p>
               <p>
                   <strong>Durability</strong>: {this.props.heroArray[this.props.thisIndex].powerstats.durability}
               </p>
               <p>
                   <strong> Power</strong>: {this.props.heroArray[this.props.thisIndex].powerstats.power}
               </p>
               <p>
                   <strong>Combat</strong>: {this.props.heroArray[this.props.thisIndex].powerstats.combat}
               </p>
           </div>
           
           </div>
          <br />
          <br />
          </div>

     );
   }
 
}

/*Render superhero react component to DOM */
ReactDOM.render(<Superhero />, document.getElementById('app'));

   