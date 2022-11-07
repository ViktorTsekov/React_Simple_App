import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateUserById } from './redux/usersSlice'
import { useNavigate } from "react-router-dom"

interface props {
  data: any
  collapseSection?: any
}

const UserForm: React.FC<props> = ({data, collapseSection}) => {
  const [name, setName] = useState(data.name)
  const [email, setEmail] = useState(data.email)
  const [phone, setPhone] = useState(data.phone)
  const [zipcode, setZipcode] = useState(data.address.zipcode)
  const [city, setCity] = useState(data.address.city)
  const [street, setStreet] = useState(data.address.street)
  const [suite, setSuite] = useState(data.address.suite)
  const [requiredFieldsAreMissing, setRequiredFieldsAreMissing] = useState(false)
  const [changesAreMade, setChangesAreMade] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const path = window.location.href

  const requiredFieldsAreValid = () => {
    return `${name}`.length !== 0 &&
      `${email}`.length !== 0 &&
      `${city}`.length !== 0 &&
      `${street}`.length !== 0 &&
      `${suite}`.length !== 0
  }

  const submitForm = () => {
    const newUser = { ...data, address: {} }

    newUser.name = name
    newUser.email = email
    newUser.phone = phone
    newUser.address.zipcode = zipcode
    newUser.address.city = city
    newUser.address.street = street
    newUser.address.suite = suite

    if(requiredFieldsAreValid()) {
      dispatch(updateUserById({
        updatedUser: newUser
      }))
      
      collapseSection()
    } else {
      setRequiredFieldsAreMissing(true)
    }
  }

  return (
    <>
      <form>
        <label>Name: </label>
        <input
          type="text"  
          onChange={e => {
            setName(e.target.value)
            setChangesAreMade(true)
          }}
          value={name}
        />
        <label style={{color: 'red'}}> *</label>
        <br />
        <label>Email: </label>
        <input
          type="text"  
          onChange={e => {
            setEmail(e.target.value)
            setChangesAreMade(true)
          }}
          value={email}
        />
        <label style={{color: 'red'}}> *</label>
        <br />
        <label>Phone: </label>
        <input
          type="text"
          onChange={e => {
            setPhone(e.target.value)
            setChangesAreMade(true)
          }}
          value={phone}
        />
        <br /> <br />
        <label>Address: </label>
        <br />
        <label>Zip code: </label>
        <input
          type="text"  
          onChange={e => {
            setZipcode(e.target.value)
            setChangesAreMade(true)
          }}
          value={zipcode}
        />
        <br />
        <label>City: </label>
        <input
          type="text"  
          onChange={e => {
            setCity(e.target.value)
            setChangesAreMade(true)
          }}
          value={city}
        />
        <label style={{color: 'red'}}> *</label>
        <br />
        <label>Street: </label>
        <input
          type="text"  
          onChange={e => {
            setStreet(e.target.value)
            setChangesAreMade(true)
          }}
          value={street}
        />
        <label style={{color: 'red'}}> *</label>
        <br />
        <label>Suite: </label>
        <input
          type="text"  
          onChange={e => {
            setSuite(e.target.value)
            setChangesAreMade(true)
          }}
          value={suite}
        />
        <label style={{color: 'red'}}> *</label>
        <br />
      </form>
      {requiredFieldsAreMissing && <p style={{color: 'red'}}>Some of the required fields are empty</p>}
      <div style={{marginTop: '10px'}}>
        <button onClick={() => collapseSection()} style={{marginRight: '10px'}}>Cancel</button>
        <button disabled={!changesAreMade} onClick={() => submitForm()} style={{marginRight: '10px'}}>Submit</button>
        {
          !path.includes('posts') && 
            <button onClick={() => navigate('/posts', {
              state: {
                userId: data.id,
              }
            })}>See posts</button>
        }
      </div>
    </>
  )
}

export default UserForm
