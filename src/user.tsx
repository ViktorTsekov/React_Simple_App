import React, {useState} from 'react'
import UserForm from './userForm'

interface props {
  data: any
}

const User: React.FC<props> = ({data}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const displayInfo = () => {
    const name = data.name
    const email = data.email
    const phone = data.phone
    
    const zip = data.address.zipcode
    const city = data.address.city
    const street = data.address.street
    const suite = data.address.suite
    
    const template = `Name: ${name} \n
      Email: ${email} \n
      Phone: ${phone} \n
      Address: ${zip}, ${city}, ${street}, ${suite} \n`

    return <div>
      { template.split('\n').map((str, index) => <p key={index}>{str}</p>) }
    </div>
  }

  return (
    <div style={{margin: '24px'}}>
      {
        !isExpanded && <div>
          {displayInfo()}
          <button onClick={() => setIsExpanded(true)}>Expand</button>
        </div>
      }
      {
        isExpanded && <UserForm data={data} collapseSection={() => setIsExpanded(false)} />
      }
      <br/>
    </div>
  )
}

export default User
