import React, { useState } from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState({
    color: "",
    code: { hex: "" },
    id: Date.now()
  })

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {   
    axiosWithAuth()
    .put(`/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      updateColors(res.data)
    })
    .catch(err => console.log('Editing error', err))   
  };

  const deleteColor = color => {    
    axiosWithAuth()
    .delete(`/colors/${color.id}`)
    .then(res => {
      updateColors(colors => colors.filter(color => {
        return color.id !== res.data
      }))
    })
    .catch(err => console.log('Deleting error', err))
  };

  const addColor = e => {
    e.preventDefault()
    axiosWithAuth()
    .post('/colors', colorToAdd)
    .then(res => {
      console.log(res)
      updateColors(res.data)
    })
    .catch(err => console.log('Adding color failed', err))
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      <h1>Add Color</h1>
        <form onSubmit={addColor}>
          <label>Color Name:</label>
          <input 
          type="text"
          name="name"
          value={colorToAdd.color}
          onChange={e =>
                setColorToAdd({ ...colorToAdd, color: e.target.value })
              }
          />

          <label>Hex Number:</label>
          <input 
          type="text"
          name="code"
          value={colorToAdd.code.hex}
          onChange={e =>
                setColorToAdd({ ...colorToAdd, code: { hex: e.target.value }
                })
              }   
          />

          <button>Add Color</button>
        </form>
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
