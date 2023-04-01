import logo from './logo.svg'
import './App.css'
import contactsArray from './contacts.json'
import { useState } from 'react'

function App() {
  const contactData = contactsArray.slice(0, 5)
  const [contacts, setContacts] = useState(contactData)

  const pullRandomContact = () => {
    let randomIndex = Math.floor(Math.random() * contactsArray.length)
    let newContact = contactsArray.splice(randomIndex, 1)[0]
    let updatedContacts = [...contacts, newContact]
    setContacts(updatedContacts)
    console.log(randomIndex, contactsArray.length)
  }

  const sortByName = () => {
    let sortedArray = [...contacts].sort((a, b) => {
      if (a.name < b.name) {
        return -1
      }
      if (a.name > b.name) {
        return 1
      }
      return 0
    })
    setContacts(sortedArray)
  }
  const sortByRating = () => {
    let sortedArray = [...contacts].sort((a, b) => {
      if (a.popularity < b.popularity) {
        return 1
      }
      if (a.popularity > b.popularity) {
        return -1
      }
      return 0
    })
    setContacts(sortedArray)
  }

  const deleteContact = (e) => {
    const { value } = e.target

    setContacts([...contacts].filter((contact) => contact.id !== value))
  }
  return (
    <div className='App'>
      <header className='App-header'>
        <div className='d-flex p-4 justify-content-evenly'>
          <button
            className='btn btn-secondary  m-2'
            onClick={pullRandomContact}
          >
            Add a Random Contact
          </button>
          <button
            className='btn btn-secondary m-2'
            onClick={sortByName}
          >
            Sort By Name
          </button>
          <button
            className='btn btn-secondary m-2'
            onClick={sortByRating}
          >
            Sort By Rating
          </button>
        </div>
        <table>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
          </tr>
          {contacts.map((contact) => {
            const { pictureUrl, name, popularity, wonOscar, wonEmmy, id } =
              contact
            return (
              <tr key={id}>
                <td>
                  <img
                    src={pictureUrl}
                    alt='contact'
                    width='25%'
                  />
                </td>
                <td>{name}</td>
                <td>{popularity}</td>
                <td>{wonOscar ? '🏆' : ''}</td>
                <td>{wonEmmy ? '🏆' : ''}</td>
                <button
                  className='btn btn-danger'
                  value={id}
                  onClick={deleteContact}
                >
                  Delete
                </button>
              </tr>
            )
          })}
        </table>
      </header>
    </div>
  )
}

export default App
