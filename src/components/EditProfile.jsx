import React, { useState } from "react"
import "../css/index.css"

function EditProfile() {
    const [state, setState] = useState({
        fname: "",
        scheme: "Tech",
        bio: "",
      })
    
      const handleChange = e => {
        setState({
          ...state,
          [e.target.name]: e.target.value,
        })
      }




  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    setIsSubmitted(true);
  }

  const renderForm = (
    <div className="profileform">
      <form onSubmit={handleSubmit}>
          <label> Name: </label>
          <input 
          type="text" 
          name="fname" 
          value={state.fname} 
          onChange={handleChange} />
          <br /><br />
      <label>
        Scheme:
        <select
          name="scheme"
          value={state.scheme}
          onChange={handleChange}
        >
          <option value="Tech">Tech</option>
          <option value="UX">UX</option>
          <option value="Product">Product</option>
          <option value="Data Science">Data Science</option>
        </select>
      </label>
      <br /><br />
      <label>
        Bio:{" "}
        <textarea
          name="bio"
          value={state.bio}
          onChange={handleChange}
        />
      </label>
        <div className="button-container">
          <input value="Edit" type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="formtext">
        {isSubmitted ?
            <div>
                <h4>Name: {state.fname} </h4>
                <br></br>
                <h4>Scheme: {state.scheme} </h4>
                <br></br>
                <h4>Bio: {state.bio}</h4>
                </div> : renderForm}
    </div>
  );
}

export default EditProfile