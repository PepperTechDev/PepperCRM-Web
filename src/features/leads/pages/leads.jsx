import React from 'react'
import '../styles/leads.modules.css'
function Leads() {
  return (
    <div class="box">
    <h2>Actions</h2>
    <p>This is a sample box. Add any content here and the buttons will always appear at the bottom.</p>
    <div class="buttons">
      <button class="button add" onclick="addFunction()">Add</button>
      <button class="button delete" onclick="deleteFunction()">Delete</button>
      <button class="button edit" onclick="editFunction()">Edit</button>
    </div>
  </div>
  )
}

export default Leads
